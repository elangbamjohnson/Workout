/**
 * Phase 2 - Timer System
 * Handles Rest mode (Strength) and Round mode (Bag/Technical).
 * Uses timestamp-based countdown to prevent drift.
 */

// ==========================================
// GLOBAL AUDIO CONFIGURATION
// Centralized voice and playback settings for all app alerts
// ==========================================
window.audioConfig = {
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    voice: null,

    initVoice() {
        if (this.voice) return;
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;
        
        const preferredVoices = ['Google US English Female', 'Google UK English Female', 'Samantha', 'Victoria', 'Karen', 'Tessa', 'Moira'];
        for (let name of preferredVoices) {
            const match = voices.find(v => v.name.includes(name));
            if (match) {
                this.voice = match;
                return;
            }
        }
        
        this.voice = voices.find(v => v.name.toLowerCase().includes('female') && v.lang.startsWith('en')) || 
                     voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
    }
};

// Eagerly initialize voices to prevent fallback to default male voice on first play
if (window.speechSynthesis) {
    window.audioConfig.initVoice();
    window.speechSynthesis.onvoiceschanged = () => window.audioConfig.initVoice();
}

window.speakAlert = function(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // clear queue
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Fallback load if the voices array was empty at load time
    if (!window.audioConfig.voice) {
        window.audioConfig.initVoice();
    }
    
    if (window.audioConfig.voice) {
        utterance.voice = window.audioConfig.voice;
    }
    
    utterance.rate = window.audioConfig.rate;
    utterance.pitch = window.audioConfig.pitch;
    utterance.volume = window.audioConfig.volume;
    window.speechSynthesis.speak(utterance);
};
// ==========================================

window.Timer = {
    modal: null,
    intervalId: null,
    endTime: null,
    totalDuration: 0,
    audioCtx: null,
    
    // State
    mode: null, // 'rest' | 'round'
    phase: null, // 'work' | 'rest'
    remainingSeconds: 0,
    keydownListener: null,
    hasPlayed10Sec: false,
    lastSpokenSecond: null,
    workoutType: null,
    
    // Round specific config
    roundData: null, // { workSec, restSec, roundId, title, cue, nextCallback }

    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    },

    playBeep(frequency = 440, duration = 0.5) {
        this.initAudio();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        
        gain.gain.setValueAtTime(1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
        
        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + duration);
        
        if (navigator.vibrate) {
            navigator.vibrate([200]);
        }
    },
    
    playDoubleBeep() {
        this.playBeep(600, 0.2);
        setTimeout(() => this.playBeep(800, 0.4), 250);
        if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
    },

    createDOM() {
        if (this.modal) return;
        this.overlay = document.createElement('div');
        this.overlay.className = 'timer-modal-overlay';
        this.overlay.onclick = () => this.close();
        
        this.modal = document.createElement('div');
        this.modal.id = 'timer-modal';
        this.modal.className = 'timer-modal';
        
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);
    },

    formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    startRest(seconds, title, cue, workoutType = 'strength') {
        this.initAudio();
        this.mode = 'rest';
        this.workoutType = workoutType;
        this.roundData = { title: title || 'Rest Period', cue: cue || '' };
        this.totalDuration = seconds;
        this.endTime = Date.now() + seconds * 1000;
        this.hasPlayed10Sec = false;
        this.lastSpokenSecond = seconds;
        this.createDOM();
        this.render();
        this.render();
        requestAnimationFrame(() => {
            this.overlay.classList.add('visible');
            this.modal.classList.add('visible');
        });
        this.attachListener();
        window.speakAlert("Rest time started");
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
        if (window.WakeLock) window.WakeLock.acquire();
    },


    startWarmup(duration, title, cue, switchSides, workoutType, onComplete) {
        this.initAudio();
        this.mode = 'warmup';
        this.phase = 'work';
        this.workoutType = workoutType;
        this.roundData = { title, cue, switchSides, onComplete };
        this.totalDuration = duration;
        this.endTime = Date.now() + duration * 1000;
        this.hasPlayed10Sec = false;
        this.lastSpokenSecond = duration;
        this.createDOM();
        this.render();
        requestAnimationFrame(() => {
            this.overlay.classList.add('visible');
            this.modal.classList.add('visible');
        });
        this.attachListener();
        
        if (switchSides) {
            window.speakAlert(`${this.roundData.title} — first side, start now`);
        } else {
            window.speakAlert(`${this.roundData.title} started`);
        }
        
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
        if (window.WakeLock) window.WakeLock.acquire();
    },

    startRound(workSec, restSec, title, cue, workoutType = 'bag', onComplete) {
        this.initAudio();
        this.mode = 'round';
        this.phase = 'work';
        this.workoutType = workoutType;
        this.roundData = { workSec, restSec, title, cue, onComplete };
        this.totalDuration = workSec;
        this.endTime = Date.now() + workSec * 1000;
        this.hasPlayed10Sec = false;
        this.lastSpokenSecond = workSec;
        this.createDOM();
        this.render();
        this.render();
        requestAnimationFrame(() => {
            this.overlay.classList.add('visible');
            this.modal.classList.add('visible');
        });
        this.attachListener();
        if (this.workoutType === 'technical') {
            window.speakAlert(`${this.roundData.title} started`);
        } else {
            window.speakAlert("Round started, go");
        }
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
        if (window.WakeLock) window.WakeLock.acquire();
    },

    tick() {
        const now = Date.now();
        let diff = Math.ceil((this.endTime - now) / 1000);
        
        if (diff <= 0) {
            diff = 0;
            this.handleExpire();
        } else if (diff > 0 && diff !== this.lastSpokenSecond) {
            this.lastSpokenSecond = diff;
            const isResting = this.mode === 'rest' || this.phase === 'rest';
            
            if (this.mode === 'warmup' && this.roundData.switchSides && diff === Math.floor(this.totalDuration / 2)) {
                window.speakAlert("Switch sides");
                const timerDisplay = this.modal.querySelector('.timer-display');
                if (timerDisplay) {
                    timerDisplay.setAttribute('data-flash', 'SWITCH SIDES');
                    timerDisplay.classList.add('flash-overlay');
                    setTimeout(() => timerDisplay.classList.remove('flash-overlay'), 2000);
                }
            } else if (diff === 10) {
                window.speakAlert("Ten seconds");
            } else if (diff < 10) {
                window.speakAlert(diff.toString());
            } else if (isResting && diff % 5 === 0) {
                window.speakAlert(diff.toString() + " seconds");
            } else if (!isResting && this.mode !== 'warmup' && (this.totalDuration - diff) > 0 && (this.totalDuration - diff) % 60 === 0) {
                const elapsedMins = (this.totalDuration - diff) / 60;
                window.speakAlert(`${elapsedMins} minute${elapsedMins > 1 ? 's' : ''} complete`);
            }
        }
        
        this.remainingSeconds = diff;
        this.updateUI();
    },

    handleExpire() {
        clearInterval(this.intervalId);
        
        if (this.mode === 'warmup') {
            if (this.roundData.switchSides) {
                window.speakAlert(`${this.roundData.title} done`);
            } else {
                window.speakAlert(`${this.roundData.title} done, move to the next`);
            }
            this.playDoubleBeep();
            this.completeRound();
        } else if (this.mode === 'rest') {
            window.speakAlert("Rest time ended, get ready");
            this.playDoubleBeep();
            this.close();
        } else if (this.mode === 'round') {
            if (this.phase === 'work') {
                this.playDoubleBeep();
                if (this.roundData.restSec > 0) {
                    window.speakAlert("Workout ended, rest starting");
                    this.phase = 'rest';
                    this.totalDuration = this.roundData.restSec;
                    this.endTime = Date.now() + this.roundData.restSec * 1000;
                    this.hasPlayed10Sec = false;
                    this.lastSpokenSecond = this.roundData.restSec;
                    this.render(); // Re-render once to update phase colors/text
                    this.intervalId = setInterval(() => this.tick(), 100);
                } else {
                    if (this.workoutType === 'technical') {
                        window.speakAlert(`${this.roundData.title} ended, take a breath`);
                    } else {
                        window.speakAlert("Workout ended, take a breath");
                    }
                    this.completeRound();
                }
            } else {
                if (this.workoutType === 'bag') {
                    window.speakAlert("Rest time ended, get ready for next round");
                } else {
                    window.speakAlert("Rest time ended, get ready");
                }
                this.playDoubleBeep();
                this.completeRound();
            }
        }
    },
    
    completeRound() {
        this.close();
        if (this.roundData.onComplete) {
            this.roundData.onComplete();
        }
    },

    addTime(sec) {
        this.endTime += sec * 1000;
        this.totalDuration += sec;
        this.tick();
    },

    attachListener() {
        if (!this.keydownListener) {
            this.keydownListener = (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            };
        }
        document.addEventListener('keydown', this.keydownListener);
    },

    close() {
        console.log('END ROUND EARLY FIRED', Date.now());
        if (window.WakeLock) window.WakeLock.release();
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (this.keydownListener) {
            document.removeEventListener('keydown', this.keydownListener);
            this.keydownListener = null;
        }
        if (this.modal) {
            this.modal.classList.add('dismissing');
            if (this.overlay) this.overlay.classList.remove('visible');
            setTimeout(() => {
                this.modal.classList.remove('visible', 'dismissing');
            }, 250);
        }
    },

    updateUI() {
        if (!this.modal) return;
        const progress = Math.max(0, Math.min(1, this.remainingSeconds / this.totalDuration));
        const progressPct = progress * 100;
        
        const displayEl = this.modal.querySelector('.timer-display');
        const progressEl = this.modal.querySelector('.progress-bar-fill');
        
        if (displayEl) displayEl.textContent = this.formatTime(this.remainingSeconds);
        if (progressEl) progressEl.style.width = `${progressPct}%`;
    },

    render() {
        const progress = Math.max(0, Math.min(1, this.remainingSeconds / this.totalDuration));
        const progressPct = progress * 100;
        
        const isRestMode = this.mode === 'rest';
        const isWork = !isRestMode && this.phase === 'work';
        const colorClass = isWork ? 'work-color' : 'rest-color';
        
        const headerTitle = isRestMode ? 'REST' : (isWork ? 'WORK' : 'REST');
        const mainTitle = this.roundData ? this.roundData.title : 'Rest Period';
        const cueText = this.roundData && this.roundData.cue ? this.roundData.cue : '';
        
        let actionsHtml = `<button class="btn-primary" onclick="Timer.close()">End Round Early</button>`;
        
        const html = `
            <div class="timer-card round-mode ${colorClass}">
                <div class="timer-header">
                    <h3>${headerTitle}</h3>
                    <button class="btn-cancel" onclick="Timer.close()">Cancel</button>
                </div>
                <div class="round-title">${mainTitle}</div>
                <div class="timer-display giant ${colorClass}">${this.formatTime(this.remainingSeconds)}</div>
                <div class="progress-bar-bg"><div class="progress-bar-fill ${colorClass}" style="width: ${progressPct}%"></div></div>
                ${cueText ? `<div class="timer-cue">${cueText}</div>` : ''}
                <div class="timer-actions" style="margin-top: 24px;">
                    ${actionsHtml}
                </div>
            </div>
        `;
        
        this.modal.innerHTML = html;
    }
};
