/**
 * Phase 2 - Timer System
 * Handles Rest mode (Strength) and Round mode (Bag/Technical).
 * Uses timestamp-based countdown to prevent drift.
 */

const Timer = {
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

    startRest(seconds) {
        this.initAudio();
        this.mode = 'rest';
        this.totalDuration = seconds;
        this.endTime = Date.now() + seconds * 1000;
        this.createDOM();
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
        this.render();
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
        clearInterval(this.intervalId);
        if (this.keydownListener) {
            document.removeEventListener('keydown', this.keydownListener);
        }
        if (this.modal) {
            this.modal.classList.add('hidden');
        }
    },

    render() {
        const progress = Math.max(0, Math.min(1, this.remainingSeconds / this.totalDuration));
        const progressPct = progress * 100;
        
        let html = '';
        
        if (this.mode === 'rest') {
            html = `
                <div class="timer-card rest-mode">
                    <div class="timer-header">
                        <h3>Rest</h3>
                        <button class="btn-cancel" onclick="Timer.close()">Cancel</button>
                    </div>
                    <div class="timer-display">${this.formatTime(this.remainingSeconds)}</div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${progressPct}%"></div></div>
                    <div class="timer-actions">
                        <button class="btn-secondary" onclick="Timer.addTime(15)">+15s</button>
                        <button class="btn-primary" onclick="Timer.handleExpire()">Skip Rest</button>
                    </div>
                </div>
            `;
        } else if (this.mode === 'round') {
            const isWork = this.phase === 'work';
            const colorClass = isWork ? 'work-color' : 'rest-color';
            
            html = `
                <div class="timer-card round-mode ${colorClass}">
                    <div class="timer-header">
                        <h3>${isWork ? 'WORK' : 'REST'}</h3>
                        <button class="btn-cancel" onclick="Timer.close()">Cancel</button>
                    </div>
                    <div class="round-title">${this.roundData.title}</div>
                    <div class="timer-display giant ${colorClass}">${this.formatTime(this.remainingSeconds)}</div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill ${colorClass}" style="width: ${progressPct}%"></div></div>
                    ${this.roundData.cue && isWork ? `<div class="timer-cue">${this.roundData.cue}</div>` : ''}
                    <div class="timer-actions" style="margin-top: 24px;">
                        ${isWork ? `<button class="btn-primary" onclick="Timer.handleExpire()">End Round Early</button>` : `<button class="btn-primary" onclick="Timer.handleExpire()">Skip Rest</button>`}
                    </div>
                </div>
            `;
        }
        
        this.modal.innerHTML = `<div class="timer-backdrop" onclick="Timer.close()"></div>` + html;
    }
};
