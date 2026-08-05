/**
 * Phase 2 - Timer System
 * Handles Rest mode (Strength) and Round mode (Bag/Technical).
 * Uses timestamp-based countdown to prevent drift.
 */

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

    startRest(seconds, title, cue) {
        this.initAudio();
        this.mode = 'rest';
        this.roundData = { title: title || 'Rest Period', cue: cue || '' };
        this.totalDuration = seconds;
        this.endTime = Date.now() + seconds * 1000;
        this.createDOM();
        this.render();
        this.modal.classList.remove('hidden');
        this.attachListener();
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
    },

    startRound(workSec, restSec, title, cue, onComplete) {
        this.initAudio();
        this.mode = 'round';
        this.phase = 'work';
        this.roundData = { workSec, restSec, title, cue, onComplete };
        this.totalDuration = workSec;
        this.endTime = Date.now() + workSec * 1000;
        this.createDOM();
        this.render();
        this.modal.classList.remove('hidden');
        this.attachListener();
        this.tick();
        this.intervalId = setInterval(() => this.tick(), 100);
    },

    tick() {
        const now = Date.now();
        let diff = Math.ceil((this.endTime - now) / 1000);
        
        if (diff <= 0) {
            diff = 0;
            this.handleExpire();
        }
        
        this.remainingSeconds = diff;
        this.updateUI();
    },

    handleExpire() {
        clearInterval(this.intervalId);
        
        if (this.mode === 'rest') {
            this.playDoubleBeep();
            this.close();
        } else if (this.mode === 'round') {
            if (this.phase === 'work') {
                this.playDoubleBeep();
                if (this.roundData.restSec > 0) {
                    this.phase = 'rest';
                    this.totalDuration = this.roundData.restSec;
                    this.endTime = Date.now() + this.roundData.restSec * 1000;
                    this.render(); // Re-render once to update phase colors/text
                    this.intervalId = setInterval(() => this.tick(), 100);
                } else {
                    this.completeRound();
                }
            } else {
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
        
        this.modal.innerHTML = `<div class="timer-backdrop" onclick="Timer.close()"></div>` + html;
    }
};
