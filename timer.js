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
        this.modal = document.createElement('div');
        this.modal.id = 'timer-modal';
        this.modal.className = 'timer-modal hidden';
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
        this.modal.classList.remove('hidden');
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
        this.modal.classList.remove('hidden');
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

    startRound(workSec, restSec, title, cue, workoutType = 'bag', onComplete, timedCues = null) {
        this.initAudio();
        this.mode = 'round';
        this.phase = 'work';
        this.workoutType = workoutType;
        
        let combos = [];
        if (workoutType === 'bag' && cue) {
            combos = cue.split('<br>').map(c => c.trim()).filter(c => c.length > 0);
        }
        
        const hasTimedCues = timedCues && timedCues.length > 0;
        this.roundData = { workSec, restSec, title, cue, combos, onComplete, timedCues, hasTimedCues };
        this.totalDuration = workSec;
        this.endTime = Date.now() + workSec * 1000;
        this.hasPlayed10Sec = false;
        this.lastSpokenSecond = workSec;
        this.comboInterval = combos.length > 0 ? Math.floor(workSec / combos.length) : 0;
        this.activeComboIndex = 0;
        
        this.createDOM();
        this.render();
        this.modal.classList.remove('hidden');
        this.attachListener();
        
        if (this.workoutType === 'technical') {
            window.speakAlert(`${this.roundData.title} started`);
        } else if (hasTimedCues) {
            const cue0 = timedCues.find(c => c.time === 0);
            if (cue0) {
                window.speakAlert(cue0.text);
                if (cue0.uiIndex !== undefined) {
                    this.activeComboIndex = cue0.uiIndex;
                    this.updateUI();
                }
            }
        } else if (this.workoutType === 'bag' && combos.length > 0) {
            this.speakCombo(0);
        } else {
            window.speakAlert("Round started, go");
        }
        
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
        if (window.WakeLock) window.WakeLock.acquire();
    },
    
    speakCombo(index) {
        if (!this.roundData || !this.roundData.combos || index >= this.roundData.combos.length) return;
        this.activeComboIndex = index;
        
        const rawCombo = this.roundData.combos[index];
        let speechCue = rawCombo
            .replace(/<[^>]*>?/gm, '. ')
            .replace(/\([^)]*\)/g, '')
            .replace(/×\s*\d+\s*reps?/gi, '')
            .replace(/-/g, ' ')
            .replace(/\b1\b/g, 'jab')
            .replace(/\b2\b/g, 'cross')
            .replace(/\b3\b/g, 'lead hook')
            .replace(/\b4\b/g, 'rear hook')
            .replace(/\b5\b/g, 'lead upper cut')
            .replace(/\b6\b/g, 'rear upper cut')
            .replace(/\s+/g, ' ')
            .trim();
            
        if (speechCue.length > 0) {
            window.speakAlert(speechCue);
        }
        this.updateUI();
    },

    startCountdown(totalCount, label, onDone) {
        this.initAudio();
        this.mode = 'countdown';
        this.createDOM();
        
        let count = totalCount;
        
        const renderCount = (num) => {
            const html = `
                <div class="timer-card round-mode work-color" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 350px;">
                    <div class="label-small" style="margin-bottom: 24px;">GET READY</div>
                    <div class="countdown-number" style="font-size: 120px; font-weight: 800; color: var(--text-primary); line-height: 1; animation: countdownPulse 1s infinite;">${num > 0 ? num : 'GO!'}</div>
                    <div class="timer-cue" style="margin-top: 24px; font-size: 18px;">${label} starting</div>
                    <button class="btn-cancel" style="position: absolute; top: 16px; right: 16px;" onclick="Timer.close()">Cancel</button>
                </div>
            `;
            this.modal.innerHTML = `<div class="timer-backdrop" onclick="Timer.close()"></div>` + html;
        };
        
        this.modal.classList.remove('hidden');
        this.attachListener();
        
        const nextTick = () => {
            if (this.mode !== 'countdown') return; // Cancelled
            if (count > 0) {
                renderCount(count);
                window.speakAlert(count.toString());
                count--;
                this.intervalId = setTimeout(nextTick, 1000);
            } else {
                renderCount('GO!');
                window.speakAlert('Go');
                if (navigator.vibrate) navigator.vibrate([200]);
                setTimeout(() => {
                    if (this.mode === 'countdown') {
                        this.close();
                        if (onDone) onDone();
                    }
                }, 1000);
            }
        };
        
        if (window.WakeLock) window.WakeLock.acquire();
        nextTick();
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
            const elapsed = this.totalDuration - diff;
            const hasTimedCues = this.roundData && this.roundData.hasTimedCues;
            
            if (hasTimedCues && !isResting && this.mode === 'round') {
                const currentCue = this.roundData.timedCues.find(c => c.time === elapsed);
                if (currentCue) {
                    window.speakAlert(currentCue.text);
                    if (currentCue.uiIndex !== undefined) {
                        this.activeComboIndex = currentCue.uiIndex;
                    }
                }
            }
            
            if (this.mode === 'warmup' && this.roundData.switchSides && diff === Math.floor(this.totalDuration / 2)) {
                window.speakAlert("Switch sides");
                const timerDisplay = this.modal.querySelector('.timer-display');
                if (timerDisplay) {
                    timerDisplay.setAttribute('data-flash', 'SWITCH SIDES');
                    timerDisplay.classList.add('flash-overlay');
                    setTimeout(() => timerDisplay.classList.remove('flash-overlay'), 2000);
                }
            } else if (diff === 10 && !hasTimedCues) {
                window.speakAlert("Ten seconds");
            } else if (diff < 10 && !hasTimedCues) {
                window.speakAlert(diff.toString());
            } else if (isResting && diff % 5 === 0) {
                window.speakAlert(diff.toString() + " seconds");
            } else if (!isResting && this.mode === 'round' && this.workoutType === 'bag' && this.comboInterval > 0 && !hasTimedCues) {
                if (elapsed > 0 && elapsed % this.comboInterval === 0) {
                    const nextIndex = Math.floor(elapsed / this.comboInterval);
                    if (nextIndex < this.roundData.combos.length && nextIndex !== this.activeComboIndex) {
                        this.speakCombo(nextIndex);
                    }
                }
            } else if (!isResting && this.mode !== 'warmup' && (this.totalDuration - diff) > 0 && (this.totalDuration - diff) % 60 === 0 && !hasTimedCues) {
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
    
    skipPhase() {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        
        if (this.mode === 'round' && this.phase === 'work' && this.roundData.restSec > 0) {
            // Skip to rest
            clearInterval(this.intervalId);
            this.phase = 'rest';
            this.totalDuration = this.roundData.restSec;
            this.endTime = Date.now() + this.roundData.restSec * 1000;
            this.hasPlayed10Sec = false;
            this.lastSpokenSecond = this.roundData.restSec;
            this.render(); // Update UI for rest phase
            this.intervalId = setInterval(() => this.tick(), 100);
            window.speakAlert("Rest starting");
        } else {
            // Otherwise finish completely
            this.completeRound();
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
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
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
            this.modal.classList.add('hidden');
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
        
        // Update combo visual if needed
        const cueContainer = this.modal.querySelector('.timer-cue-container');
        if (cueContainer && this.roundData && this.roundData.combos && this.roundData.combos.length > 0) {
            const children = cueContainer.children;
            for (let i = 0; i < children.length; i++) {
                if (this.phase === 'work' && i === this.activeComboIndex) {
                    children[i].style.color = 'var(--bag-accent, #ff4757)';
                    children[i].style.fontWeight = 'bold';
                    children[i].style.transform = 'scale(1.05)';
                    children[i].style.opacity = '1';
                } else {
                    children[i].style.color = 'var(--text-muted)';
                    children[i].style.fontWeight = 'normal';
                    children[i].style.transform = 'scale(1)';
                    children[i].style.opacity = '0.6';
                }
            }
        }
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
        
        let cueHtml = '';
        if (this.roundData && this.roundData.combos && this.roundData.combos.length > 0) {
            cueHtml = `<div class="timer-cue-container" style="display:flex; flex-direction:column; gap:4px; margin-top:24px; font-size:18px;">`;
            cueHtml += this.roundData.combos.map((combo, idx) => {
                const isActive = (this.phase === 'work' && idx === this.activeComboIndex) ? 'color: var(--bag-accent, #ff4757); font-weight: bold; transform: scale(1.05); opacity: 1;' : 'color: var(--text-muted); opacity: 0.6;';
                return `<div style="transition: all 0.3s ease; transform-origin: center; ${isActive}">${combo}</div>`;
            }).join('');
            cueHtml += `</div>`;
        } else if (cueText) {
            cueHtml = `<div class="timer-cue" style="margin-top: 24px; font-size: 18px;">${cueText}</div>`;
        }
        
        let btnText = "Finish Workout";
        if (isRestMode || (this.mode === 'round' && this.phase === 'rest')) {
            btnText = "Skip Rest";
        }
        let actionsHtml = `<button class="btn-primary" onclick="Timer.skipPhase()">${btnText}</button>`;
        
        const html = `
            <div class="timer-card round-mode ${colorClass}">
                <div class="timer-header">
                    <h3>${headerTitle}</h3>
                    <h2>${mainTitle}</h2>
                </div>
                
                <div class="timer-main">
                    <div class="timer-display giant ${colorClass}">${this.formatTime(this.remainingSeconds)}</div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill ${colorClass}" style="width: ${progressPct}%"></div></div>
                    ${cueHtml}
                </div>
                <div class="timer-actions" style="margin-top: 24px;">
                    ${actionsHtml}
                </div>
            </div>
        `;
        
        this.modal.innerHTML = `<div class="timer-backdrop" onclick="Timer.close()"></div>` + html;
    }
};
