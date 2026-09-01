const icons = {
    back: `<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>`,
    forward: `<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
    info: `<svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,
    strength: `<svg viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>`,
    bag: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
    technical: `<svg viewBox="0 0 24 24"><path d="M13 2.05v7.58h4.59L8.4 21.95v-7.58H3.81z"/></svg>`,
    rest: `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
    flame: `<svg viewBox="0 0 24 24"><path d="M11.71 2.52C11.53 2.19 11 2.42 11 2.79c0 1.2-.41 2.72-1.36 3.96-1.57 2.05-3.64 3.33-3.64 6.25 0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.88-2.03-4.17-3.56-6.17-.92-1.21-1.29-2.67-1.29-3.83 0-.39-.51-.61-.71-.29l-1.07 1.8c-.85 1.42-2.31 2.5-3.84 2.5-.78 0-1.45-.48-1.74-1.18-.1-.23-.42-.23-.51 0-.17.39-.27.81-.27 1.25 0 2.21 1.79 4 4 4 1.83 0 3.35-1.23 3.84-2.91C13.25 10.97 12 9.53 11.71 2.52z"/></svg>`,
    lightbulb: `<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>`,
    checkmark: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>`,
    trend: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.25-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
    weight: `<svg viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>`,
    repeat: `<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    // Warmup exercise icons (line-art, stroke-based)
    iconJumpRope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3.5" r="1.2"/><line x1="12" y1="4.7" x2="12" y2="8.5"/><line x1="9.5" y1="6.5" x2="6.5" y2="4.5"/><line x1="14.5" y1="6.5" x2="17.5" y2="4.5"/><path d="M9 10c0 0 .8 2 3 2s3-2 3-2"/><path d="M6 14.5c-1 .8-1 2.2 0 3 .8.7 2 .7 3 0l3-2.5 3 2.5c1 .7 2.2.7 3 0 1-.8 1-2.2 0-3"/><line x1="12" y1="12" x2="12" y2="17.5" stroke-dasharray="2 1.5"/></svg>`,
    iconJumpingJacks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3.5" r="1.5"/><line x1="12" y1="5" x2="12" y2="11"/><line x1="5" y1="7.5" x2="9" y2="10.5"/><line x1="19" y1="7.5" x2="15" y2="10.5"/><line x1="12" y1="11" x2="9" y2="17"/><line x1="12" y1="11" x2="15" y2="17"/><line x1="9" y1="17" x2="7" y2="20.5"/><line x1="15" y1="17" x2="17" y2="20.5"/></svg>`,
    iconMountainClimbers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="4" r="1.5"/><path d="M14.5 6l-2 3-4 1-5 3.5"/><line x1="12.5" y1="9" x2="15" y2="13.5"/><line x1="15" y1="13.5" x2="13" y2="17.5"/><line x1="13" y1="17.5" x2="14" y2="21"/><line x1="3.5" y1="12.5" x2="7.5" y2="9"/></svg>`,
    iconShoulderCircles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.5"/><line x1="12" y1="5.5" x2="12" y2="10"/><line x1="8.5" y1="10" x2="15.5" y2="10"/><line x1="8.5" y1="10" x2="8.5" y2="15"/><line x1="15.5" y1="10" x2="15.5" y2="15"/><line x1="8.5" y1="15" x2="7" y2="20"/><line x1="15.5" y1="15" x2="17" y2="20"/><path d="M5.5 7.5 A6.5 6.5 0 0 1 18.5 7.5" stroke-dasharray="2 1.5"/><path d="M5.5 10.5 A6.5 6.5 0 0 0 18.5 10.5" stroke-dasharray="2 1.5"/></svg>`,
    iconHipCircles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.5"/><line x1="12" y1="5.5" x2="12" y2="9.5"/><line x1="9" y1="9.5" x2="15" y2="9.5"/><line x1="9" y1="9.5" x2="9" y2="14.5"/><line x1="15" y1="9.5" x2="15" y2="14.5"/><line x1="9" y1="14.5" x2="7.5" y2="20"/><line x1="15" y1="14.5" x2="16.5" y2="20"/><ellipse cx="12" cy="12" rx="5" ry="3" stroke-dasharray="2.5 1.5"/></svg>`,
    iconShadowboxing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="3.5" r="1.5"/><line x1="12" y1="5" x2="12" y2="10"/><line x1="12" y1="8" x2="5.5" y2="11.5"/><line x1="12" y1="10" x2="17.5" y2="13.5"/><line x1="5.5" y1="11.5" x2="4.5" y2="13"/><line x1="17.5" y1="13.5" x2="18.5" y2="15"/><line x1="12" y1="10" x2="12" y2="15.5"/><line x1="12" y1="15.5" x2="9.5" y2="21"/><line x1="12" y1="15.5" x2="14.5" y2="21"/></svg>`
};


const WakeLock = {
  _sentinel: null,

  async acquire() {
    if (!('wakeLock' in navigator)) {
      console.log('[WakeLock] Not supported on this browser');
      return;
    }
    try {
      this._sentinel = await navigator.wakeLock.request('screen');
      console.log('[WakeLock] Acquired');

      this._sentinel.addEventListener('release', () => {
        console.log('[WakeLock] Released by system');
      });
    } catch (err) {
      console.warn('[WakeLock] Could not acquire:', err.message);
    }
  },

  async release() {
    if (this._sentinel) {
      await this._sentinel.release();
      this._sentinel = null;
      console.log('[WakeLock] Released');
    }
  },

  handleVisibilityChange() {
    if (document.visibilityState === 'visible' && this._sentinel === null) {
      if (window.Timer && window.Timer.intervalId !== null) {
        this.acquire();
      }
    }
  }
};

window.WakeLock = WakeLock;

// ==========================================
// PERSISTENT DIAGNOSTIC LOGGING SYSTEM
// ==========================================
const SFDebug = {
    logs: [],
    maxLogs: 100,
    log(step, data = null) {
        const time = new Date().toISOString().split('T')[1].slice(0, 8) + '.' + String(new Date().getMilliseconds()).padStart(3, '0');
        const entry = { time, step, data };
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) this.logs.shift();
        try {
            sessionStorage.setItem('sf_debug_trace', JSON.stringify(this.logs));
        } catch (e) {}
        console.log(`[SF-DEBUG ${time}] ${step}`, data !== null ? data : '');
    },
    error(step, err) {
        const time = new Date().toISOString().split('T')[1].slice(0, 8) + '.' + String(new Date().getMilliseconds()).padStart(3, '0');
        const entry = { time, step, error: err ? (err.stack || err.message || String(err)) : 'Unknown Error' };
        this.logs.push(entry);
        try {
            sessionStorage.setItem('sf_debug_trace', JSON.stringify(this.logs));
        } catch (e) {}
        console.error(`[SF-DEBUG-ERR ${time}] ${step}`, err);
    },
    getText() {
        return this.logs.map(l => `[${l.time}] ${l.step}${l.data !== null && l.data !== undefined ? ' -> ' + (typeof l.data === 'object' ? JSON.stringify(l.data) : l.data) : ''}${l.error ? ' -> ERROR: ' + l.error : ''}`).join('\n');
    }
};
window.SFDebug = SFDebug;
window.addEventListener('error', (e) => {
    SFDebug.error('GLOBAL_UNCAUGHT_ERROR', { message: e.message, filename: e.filename, lineno: e.lineno, colno: e.colno });
});
window.addEventListener('unhandledrejection', (e) => {
    SFDebug.error('UNHANDLED_PROMISE_REJECTION', e.reason);
});

document.addEventListener('visibilitychange', () => {
  WakeLock.handleVisibilityChange();
});

window.addEventListener('pagehide', () => {
  WakeLock.release();
});

// Phase 2 helpers for shared UI elements
function getDayData(dayId) {
    if (typeof dayId === 'string' && dayId.startsWith('quick-')) {
        return window.quickWorkouts.find(q => q.id === dayId);
    }
    return workoutData.days.find(d => d.id === dayId || d.id == dayId);
}

function getExpandableCardIds(session) {
    if (!session) return [];
    const ids = [];
    if (session.warmup && session.warmup.length > 0) ids.push('warmup-card');
    if (session.powerPrimer) {
        ids.push(session.powerPrimer.id || 'hybrid-primer');
        if (session.powerPrimer.exercises) {
            session.powerPrimer.exercises.forEach(ex => ids.push(ex.id));
        }
    }
    if (session.exercises) session.exercises.forEach(ex => ids.push(ex.id));
    if (session.sections) session.sections.forEach(sec => ids.push(sec.id));
    if (session.powerCircuit) ids.push(session.powerCircuit.id);
    if (session.bagRounds) ids.push(session.bagRounds.id);
    if (session.circuit) ids.push(session.circuit.id);
    if (session.finisher) ids.push(session.finisher.id);
    if (session.blocks) {
        session.blocks.forEach(block => {
            if (block.type === 'exercises') {
                ids.push(block.data.id);
                if (block.data.exercises) {
                    block.data.exercises.forEach(ex => ids.push(ex.id));
                }
            } else if (block.type === 'warmup') {
                ids.push(block.data.id || 'warmup-card');
            } else if (block.type === 'bagRounds' || block.type === 'circuit') {
                ids.push(block.data.id);
            }
        });
    }
    if (session.cooldown && session.cooldown.length > 0) ids.push('cooldown-card');
    return ids;
}

function reRenderViewingDay() {
    if (typeof viewingDayId === 'string' && viewingDayId.startsWith('quick-')) {
        window.renderQuickSession(viewingDayId);
    } else {
        window.renderDay(viewingDayId);
    }
}
window.reRenderViewingDay = reRenderViewingDay;

window.logSet = function(dayId, itemId, setIndex, restSec, title, cue, btn) {
    const row = btn.closest('.set-row');
    const repInput = row.querySelector('.input-rep').value;
    const weightInput = row.querySelector('.input-weight').value;
    
    const logData = Store.getItemLog(dayId, itemId) || { sets: {} };
    if (!logData.sets) logData.sets = {};
    
    const isCompleted = logData.sets[setIndex] && logData.sets[setIndex].completed;
    logData.sets[setIndex] = {
        reps: repInput,
        weight: weightInput,
        completed: !isCompleted
    };
    
    Store.logItem(dayId, itemId, logData);
    reRenderViewingDay(); // Re-render to update UI
    
    if (!isCompleted && restSec > 0) {
        const day = getDayData(dayId);
        Timer.startRest(restSec, title, cue, day ? day.type : 'strength');
    }
};

window.toggleRound = function(e, dayId, roundId) {
    e.stopPropagation();
    const logData = Store.getItemLog(dayId, roundId) || {};
    Store.logItem(dayId, roundId, { completed: !logData.completed });
    reRenderViewingDay();
};

window.startRoundTimer = function(dayId, roundId, workSec, restSec, title, cue, restCue = '') {
    const day = getDayData(dayId);
    let timedCues = null;
    let completionCue = null;
    let itemsToComplete = [];
    if (day && day.exercises) {
        const ex = day.exercises.find(e => e.id === roundId);
        if (ex) {
            if (ex.timedCues) timedCues = ex.timedCues;
            if (ex.completionCue) completionCue = ex.completionCue;
            if (ex.rounds) itemsToComplete = ex.rounds;
            if (ex.restCue && !restCue) restCue = ex.restCue;
            if (ex.restSeconds !== undefined && (restSec === undefined || restSec === null)) restSec = ex.restSeconds;
        }
    } else if (day && day.sections) {
        const sec = day.sections.find(s => s.id === roundId);
        if (sec) {
            if (sec.timedCues) timedCues = sec.timedCues;
            if (sec.completionCue) completionCue = sec.completionCue;
            if (sec.rounds) itemsToComplete = sec.rounds;
            if (sec.restCue && !restCue) restCue = sec.restCue;
            if (sec.restSeconds !== undefined && (restSec === undefined || restSec === null)) restSec = sec.restSeconds;
        }
    }

    // Build per-exercise phase segments from timedCues for sections (e.g. Day 3 Dynamic Warm-Up & technical drills)
    let exerciseSegments = null;
    if (day && day.sections && timedCues && timedCues.length > 0) {
        const seenUiIndexes = new Set();
        const starts = [];
        const ordered = [...timedCues].sort((a, b) => a.time - b.time);
        for (const cueItem of ordered) {
            if (cueItem.uiIndex !== undefined && !seenUiIndexes.has(cueItem.uiIndex)) {
                seenUiIndexes.add(cueItem.uiIndex);
                starts.push(cueItem.time);
            }
        }
        exerciseSegments = starts.map((start, i) => {
            const childItem = itemsToComplete[i];
            return {
                start,
                end: i + 1 < starts.length ? starts[i + 1] : workSec,
                name: childItem ? `${i + 1}. ${childItem.name || childItem.combo || childItem.title}` : null,
                cue: childItem ? (childItem.cue || childItem.detail || childItem.focus || '') : null
            };
        });
    }
    
    // Pass null as customGoText so countdown cleanly ends with "Go" (single syllable)
    // and allows the initial work round cue at 0s to speak naturally without cutoff.
    Timer.startCountdown(5, title, () => {
        Timer.startRound(workSec, restSec, title, cue, day ? day.type : 'bag', () => {
            console.log('Completing round:', dayId, roundId);
            Store.logItem(dayId, roundId, { completed: true });
            if (itemsToComplete.length > 0) {
                itemsToComplete.forEach(r => {
                    console.log('Completing child:', dayId, r.id);
                    Store.logItem(dayId, r.id, { completed: true });
                });
            }
            reRenderViewingDay();
        }, timedCues, false, restCue, completionCue, exerciseSegments);
    }, null, null);
};


window.startWarmupTimer = function(dayId, itemId, duration, title, cue, switchSides) {
    const day = getDayData(dayId);
    let item = null;
    if (day && day.warmup) {
        item = day.warmup.find(w => w.id === itemId);
    }
    const segments = item ? item.segments : null;
    
    let durationText = duration + " seconds";
    if (duration === 180) durationText = "three minutes";
    else if (duration === 120) durationText = "two minutes";
    else if (duration === 90) durationText = "ninety seconds";
    else if (duration === 60) durationText = "one minute";
    else if (duration === 45) durationText = "forty five seconds";
    else if (duration === 30) durationText = "thirty seconds";
    
    const startPrompt = `${title} started. Go! This will last ${durationText}. ${cue}`;

    Timer.startCountdown(5, title, () => {
        Timer.startWarmup(duration, title, cue, switchSides, day ? day.type : 'strength', () => {
            Store.logItem(dayId, itemId, { completed: true });
            reRenderViewingDay();
        }, segments, true);
    }, null, startPrompt);
};

window.startWarmupRoundTimer = function(dayId) {
    const day = getDayData(dayId);
    if (!day || !day.warmup) return;
    
    // Use sessionDuration for rep-based exercises that don't have a duration, or warmupSessionDuration if defined
    const workSec = day.warmupSessionDuration || day.warmup.reduce((sum, w) => sum + (w.duration || w.sessionDuration || 0), 0);
    const title = "Warm-up";
    const timedCues = day.warmupTimedCues;
    const comboStr = (day.warmupCombos || day.warmup.map(w => {
        const dStr = w.duration >= 60 ? `${Math.floor(w.duration / 60)}:${(w.duration % 60).toString().padStart(2, '0')}` : `${w.duration}s`;
        return `${w.name} — ${dStr}`;
    })).join('<br>');
    
    const isHybridTimer = day.id === 1 || day.id === '1' || day.id === 0 || day.id === '0' || day.id === 2 || day.id === '2' || day.id === 4 || day.id === '4' || day.id === 5 || day.id === '5' || day.id === 'quick-upper-power' || day.id === 'quick-hybrid';
    
    // Build per-exercise phase segments from warmupTimedCues for the phase progress bar.
    // Each segment spans from its start time to the next segment's start (or total duration).
    let exerciseSegments = null;
    if (timedCues && timedCues.length > 0) {
        // Collect the start time of each exercise (cues that introduce a new uiIndex)
        const seenUiIndexes = new Set();
        const starts = [];
        const ordered = [...timedCues].sort((a, b) => a.time - b.time);
        for (const cue of ordered) {
            if (cue.uiIndex !== undefined && !seenUiIndexes.has(cue.uiIndex)) {
                seenUiIndexes.add(cue.uiIndex);
                starts.push(cue.time);
            }
        }
        // Build segments: each goes from starts[i] to starts[i+1] (or workSec)
        exerciseSegments = starts.map((start, i) => {
            const wuItem = day.warmup[i];
            return {
                start,
                end: i + 1 < starts.length ? starts[i + 1] : workSec,
                name: (isHybridTimer && wuItem) ? `${i + 1}. ${wuItem.name}` : null,
                cue: (isHybridTimer && wuItem) ? (wuItem.cue || '') : null
            };
        });
    }
    
    const restSec = day.warmupRestSeconds || 60;
    const restCue = day.warmupRestCue || "Warm-up complete! Sixty seconds rest. Take a breath and get ready.";

    // Pass null as customGoText so the countdown ends with only "Go" (one syllable,
    // completes before the first timedCue audio fires — prevents overlapping audio).
    Timer.startCountdown(5, title, () => {
        Timer.startRound(workSec, restSec, title, isHybridTimer ? '' : comboStr, day.type || 'bag', () => {
            day.warmup.forEach(item => {
                Store.logItem(dayId, item.id, { completed: true });
            });
            Store.logItem(dayId, 'warmup-card', { completed: true });
            reRenderViewingDay();
        }, timedCues, false, restCue, "Warm-up complete. Take a breath and get ready.", exerciseSegments);
    }, null, null);
};

window.resetWarmup = function(dayId) {
    const day = getDayData(dayId);
    if (!day || !day.warmup) return;
    day.warmup.forEach(item => {
        Store.logItem(dayId, item.id, { completed: false });
    });
    Store.logItem(dayId, 'warmup-card', { completed: false });
    reRenderViewingDay();
};

window.startCooldownRoundTimer = function(dayId) {
    const day = getDayData(dayId);
    if (!day || !day.cooldown) return;
    
    const workSec = day.cooldownSessionDuration || day.cooldown.reduce((sum, w) => sum + (w.workSeconds || (w.duration && String(w.duration).includes('s') ? parseInt(w.duration) : (parseFloat(w.duration) || 0) * 60) || 60), 0);
    const title = "Cool Down";
    const timedCues = day.cooldownTimedCues;
    
    // Build per-exercise phase segments from cooldownTimedCues for the phase progress bar.
    let exerciseSegments = null;
    if (timedCues && timedCues.length > 0) {
        const seenUiIndexes = new Set();
        const starts = [];
        const ordered = [...timedCues].sort((a, b) => a.time - b.time);
        for (const cue of ordered) {
            if (cue.uiIndex !== undefined && !seenUiIndexes.has(cue.uiIndex)) {
                seenUiIndexes.add(cue.uiIndex);
                starts.push(cue.time);
            }
        }
        exerciseSegments = starts.map((start, i) => {
            const cdItem = day.cooldown[i];
            return {
                start,
                end: i + 1 < starts.length ? starts[i + 1] : workSec,
                name: cdItem ? `${i + 1}. ${cdItem.name}` : null,
                cue: cdItem ? (cdItem.desc || cdItem.cue || '') : null
            };
        });
    } else {
        let currStart = 0;
        exerciseSegments = day.cooldown.map((cdItem, i) => {
            const duration = cdItem.workSeconds || (cdItem.duration && String(cdItem.duration).includes('s') ? parseInt(cdItem.duration) : (parseFloat(cdItem.duration) || 0) * 60) || 60;
            const seg = {
                start: currStart,
                end: currStart + duration,
                name: `${i + 1}. ${cdItem.name}`,
                cue: cdItem.desc || cdItem.cue || ''
            };
            currStart += duration;
            return seg;
        });
    }
    
    const completionCue = day.cooldownCompletionCue || "Cool-down complete! Fantastic work today. Hydrate and recover well.";

    Timer.startCountdown(5, title, () => {
        Timer.startRound(workSec, 0, title, '', 'bag', () => {
            day.cooldown.forEach((item, idx) => {
                Store.logItem(dayId, item.id || `cooldown-card-${idx}`, { completed: true });
                Store.logItem(dayId, `cooldown-card-${idx}`, { completed: true });
            });
            Store.logItem(dayId, 'cooldown-card', { completed: true });
            reRenderViewingDay();
        }, timedCues, false, '', completionCue, exerciseSegments);
    }, null, null);
};

window.resetCooldown = function(dayId) {
    const day = getDayData(dayId);
    if (!day || !day.cooldown) return;
    day.cooldown.forEach((item, idx) => {
        Store.logItem(dayId, item.id || `cooldown-card-${idx}`, { completed: false });
        Store.logItem(dayId, `cooldown-card-${idx}`, { completed: false });
    });
    Store.logItem(dayId, 'cooldown-card', { completed: false });
    reRenderViewingDay();
};

window.startConditioningCircuitTimer = function(quickId) {
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session || !session.circuit) return;
    const c = session.circuit;
    
    const completionsLog = Store.getItemLog(quickId, 'circuit_completions') || { count: 0 };
    const startingRound = completionsLog.count < c.rounds ? completionsLog.count + 1 : 1;
    
    const workSec = c.workSeconds || 90;
    const restSec = c.restSeconds || 45;
    
    const buildSegments = () => {
        const segDuration = Math.floor(workSec / c.exercises.length);
        return c.exercises.map((ex, i) => ({
            start: i * segDuration,
            end: (i + 1) * segDuration,
            name: `${i + 1}. ${ex.name} — ${ex.reps}`,
            cue: ex.description || ''
        }));
    };
    
    const runCircuitRound = (rNum) => {
        const title = `Circuit Round ${rNum}`;
        const timedCues = rNum === 1 ? (c.round1TimedCues || c.timedCues) : (c.round2TimedCues || c.timedCues);
        const segments = buildSegments();
        const isFinalRound = rNum >= c.rounds;
        const currentRestSec = isFinalRound ? 0 : restSec;
        const restCueText = c.restCue || "Round one complete! Forty-five seconds rest. Walk it off, breathe through your nose, and prepare for round two.";
        const completionCueText = c.completionCue || c.finishRestCue || "Conditioning circuit complete! Forty-five seconds rest. Shake it out before the Bag Finisher.";
        
        Timer.startRound(workSec, currentRestSec, title, '', 'strength', () => {
            // Auto-check all exercises for this round
            c.exercises.forEach(ex => {
                Store.logItem(quickId, ex.id, { completed: true });
            });
            Store.logItem(quickId, 'circuit_completions', { count: rNum });
            
            if (isFinalRound) {
                Store.logItem(quickId, c.id, { completed: true });
                reRenderViewingDay();
            } else {
                // Reset exercises for next round and auto-advance to round 2
                c.exercises.forEach(ex => {
                    Store.logItem(quickId, ex.id, { completed: false });
                });
                reRenderViewingDay();
                runCircuitRound(rNum + 1);
            }
        }, timedCues, false, restCueText, completionCueText, segments);
    };
    
    Timer.startCountdown(5, `Conditioning Circuit (Round ${startingRound} of ${c.rounds})`, () => {
        runCircuitRound(startingRound);
    }, null, null);
};

window.resetConditioningCircuit = function(quickId) {
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session || !session.circuit) return;
    const c = session.circuit;
    c.exercises.forEach(ex => {
        Store.logItem(quickId, ex.id, { completed: false });
    });
    Store.logItem(quickId, 'circuit_completions', { count: 0 });
    Store.logItem(quickId, c.id, { completed: false });
    reRenderViewingDay();
};

// Day 1 hybrid warmup: checkbox tap triggers individual exercise timer (timed),
// or simply toggles completed state (reps-based).
window.startWarmupExerciseFromCheckbox = function(e, dayId, itemId) {
    e.stopPropagation();
    const day = getDayData(dayId);
    if (!day || !day.warmup) return;
    const item = day.warmup.find(w => w.id === itemId);
    if (!item) return;

    const logData = Store.getItemLog(dayId, itemId) || {};
    const isCompleted = logData.completed;

    if (isCompleted) {
        // Uncheck — toggle off
        Store.logItem(dayId, itemId, { completed: false });
        reRenderViewingDay();
        return;
    }

    if (item.type === 'timed') {
        // Start individual timer for this exercise
        startWarmupTimer(dayId, itemId, item.duration, item.name, item.cue, item.switchSides);
    } else {
        // Rep-based — just mark complete
        Store.logItem(dayId, itemId, { completed: true });
        reRenderViewingDay();
    }
};

window.startPowerCircuitRound = function(quickId, roundId, workSec, restSec, title, restCue) {
    Timer.startCountdown(5, title, () => {
        Timer.startRound(workSec, restSec, title, "Focus on explosive speed", 'strength', () => {
            Store.logItem(quickId, roundId, { completed: true });
            if (String(viewingDayId).startsWith('quick-')) {
                renderQuickSession(viewingDayId);
            } else {
                reRenderViewingDay();
            }
        }, null, false, restCue);
    });
};

window.startPowerCircuitRoundFromCheckbox = function(e, sessionId, roundId, workSec, restSec, title, restCue) {
    if (e && e.stopPropagation) e.stopPropagation();
    const logData = Store.getItemLog(sessionId, roundId) || {};
    const isCompleted = !!logData.completed;

    if (isCompleted) {
        // Uncheck — toggle off
        Store.logItem(sessionId, roundId, { completed: false });
        reRenderViewingDay();
        return;
    }

    // Start power circuit round timer
    startPowerCircuitRound(sessionId, roundId, workSec, restSec, title, restCue);
};

window.toggleWarmupExpanded = function() {
    const day = getDayData(viewingDayId);
    if (!day) return;
    
    const userExpanded = sessionStorage.getItem(`warmupExpanded_${day.id}`);
    let currentlyExpanded = false;
    
    if (userExpanded === 'true') {
        currentlyExpanded = true;
    } else if (userExpanded === 'false') {
        currentlyExpanded = false;
    } else {
        if (day.warmup) {
            currentlyExpanded = day.warmup.some(item => (Store.getItemLog(day.id, item.id) || {}).completed);
        }
    }
    
    sessionStorage.setItem(`warmupExpanded_${day.id}`, currentlyExpanded ? 'false' : 'true');
    reRenderViewingDay();
};

function renderWarmup(day, parentSessionId, sessionType) {
    if (!day.warmup || day.warmup.length === 0) return '';
    
    const sessionId = parentSessionId || day.id || viewingDayId;
    const dayIdStr = typeof sessionId === 'string' ? `'${sessionId}'` : sessionId;
    const isCustomBlock = day.id && typeof day.id === 'string' && day.id.startsWith('fb-blk');
    const cardId = isCustomBlock ? day.id : 'warmup-card';
    const totalDurationSec = day.warmup.filter(w => w.type === 'timed').reduce((s, w) => s + w.duration, 0);
    const mins = Math.ceil(totalDurationSec / 60);
    const labelTitle = isCustomBlock && day.title ? day.title : 'Warm-up';
    const isRecovery = isCustomBlock && day.title && (day.title.toLowerCase().includes('recovery') || day.title.toLowerCase().includes('cool down'));
    const badgeText = isRecovery ? 'RC' : 'WU';
    const cardType = isRecovery ? 'rest' : (day.type || sessionType || 'strength');
    
    const isDay5 = false;
    const isHybridDay = (sessionId === 1 || sessionId === '1' || sessionId === 2 || sessionId === '2' || sessionId === 3 || sessionId === '3' || sessionId === 4 || sessionId === '4' || sessionId === 5 || sessionId === '5' || sessionId === 'quick-upper-power' || sessionId === 'quick-hybrid');
    let listHtml = `<div class="nested-list">`;
    day.warmup.forEach((item, idx) => {
        const logData = Store.getItemLog(sessionId, item.id) || {};
        const isCompleted = logData.completed;
        const isRepBased = item.type === 'reps';
        
        let timeOrRepsStr = '';
        if (isRepBased) {
            timeOrRepsStr = item.reps;
        } else {
            if (item.duration >= 60) {
                const mins = Math.floor(item.duration / 60);
                const secs = item.duration % 60;
                timeOrRepsStr = secs > 0 ? `${mins} min ${secs}s` : `${mins} min`;
            } else {
                timeOrRepsStr = `${item.duration}s`;
            }
        }
        
        const dayIdStr = typeof sessionId === 'string' ? `'${sessionId}'` : sessionId;
        const isCheckedStr = isCompleted ? 'checked' : '';
        const demoIconBtn = item.videoId
            ? `<button class="btn-demo-icon" aria-label="Watch demo for ${item.name.replace(/"/g, '&quot;')}" onclick="openVideoModal('${item.videoId}', '${item.name.replace(/'/g, "\\'")}', '${item.videoFormat || 'short'}')">
                   <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
               </button>`
            : '';
        
        if (isHybridDay) {
            // Hybrid layout (Day 1, Day 4 & Day 5): numbered badge left, name + stat/cue center, checkbox right
            // Checkbox tap triggers individual exercise timer (timed) or toggles (reps)
            listHtml += `
                <div class="warmup-hybrid-row ${isCheckedStr}" data-item-id="${item.id}">
                    <div class="warmup-hybrid-num">${idx + 1}</div>
                    <div class="warmup-hybrid-content">
                        <div class="warmup-hybrid-title-row">
                            <span class="warmup-hybrid-name">${item.name}</span>
                            ${demoIconBtn}
                        </div>
                        <div class="warmup-hybrid-stat-row">
                            <span class="warmup-hybrid-stat">${timeOrRepsStr}</span>
                            ${item.cue ? `<span class="warmup-hybrid-dot">&bull;</span><span class="warmup-hybrid-cue">${item.cue}</span>` : ''}
                        </div>
                    </div>
                    <button class="btn-check ${isCheckedStr}" aria-label="${isCompleted ? 'Uncheck' : (isRepBased ? 'Mark complete' : 'Start timer for')} ${item.name}" onclick="startWarmupExerciseFromCheckbox(event, ${dayIdStr}, '${item.id}')">${icons.checkmark}</button>
                </div>
            `;

        } else {
            listHtml += `
                <div class="nested-row ${isCheckedStr}">
                    <button class="btn-check ${isCheckedStr}" onclick="toggleRound(event, ${dayIdStr}, '${item.id}')">${icons.checkmark}</button>
                    <div style="flex: 1; margin-left: 12px; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <h3 class="warmup-name" style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">${item.name}</h3>
                            ${demoIconBtn}
                        </div>
                        <div class="warmup-cue" style="color: var(--text-secondary); font-size: 13px; margin-top: 2px;">${item.cue}</div>
                    </div>
                    <div class="warmup-actions" style="margin-left: 12px;">
                        <span class="warmup-duration-label" style="font-weight: 600; font-size: 13px; color: var(--accent-color);">${timeOrRepsStr}</span>
                        ${!isRepBased && !isCompleted && !day.warmupPlaylist ? `
                            <button class="btn-play type-${cardType}" onclick="startWarmupTimer(${dayIdStr}, '${item.id}', ${item.duration}, '${item.name.replace(/'/g, "\\'")}', '${item.cue.replace(/'/g, "\\'")}', ${item.switchSides})">
                                <span class="play-icon">${icons.play}</span> Start
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    });
    
    listHtml += '</div>';

    const durationDisplay = (sessionId === 5 || sessionId === '5') ? '~5:30' : (sessionId === 2 || sessionId === '2') ? '~6:30' : (sessionId === 'quick-hybrid' || sessionId === 'quick-upper-power') ? '~5 min' : isHybridDay ? '~7 min' : (mins > 0 ? `~${mins} min` : `${totalDurationSec}s`);

    let normalizedItem = {
        id: cardId,
        badge: badgeText,
        title: labelTitle,
        stats: [
            { icon: icons.clock, value: durationDisplay }
        ],
        sections: [
            { title: "EXERCISES", content: listHtml }
        ]
    };
    
    if (isDay5 || isHybridDay) {
        const isAllWUCompleted = day.warmup.every(item => (Store.getItemLog(sessionId, item.id) || {}).completed);
        if (isAllWUCompleted) {
            normalizedItem.actionHtml = `
                <button class="btn-large" style="margin-top: var(--sp-4);" onclick="resetWarmup(${dayIdStr})">Reset Warm-up</button>
            `;
        } else {
            normalizedItem.actionHtml = `
                <button class="btn-large" style="margin-top: var(--sp-4);" onclick="startWarmupRoundTimer(${dayIdStr})">Start Warm-up Session</button>
            `;
        }
    } else if (day.warmupPlaylist) {
        normalizedItem.actionHtml = `
        <div style="padding: 16px; border-top: 1px solid var(--border-color);">
            <button class="btn-primary" style="width: 100%;" onclick="startSectionSequence('${sessionId}', 'warmupPlaylist')">
                <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start Warm Up
            </button>
        </div>`;
    } else if (day.isBlockStart) {
        let startLabel = labelTitle || "Warm-up";
        normalizedItem.actionHtml = `
        <div style="padding: 16px; border-top: 1px solid var(--border-color);">
            <button class="btn-primary" style="width: 100%;" onclick="Timer.startCountdown(5, '${startLabel.replace(/'/g, "\\'")}', null)">
                <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start ${startLabel}
            </button>
        </div>`;
    }

    return renderItemCard(normalizedItem, cardType);
}

window.finishWorkout = function(dayId) {
    Store.finishWorkout(dayId);
    renderHome();
};

window.resetRound = function(dayId, exerciseId) {
    const day = getDayData(dayId);
    if (!day) return;
    if (day.exercises) {
        const ex = day.exercises.find(e => e.id === exerciseId);
        if (ex && ex.rounds) {
            ex.rounds.forEach(r => {
                Store.logItem(dayId, r.id, { completed: false });
            });
        }
    }
    if (day.sections) {
        const sec = day.sections.find(s => s.id === exerciseId);
        if (sec && sec.rounds) {
            sec.rounds.forEach(r => {
                Store.logItem(dayId, r.id, { completed: false });
            });
        }
    }
    reRenderViewingDay();
};

const appContainer = document.getElementById('app-container');
// PHASE 2 HOOK: This should read from persistence (e.g., localStorage).
// For now, mapping calendar day of week to program day (Monday = Day 1 ... Sunday = Day 7).
const jsDay = new Date().getDay();
let currentDayIndex = jsDay === 0 ? 6 : jsDay - 1; 
let expandedCardIds = new Set();
let viewingDayId = null;

function calculateSessionDuration(day) {
    if (day.type === 'rest') return null;

    let warmupSec = 0;
    if (day.warmup) {
        warmupSec = day.warmup
            .filter(w => w.type === 'timed')
            .reduce((s, w) => s + w.duration, 0);
    }

    if (day.type === 'strength') {
        // Sum of (sets × restSeconds) per exercise + warm-up
        let totalSec = day.exercises.reduce((sum, ex) => {
            const sets = parseInt(ex.setsReps) || 0;
            return sum + (sets * (ex.restSeconds || 0));
        }, 0);
        const mins = Math.ceil((totalSec + warmupSec) / 60);
        return `~${mins} min with warm-up`;
    }

    if (day.type === 'bag') {
        // Sum of (workSeconds + restSeconds) per round + warm-up
        let totalSec = day.exercises.reduce((sum, ex) => {
            return sum + (ex.workSeconds || 0) + (ex.restSeconds || 0);
        }, 0);
        const mins = Math.ceil((totalSec + warmupSec) / 60);
        return `~${mins} min with warm-up`;
    }

    if (day.type === 'technical') {
        // Sum of all section workSeconds (warm-up is already Section 1)
        let totalSec = day.sections.reduce((sum, sec) => {
            return sum + (sec.workSeconds || 0);
        }, 0);
        const mins = Math.ceil(totalSec / 60);
        return `~${mins} min total`;
    }

    return null;
}

function calculateQuickSessionDuration(qs) {
    if (!qs) return null;
    if (qs.duration) return qs.duration;
    
    let totalSec = 0;
    
    // Playlist (Continuous Sessions like HIIT Boxing)
    // If a playlist exists, it contains the entire sequence including countdowns and rests.
    if (qs.playlist) {
        qs.playlist.forEach(item => {
            totalSec += (item.duration || 0);
        });
        return `~${Math.ceil(totalSec / 60)} min`;
    }
    
    // Warm-up
    if (qs.warmup) {
        totalSec += qs.warmup.filter(w => w.type === 'timed').reduce((s, w) => s + (w.duration || 0), 0);
    }

    // Power Primer
    if (qs.powerPrimer) {
        totalSec += 420;
    }
    
    // Bag Rounds
    let bagCount = 0;
    if (qs.bagRounds && qs.bagRounds.rounds) {
        totalSec += qs.bagRounds.rounds.reduce((s, r) => s + (r.workSeconds || 0) + (r.restSeconds || 0), 0);
        bagCount = qs.bagRounds.rounds.length;
    }
    
    // Circuit
    if (qs.circuit) {
        totalSec += (qs.circuit.rounds || 0) * 180;
        if (qs.circuit.rounds > 1) {
            totalSec += (qs.circuit.rounds - 1) * (qs.circuit.restSeconds || 0);
        }
    }
    
    // Finisher
    let finisherCount = 0;
    if (qs.finisher && qs.finisher.rounds) {
        totalSec += qs.finisher.rounds.reduce((s, r) => s + (r.workSeconds || 0) + (r.restSeconds || 0), 0);
        finisherCount = qs.finisher.rounds.length;
    }
    
    // Power Circuit
    let pcCount = 0;
    if (qs.powerCircuit && qs.powerCircuit.rounds) {
        totalSec += qs.powerCircuit.rounds.reduce((s, r) => s + (r.workSeconds || 0) + (r.restSeconds || 0), 0);
        pcCount = qs.powerCircuit.rounds.length;
    }

    // Exercises (Strength)
    if (qs.exercises) {
        qs.exercises.forEach(ex => {
            let setsCount = parseInt((ex.setsReps || "1").split(" ")[0]) || 1;
            // estimate 45s of work per set
            totalSec += setsCount * 45;
            totalSec += setsCount * (ex.restSeconds || 0);
        });
    }
    
    // Cool down (fixed 3 min)
    if (qs.cooldown) {
        totalSec += 180;
    }
    
    // Sequence (Continuous Sessions)
    if (qs.sequence) {
        qs.sequence.forEach(sec => {
            if (sec.type === 'timed-list') {
                totalSec += sec.items.reduce((s, i) => s + (i.duration || 0), 0);
            } else if (sec.type === 'tabata') {
                totalSec += (sec.rounds || 0) * ((sec.workSeconds || 0) + (sec.restSeconds || 0));
            } else if (sec.type === 'circuit') {
                totalSec += (sec.rounds || 0) * (sec.roundData.totalWorkSeconds || 0);
                if (sec.rounds > 1) {
                    totalSec += (sec.rounds - 1) * (sec.restSeconds || 0);
                }
            } else if (sec.type === 'rest') {
                totalSec += (sec.duration || 0);
            }
        });
    }

    // Blocks (Hybrid Sessions like Full-Body Workout)
    if (qs.blocks) {
        qs.blocks.forEach(block => {
            if (block.type === 'warmup') {
                totalSec += block.data.warmup.filter(w => w.type === 'timed').reduce((s, w) => s + (w.duration || 0), 0);
            } else if (block.type === 'bagRounds') {
                totalSec += block.data.rounds.reduce((s, r) => s + (r.workSeconds || 0) + (r.restSeconds || 0), 0);
                bagCount += block.data.rounds.length;
            } else if (block.type === 'exercises') {
                block.data.exercises.forEach(ex => {
                    let setsCount = parseInt((ex.setsReps || "1").split(" ")[0]) || 1;
                    totalSec += setsCount * 45; // estimate 45s of work per set
                    totalSec += setsCount * (ex.restSeconds || 0);
                });
            }
        });
    }
    
    // GET READY countdowns
    totalSec += (bagCount + finisherCount + pcCount) * 5;
    
    const mins = Math.ceil(totalSec / 60);
    return `~${mins} min`;
}


function toggleCard(id) {
    const idStr = String(id);
    if (expandedCardIds.has(idStr) || expandedCardIds.has(id)) {
        expandedCardIds.delete(idStr);
        expandedCardIds.delete(id);
    } else {
        expandedCardIds.add(idStr);
        expandedCardIds.add(id);
    }
    reRenderViewingDay();
}

function expandAll() {
    if (viewingDayId === null) return;
    const session = getDayData(viewingDayId);
    if (!session) return;
    
    const cardIds = getExpandableCardIds(session);
    cardIds.forEach(id => {
        expandedCardIds.add(id);
        expandedCardIds.add(String(id));
    });
    
    reRenderViewingDay();
}
window.expandAll = expandAll;

function collapseAll() {
    expandedCardIds.clear();
    reRenderViewingDay();
}
window.collapseAll = collapseAll;

function renderItemCard(item, dayType) {
    const isExpanded = expandedCardIds.has(item.id) || expandedCardIds.has(String(item.id));
    const demoIconBtn = item.videoId
        ? `<span role="button" tabindex="0" class="btn-demo-icon" aria-label="Watch demo for ${item.title.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openVideoModal('${item.videoId}', '${item.title.replace(/'/g, "\\'")}', '${item.videoFormat || 'short'}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.stopPropagation();event.preventDefault();openVideoModal('${item.videoId}', '${item.title.replace(/'/g, "\\'")}', '${item.videoFormat || 'short'}');}">
               <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
           </span>`
        : '';
    
    let html = `
        <div class="item-card type-${dayType} ${isExpanded ? 'expanded' : ''}" data-id="${item.id}">
            <button class="item-header" onclick="toggleCard('${item.id}')" aria-expanded="${isExpanded}" aria-label="Toggle ${item.title.replace(/"/g, '&quot;')} section">
                <div class="num-badge" aria-hidden="true">${item.badge}</div>
                <div class="item-header-content">
                    <div class="item-header-top">
                        <div class="item-title-wrap">
                            <div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <h3 class="title-card">${item.title}</h3>
                                    ${demoIconBtn}
                                </div>
                                ${item.subtitle ? `<div style="font-size: 13px; color: var(--accent-color); margin-top: 2px; font-weight: 500;">${item.subtitle}</div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="item-stats">
                        ${item.stats.map((s, idx) => {
                            if (s === 'divider') return '<div class="stat-divider" aria-hidden="true"></div>';
                            return `<div class="stat-item">${s.icon ? s.icon : ''} <span class="text-mono">${s.value}</span> ${s.label ? `<span class="stat-item-label">${s.label}</span>` : ''}</div>`;
                        }).join('')}
                    </div>
                </div>
                <div class="item-chevron" aria-hidden="true">${icons.chevron}</div>
            </button>
            <div class="item-content">
                ${item.callout ? `
                <div class="item-callout" style="margin-bottom: var(--sp-4);">
                    ${item.callout.icon} <span>${item.callout.text}</span>
                </div>
                ` : ''}
                ${item.sections.map(sec => `
                <div class="item-content-section">
                    <h4 class="label-small">${sec.title}</h4>
                    ${sec.content}
                </div>
                `).join('')}
                ${item.actionHtml ? `
                <div class="item-action" style="margin-top: var(--sp-4);">
                    ${item.actionHtml}
                </div>
                ` : ''}
            </div>
        </div>
    `;
    return html;
}


function generateDashboardHTML() {
    const totalSessions = Store.getTotalSessions();
    const streak = Store.getStreak();
    
    // Days since last
    let daysSinceLast = 0;
    if (Store.state.history.length > 0) {
        const sortedDates = Store.state.history.map(h => h.date).sort().reverse();
        const lastDate = new Date(sortedDates[0]);
        const now = new Date();
        now.setHours(0,0,0,0);
        lastDate.setHours(0,0,0,0);
        daysSinceLast = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    }

    // 14-day grid
    let gridHtml = '';
    const uniqueDates = new Set(Store.state.history.map(h => h.date));
    for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const hasSession = uniqueDates.has(dStr);
        gridHtml += `<div class="adherence-box ${hasSession ? 'active' : ''}" title="${dStr}"></div>`;
    }

    // Progression Rule Banner
    let bannerHtml = '';
    const weeksElapsed = Store.getWeeksElapsed();
    if (totalSessions >= 2 || weeksElapsed >= 2) {
        // Read dismissed state
        const dismissed = localStorage.getItem('punchpower_banner_dismissed') === 'true';
        if (!dismissed) {
            bannerHtml = `
            <div class="progression-banner" id="progressionBanner">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="label-small" style="color: var(--strength-accent); margin-bottom: 4px;">PROGRESSION UNLOCKED</div>
                        <div style="font-size: 13px; line-height: 1.4;">${workoutData.progression.rules[0]}</div>
                    </div>
                    <button class="btn-close" onclick="document.getElementById('progressionBanner').style.display='none'; localStorage.setItem('punchpower_banner_dismissed', 'true');" style="background: none; border: none; color: var(--text-muted); padding: 4px;">✕</button>
                </div>
            </div>`;
        }
    }

    // Chart SVG Generation
    // Look for weights in barbell-deadlift (day 1), explosive-db-floor-press (day 1), kettlebell-swings (day 4)
    const trackExercises = ['barbell-deadlift', 'explosive-db-floor-press', 'kettlebell-swings'];
    const exLabels = {
        'barbell-deadlift': 'Deadlift',
        'explosive-db-floor-press': 'DB Press',
        'kettlebell-swings': 'KB Swings'
    };
    const colors = {
        'barbell-deadlift': '#3b82f6',
        'explosive-db-floor-press': '#10b981',
        'kettlebell-swings': '#f59e0b'
    };
    
    let pointsByEx = { 'barbell-deadlift': [], 'explosive-db-floor-press': [], 'kettlebell-swings': [] };
    let hasChartData = false;
    let minWeight = Infinity;
    let maxWeight = 0;

    Store.state.history.forEach(session => {
        trackExercises.forEach(exId => {
            if (session.logs && session.logs[exId] && session.logs[exId].sets) {
                // Find max weight logged in this session for this exercise
                let sessionMax = 0;
                Object.values(session.logs[exId].sets).forEach(set => {
                    if (set.weight && !isNaN(set.weight)) {
                        let w = parseFloat(set.weight);
                        if (w > sessionMax) sessionMax = w;
                    }
                });
                if (sessionMax > 0) {
                    pointsByEx[exId].push({ date: session.date, weight: sessionMax });
                    if (sessionMax < minWeight) minWeight = sessionMax;
                    if (sessionMax > maxWeight) maxWeight = sessionMax;
                    hasChartData = true;
                }
            }
        });
    });

    let chartHtml = '';
    if (!hasChartData) {
        chartHtml = `<div class="chart-empty">Log your weights in Strength days to track progression.</div>`;
    } else {
        // Build simple SVG chart
        // Normalize min/max for padding
        minWeight = Math.max(0, minWeight - 10);
        maxWeight = maxWeight + 10;
        const range = maxWeight - minWeight;
        
        let pathsHtml = '';
        let pointsHtml = '';
        const width = 300;
        const height = 120;
        
        trackExercises.forEach(exId => {
            let pts = pointsByEx[exId];
            if (pts.length === 0) return;
            
            // Sort by date just in case
            pts.sort((a,b) => new Date(a.date) - new Date(b.date));
            
            let d = '';
            pts.forEach((pt, i) => {
                let cx = 10 + (pts.length === 1 ? width/2 : (i / (pts.length - 1)) * (width - 20));
                let cy = height - 10 - ((pt.weight - minWeight) / range) * (height - 20);
                if (i === 0) d += `M ${cx} ${cy} `;
                else d += `L ${cx} ${cy} `;
                
                pointsHtml += `<circle cx="${cx}" cy="${cy}" r="4" fill="${colors[exId]}" />
                               <text x="${cx}" y="${cy - 10}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">${pt.weight}</text>`;
            });
            pathsHtml += `<path d="${d}" fill="none" stroke="${colors[exId]}" stroke-width="2" />`;
        });
        
        chartHtml = `
        <div class="chart-wrapper">
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
                ${pathsHtml}
                ${pointsHtml}
            </svg>
            <div class="chart-legend">
                ${trackExercises.map(exId => pointsByEx[exId].length > 0 ? `<div class="legend-item"><div class="legend-color" style="background: ${colors[exId]}"></div> ${exLabels[exId]}</div>` : '').join('')}
            </div>
        </div>`;
    }

    return `
        <div class="dashboard">
            <h2 class="section-header">Progress</h2>
            ${bannerHtml}
            
            <div class="dashboard-stats-row">
                <div class="card stat-card">
                    <div class="stat-value">${totalSessions}</div>
                    <div class="label-small">SESSIONS</div>
                </div>
                <div class="card stat-card">
                    <div class="stat-value">${streak} <span style="font-size: 14px;">days</span></div>
                    <div class="label-small">STREAK</div>
                </div>
                <div class="card stat-card">
                    <div class="stat-value">${daysSinceLast} <span style="font-size: 14px;">days</span></div>
                    <div class="label-small">SINCE LAST</div>
                </div>
            </div>

            <div class="card dashboard-card">
                <div class="label-small" style="margin-bottom: var(--sp-4);">WEIGHT PROGRESSION</div>
                ${chartHtml}
            </div>

            <div class="card dashboard-card">
                <div class="label-small" style="margin-bottom: var(--sp-2);">LAST 14 DAYS</div>
                <div class="adherence-grid">
                    ${gridHtml}
                </div>
            </div>
        </div>
    `;
}

function init() {
    renderHome();
}

function clearApp() {
    appContainer.innerHTML = '';
}

function updateGlobalHeader(isHome, day = null, dayIndex = 0, totalDays = 7) {
    let innerHtml = '';
    
    if (isHome || !day) {
        innerHtml = `
          <div class="global-header-inner is-home">
            <div class="header-left">
              <div class="header-icon">
                <img src="./assets/boxer-icon.png" alt="Strike First" class="header-icon-img"/>
              </div>
              <div class="header-text">
                <span class="header-title">Strike First</span>
                <span class="header-subtitle">Strike Hard. No Mercy.</span>
              </div>
            </div>

            <button class="header-info-btn" onclick="renderAbout()" aria-label="About Strike First">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#6b7280" stroke-width="1.4"/>
                <circle cx="10" cy="6.5" r="1.1" fill="#6b7280"/>
                <rect x="9.2" y="9" width="1.6" height="5" rx="0.8" fill="#6b7280"/>
              </svg>
            </button>
          </div>
        `;
    } else {
        const workoutDays = workoutData.days.slice(0, 5);
        const currentIndex = workoutDays.findIndex(d => d.id === (day ? day.id : null));
        const hasPrev = currentIndex > 0;
        const hasNext = currentIndex >= 0 && currentIndex < workoutDays.length - 1;
        const prevId = hasPrev && workoutDays[currentIndex - 1] ? workoutDays[currentIndex - 1].id : null;
        const nextId = hasNext && workoutDays[currentIndex + 1] ? workoutDays[currentIndex + 1].id : null;
        
        innerHtml = `
          <div class="nav-day">
            <button class="nav-back-btn" onclick="renderHome()" aria-label="Back to Week">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M8 2L2 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Week
            </button>

            <span class="nav-day-title">
              Day ${day.id} — ${day.title}
            </span>

            <div class="nav-day-arrows">
              <button class="nav-arrow-btn" onclick="${hasPrev ? `renderDay(${prevId})` : ''}" aria-label="Previous day" ${hasPrev ? '' : 'disabled'}>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M8 2L2 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="nav-arrow-btn" onclick="${hasNext ? `renderDay(${nextId})` : ''}" aria-label="Next day" ${hasNext ? '' : 'disabled'}>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M2 2L8 8L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        `;
    }

    const headerHtml = `
        <header class="app-header">
            ${innerHtml}
        </header>
    `;
    document.getElementById('global-header').innerHTML = headerHtml;
}

// ── Quick Sessions: Phase-1 static data ────────────────────────────────────
const quickSessionCards = [
    { id: 'quick-hybrid', emoji: '🥊', name: 'Hybrid Boxing',       duration: calculateQuickSessionDuration(window.quickWorkouts.find(q => q.id === 'quick-hybrid')), tag: 'Box + Conditioning', pill: 'qs-pill-amber',  type: 'bag'       },
    { id: 'quick-upper-power', emoji: '💪', name: 'Upper Body Power',     duration: '~45 min', tag: 'Strength',            pill: 'qs-pill-orange', type: 'strength'  },
    { id: 'quick-lower-power', emoji: '🦵', name: 'Lower Body Power',     duration: calculateQuickSessionDuration(window.quickWorkouts.find(q => q.id === 'quick-lower-power')) || '~50 min', tag: 'Strength',            pill: 'qs-pill-orange', type: 'strength'  },
    { id: 'quick-shadow-boxing', emoji: '<img src="./assets/boxer-icon.png" class="qs-boxer-icon" alt="Shadow Boxing" />', name: 'Shadow Boxing', duration: calculateQuickSessionDuration(window.quickWorkouts.find(q => q.id === 'quick-shadow-boxing')) || '~30 min', tag: 'Technical', pill: 'qs-pill-cyan', type: 'technical' },
    { id: 'quick-hiit-boxing', emoji: '🔥', name: 'HIIT Boxing',          duration: calculateQuickSessionDuration(window.quickWorkouts.find(q => q.id === 'quick-hiit-boxing')) || '~25 min', tag: 'Conditioning',        pill: 'qs-pill-red',    type: 'bag'      },
    { id: 'quick-full-body-explosive', emoji: '💥', name: 'Full-Body Workout',  duration: calculateQuickSessionDuration(window.quickWorkouts.find(q => q.id === 'quick-full-body-explosive')) || '~45 min', tag: 'Full Body',           pill: 'qs-pill-orange', type: 'strength'  },
];

function renderHome() {
    clearApp();
    appContainer.className = 'is-home';
    updateGlobalHeader(true);
    
    // GA4 Manual Pageview Tracking for SPA
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: 'Strike First - Home',
            page_location: location.href
        });
    }
    let html = '';
    
    // Top Row
    html += `
        <div class="home-top-row">
            <div class="label-small flex items-center gap-2" style="margin-bottom: 8px;">
                <svg viewBox="0 0 24 24" style="width: 12px; fill: var(--text-muted);"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg> 
                WEEK 1 · 7-DAY PROGRAM
            </div>
            <div class="flex justify-between items-center" style="flex-wrap: wrap;">
                <div>
                    <h1 class="title-page">Explosive Punching Power</h1>
                    <div class="text-sec" style="margin-top: 4px;">Phase 1 — Foundation · 7 days</div>
                </div>
                <div class="top-stats">
                    <div class="stat-pill type-strength">${icons.strength} 2 Strength</div>
                    <div class="stat-pill type-bag">${icons.bag} 2 Bag</div>
                    <div class="stat-pill type-technical">${icons.technical} 1 Technical</div>
                </div>
            </div>
        </div>
    `;

    // Today Banner (Current Day)
    const today = workoutData.days[currentDayIndex];
    html += `
        <div class="today-banner">
            <div class="flex items-center">
                <div class="banner-icon" aria-hidden="true">${icons.flame}</div>
                <div>
                    <div class="label-small" style="color: var(--strength-accent); margin-bottom: 4px;">TODAY</div>
                    <div style="font-size: 18px; font-weight: 700; color: #fff;">Day ${today.id} — ${today.title}</div>
                    <div class="text-sec" style="font-size: 13px; margin-top: 2px;">${today.note || "Pure power application"}</div>
                </div>
            </div>
            <button class="btn-primary" onclick="renderDay(${today.id})">Start ${icons.forward}</button>
        </div>
    `;

    // ── Quick Sessions (between TODAY and This Week) ──────────────────────────
    html += `
        <div class="qs-section">
            <div class="qs-header">
                <div class="qs-header-title">Quick Sessions</div>
                <div class="qs-header-subtitle">Pick a style. Start training.</div>
            </div>
            <div class="qs-scroll-container">
                ${quickSessionCards.map(card => {
                    const action = card.id ? `confirmQuickSessionSwap('${card.id}')` : `showQuickSessionComingSoon('${card.name.replace(/'/g, "\\\\'")}')`;  
                    return `
                    <div class="qs-card qs-type-${card.type}" role="button" tabindex="0"
                         onclick="${action};"
                         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${action};}">
                        <span class="qs-card-emoji">${card.emoji}</span>
                        <div class="qs-card-title">${card.name}</div>
                        <div class="qs-card-duration">${card.duration}</div>
                        <span class="qs-pill ${card.pill}">${card.tag}</span>
                    </div>
                `}).join('')}
            </div>
        </div>
    `;

    // Week Grid
    html += `<h2 class="section-header">This Week</h2><div class="days-grid">`;
    workoutData.days.slice(0, 5).forEach((day, index) => {
        const isCurrent = index === currentDayIndex;
        let iconName = day.type === 'rest' ? 'rest' : (day.type === 'strength' ? 'strength' : (day.type === 'bag' ? 'bag' : 'technical'));
        let countLabel = '';
        if (day.type === 'strength') countLabel = `${day.exercises.length} exercises`;
        else if (day.type === 'bag') countLabel = `${day.exercises.length} rounds`;
        else if (day.type === 'technical') countLabel = `${day.sections.length} sections`;
        else countLabel = `0 exercises`;

        html += `
            <a href="#" class="card day-card type-${day.type} ${isCurrent ? 'is-current' : ''}" onclick="event.preventDefault(); renderDay('${day.id}')" style="text-decoration: none; animation-delay: ${index * 0.06}s;">
                <div class="flex justify-between items-start" style="margin-bottom: var(--sp-4);">
                    <div class="flex items-center gap-2">
                        <div class="card-icon-box" aria-hidden="true">${icons[iconName]}</div>
                        <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : index + 1}</span>
                    </div>
                    <div class="type-badge" aria-hidden="true">${icons[iconName]} ${day.typeLabel || day.type}</div>
                </div>
                <div class="title-card" style="margin-bottom: 4px;">${day.title}</div>
                <div class="text-sec" style="font-size: 12px; margin-bottom: var(--sp-3); min-height: 18px;">${day.subtitle || ''}</div>
                <div class="text-sec" style="font-size: 13px; line-height: 1.5; margin-bottom: var(--sp-4);">${day.note || ''}</div>
                <div class="card-footer">
                    <span>${countLabel}</span>
                    <span style="color: var(--text-primary); font-weight: 500;">View ${icons.forward}</span>
                </div>
            </a>
        `;
    });

    // Rest & Recovery Banner (Days 6 & 7)
    html += `
        <div class="card rest-recovery-banner">
            <div class="rest-banner-left">
                <div class="rest-icon-box" aria-hidden="true">😴</div>
                <div class="rest-banner-text">
                    <div class="rest-banner-title">Days 6 &amp; 7 — Rest &amp; Recovery</div>
                    <div class="rest-banner-subtitle">Active mobility &amp; full rest. You've earned it — see you next week.</div>
                </div>
            </div>
            <div class="rest-pill-badge">REST</div>
        </div>
    `;
    html += `</div>`;



    // Inject Dashboard
    html += generateDashboardHTML();

    // Locked Phase
    if (workoutData.lockedPhase) {
        html += `
            <div class="card locked-card">
                <div class="flex items-center gap-4">
                    <div class="card-icon-box" aria-hidden="true" style="background: var(--bg-nested); color: var(--text-muted); border-radius: 50%;">${icons.trend}</div>
                    <div>
                        <h2 class="title-card" style="color: var(--text-secondary);">${workoutData.lockedPhase.title}</h2>
                        <div class="text-sec" style="font-size: 13px;">${workoutData.lockedPhase.subtitle}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Program Goal
    html += `
        <div class="card goal-card">
            <div class="label-small" style="margin-bottom: var(--sp-3);">PROGRAM GOAL</div>
            <div class="text-sec" style="line-height: 1.6;">${workoutData.program.goal}</div>
        </div>
    `;

    appContainer.innerHTML = html;
}

window.renderDay = function(dayIdRaw) {
    clearApp();
    appContainer.className = 'is-day-view';

    let dayId = dayIdRaw;
    if (!isNaN(dayIdRaw)) dayId = parseInt(dayIdRaw);
    const dayIndex = workoutData.days.findIndex(d => d.id === dayId);
    const day = workoutData.days[dayIndex];
    if (!day) return;

    // GA4 Manual Pageview Tracking for SPA
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: `Strike First - Day ${day.id}`,
            page_location: location.href
        });
    }
    
    viewingDayId = day.id;
    
    let iconName = day.type === 'rest' ? 'rest' : (day.type === 'strength' ? 'strength' : (day.type === 'bag' ? 'bag' : 'technical'));
    const workoutDays = workoutData.days.slice(0, 5);
    const prevDay = dayIndex > 0 ? workoutDays[dayIndex - 1] : null;
    const nextDay = (dayIndex >= 0 && dayIndex < workoutDays.length - 1) ? workoutDays[dayIndex + 1] : null;

    clearApp();
    appContainer.className = '';
    updateGlobalHeader(false, day, dayIndex, workoutDays.length);
    let html = '';

    // Nav Row
    html += `
        <div class="nav-row">
            <button class="btn-nav" onclick="renderHome()">← Week</button>
            ${prevDay ? `<button class="btn-nav" onclick="renderDay('${prevDay.id}')">‹ Day ${prevDay.id}</button>` : ''}
            <span class="nav-indicator">${dayIndex + 1} / ${workoutDays.length}</span>
            ${nextDay ? `<button class="btn-nav" onclick="renderDay('${nextDay.id}')">Day ${nextDay.id} ›</button>` : ''}
        </div>
    `;
    


    // Header Card
    html += `
        <div class="card day-header-card type-${day.type}">
            <div class="flex justify-between items-start" style="margin-bottom: var(--sp-2);">
                <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : '6-7'}</span>
                <span class="type-badge" aria-hidden="true">${icons[iconName]} ${day.typeLabel || day.type}</span>
            </div>
            <h1 class="title-page" style="margin-bottom: var(--sp-1);">${day.title}</h1>
            ${day.subtitle ? `<div class="text-sec" style="margin-bottom: var(--sp-2);">${day.subtitle}</div>` : ''}
            ${(() => { const dur = calculateSessionDuration(day); return dur ? `<div class="session-duration-stat"><span class="time-pill type-${day.type}">⏱ ${dur}</span></div>` : ''; })()}
            <div class="text-sec" style="line-height: 1.6;">${day.description || (day.note ? day.note.split('—')[0] : 'Pure power application on the heavy bag.')}</div>
        </div>
    `;

    // Callout
    const calloutText = day.callout || day.note;
    if (calloutText) {
        html += `
            <div class="callout type-${day.type}">
                ${icons.lightbulb}
                <div class="callout-text">${calloutText}</div>
            </div>
        `;
    }

    // Content Section Header
    if (day.type !== 'rest') {
        let countLabel = '';
        let totalTime = null;
        
        if (day.type === 'strength') {
            countLabel = `EXERCISES · ${day.exercises.length}`;
        } else if (day.type === 'bag') {
            countLabel = `ROUNDS · ${day.exercises.length}`;
            let totalSeconds = day.exercises.reduce((sum, ex) => {
                let w = ex.workSeconds || 0;
                let r = ex.restSeconds || 0;
                return sum + (w + r);
            }, 0);
            if (totalSeconds > 0) totalTime = `${Math.ceil(totalSeconds / 60)} min total`;
        } else if (day.type === 'technical') {
            countLabel = `SECTIONS · ${day.sections.length}`;
            let totalMins = day.sections.reduce((sum, sec) => {
                let minStr = sec.duration.replace(/[^0-9]/g, '');
                return sum + (parseInt(minStr) || 0);
            }, 0);
            if (totalMins > 0) totalTime = `${totalMins} min total`;
        }

        const expandableIds = getExpandableCardIds(day);
        const totalExpandable = expandableIds.length;
        const totalExpanded = expandableIds.filter(id => expandedCardIds.has(id) || expandedCardIds.has(String(id))).length;

        let allExpanded = false;
        let toggleAction = "expandAll()";
        let toggleText = "Expand all";
        
        if (totalExpandable > 0 && totalExpanded === totalExpandable) {
            allExpanded = true;
            toggleAction = "collapseAll()";
            toggleText = "Collapse all";
        }

        html += `
            <div class="content-header-row">
                <h2 class="label-small">${countLabel}</h2>
                <div class="right-actions">
                    ${totalTime ? `<span class="time-pill type-${day.type}">${icons.clock} ${totalTime}</span>` : ''}
                    <button class="btn-nav" style="font-size: 11px;" onclick="${toggleAction}">${toggleText}</button>
                </div>
            </div>
        `;
    }

    // Items
    html += `<div class="item-list">`;
    
    html += renderWarmup(day, day.id);

    if (day.type === 'rest') {
        html += `
            <div class="card type-rest">
                <ul class="rest-list">
                    ${day.notes.map(n => `<li>${n.text}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (day.type === 'technical') {
        let roundCounter = 1;
        day.sections.forEach((sec, idx) => {
            let drillsHtml = sec.rounds ? sec.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                const demoIconBtn = r.videoId
                    ? `<button class="btn-demo-icon" aria-label="Watch demo for ${r.combo.replace(/"/g, '&quot;')}" onclick="openVideoModal('${r.videoId}', '${r.combo.replace(/'/g, "\\'")}', '${r.videoFormat || 'short'}')">
                           <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                       </button>`
                    : '';
                const drillText = `${r.round ? `Round ${r.round} — ` : ''}${r.combo}${r.focus ? ` : ${r.focus}` : ''}`;
                return `
                <div class="nested-row ${isChecked}" data-item-id="${r.id}">
                    <div class="set-num">${i + 1}</div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 14px; line-height: 1.4; color: var(--text-primary);">${drillText}</span>
                            ${demoIconBtn}
                        </div>
                    </div>
                    <button class="btn-check ${isChecked}" aria-label="${isChecked ? 'Uncheck' : 'Complete'} segment ${i + 1}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                </div>`;
            }).join('') : '';

            let badge;
            const secNameLower = (sec.name || '').toLowerCase();
            if (sec.badge) {
                badge = sec.badge;
            } else if (secNameLower.includes('warm-up') || secNameLower.includes('warmup')) {
                badge = 'WU';
            } else if (secNameLower.includes('cool down') || secNameLower.includes('cooldown') || secNameLower.includes('mobility')) {
                badge = 'CD';
            } else {
                badge = `R${roundCounter++}`;
            }

            let allCompleted = sec.rounds ? sec.rounds.every(r => Store.getItemLog(day.id, r.id)?.completed) : false;
            let startLabel = "Start Section Timer";
            let onClickAction = `startRoundTimer(${day.id}, '${sec.id}', ${sec.workSeconds}, ${sec.restSeconds || 0}, '${sec.name.replace(/'/g, "\\'")}', '', '${(sec.restCue || '').replace(/'/g, "\\'")}')`;
            if (allCompleted) {
                startLabel = `Reset ${sec.name}`;
                onClickAction = `resetRound(${day.id}, '${sec.id}')`;
            }

            let normalizedItem = {
                id: sec.id,
                badge: badge,
                title: sec.name,
                stats: [
                    { value: sec.duration },
                    'divider',
                    { value: `${sec.rounds ? sec.rounds.length : 'Multiple'} drills` }
                ],
                callout: { icon: icons.technical, text: sec.cue || "Focus on mechanics and form over power." },
                sections: [
                    { title: "DETAILS", content: `<p>${sec.detail}</p>` },
                    { title: "DRILLS", content: `<div class="nested-list">${drillsHtml}</div>` }
                ],
                actionHtml: `<button class="btn-large" style="margin-top: var(--sp-4);" onclick="${onClickAction}">${startLabel}</button>`
            };
            
            html += renderItemCard(normalizedItem, day.type);
        });
    } else if (day.type === 'bag') {
        day.exercises.forEach((ex, idx) => {
            let roundsHtml = ex.rounds ? ex.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                const demoIconBtn = r.videoId
                    ? `<button class="btn-demo-icon" aria-label="Watch demo for ${r.combo.replace(/"/g, '&quot;')}" onclick="openVideoModal('${r.videoId}', '${r.combo.replace(/'/g, "\\'")}', '${r.videoFormat || 'short'}')">
                           <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                       </button>`
                    : '';
                let rowClass = `nested-row ${isChecked}`;
                if (day.id === 5) {
                    rowClass += ` continuous-row`;
                }

                return `
                <div class="${rowClass}" data-item-id="${r.id}">
                    <div class="set-num">${i + 1}</div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 14px; line-height: 1.4; color: var(--text-primary);">
                                ${r.combo}
                            </span>
                            ${demoIconBtn}
                        </div>
                    </div>
                    <button class="btn-check ${isChecked}" aria-label="${isChecked ? 'Uncheck' : 'Complete'} segment ${i + 1}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                </div>`;
            }).join('') : `<div class="nested-row"><div class="set-num">1</div><div style="flex:1; min-width: 0;">${ex.notes}</div><button class="btn-check ${Store.getItemLog(day.id, ex.id)?.completed ? 'checked':''}" onclick="toggleRound(event, ${day.id}, '${ex.id}')">${icons.checkmark}</button></div>`;

            let allCompleted = ex.rounds ? ex.rounds.every(r => Store.getItemLog(day.id, r.id)?.completed) : false;
            let startLabel = "Start Round Timer";
            let onClickAction = `startRoundTimer(${day.id}, '${ex.id}', ${ex.workSeconds}, ${ex.restSeconds}, '${ex.name.replace(/'/g, "\\'")}', '${(ex.rounds ? ex.rounds.map(r => r.combo).join('<br>') : '').replace(/'/g, "\\'")}', '${(ex.restCue || '').replace(/'/g, "\\'")}')`;
            
            if (day.id === 5) {
                if (allCompleted) {
                    startLabel = `Reset ${ex.name}`;
                    onClickAction = `resetRound(${day.id}, '${ex.id}')`;
                }
            }

            let normalizedItem = {
                id: ex.id,
                badge: `R${idx + 1}`,
                title: ex.name,
                stats: [
                    { icon: icons.clock, value: ex.setsReps },
                    { icon: icons.flame, value: ex.intensity || "85-95%" }
                ],
                callout: { icon: icons.flame, text: ex.benefits },
                sections: [
                    { title: "COMBINATIONS", content: `<div class="nested-list">${roundsHtml}</div>` }
                ],
                actionHtml: `<button class="btn-large" style="margin-top: var(--sp-4);" onclick="${onClickAction}">${startLabel}</button>`
            };
            html += renderItemCard(normalizedItem, day.type);
        });
    } else {
        // Strength
        day.exercises.forEach((ex, idx) => {
            let musclesHtml = ex.muscles ? ex.muscles.split(',').map(m => `<div class="muscle-tag">${m.trim()}</div>`).join('') : '';
            
            let stats = [
                { icon: icons.repeat, value: ex.setsReps, label: "sets × reps" },
                "divider",
                { icon: icons.weight, value: ex.weight }
            ];
            if (ex.restSeconds) {
                let m = Math.floor(ex.restSeconds / 60);
                let s = ex.restSeconds % 60;
                let text = m > 0 && s > 0 ? `${m} min ${s} sec rest` : m > 0 ? `${m} min rest` : `${s} sec rest`;
                stats.push("divider");
                stats.push({ icon: icons.rest, value: text });
            }

            
            // Generate Set Logging Rows
            let setsCount = parseInt((ex.setsReps || "1").split(/[xX\u00d7\s]/)[0]) || 1;
            let logHtml = '';
            const logData = Store.getItemLog(day.id, ex.id) || { sets: {} };
            const defaultCue = "Drive through the floor explosively — speed matters over weight.";
            const restCue = ex.restCue || defaultCue;
            for(let s=1; s<=setsCount; s++) {
                const setData = logData.sets[s] || {};
                const isChecked = setData.completed ? 'checked' : '';
                const repsParts = (ex.setsReps || '').split(/[xX\u00d7]/);
                const repsVal = setData.reps || (repsParts[1] ? repsParts[1].trim() : '5');
                const weightVal = setData.weight || ex.weight || '';
                
                logHtml += `
                <div class="set-row ${isChecked}">
                    <div class="set-num">${s}</div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-weight" value="${weightVal}" placeholder="kg" />
                        <span class="input-label">weight</span>
                    </div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-rep" value="${repsVal}" />
                        <span class="input-label">reps</span>
                    </div>
                    <button class="btn-check ${isChecked}" onclick="logSet(${day.id}, '${ex.id}', ${s}, ${ex.restSeconds}, '${ex.name.replace(/'/g, "\\'")}', '${restCue.replace(/'/g, "\\'")}', this)">${icons.checkmark}</button>
                </div>
                `;
            }

            let normalizedItem = {
                id: ex.id,
                badge: `R${idx + 1}`,
                title: ex.name,
                videoId: ex.videoId,
                videoFormat: ex.videoFormat,
                stats: stats,
                callout: { icon: icons.strength, text: ex.cue || defaultCue },
                sections: [
                    { title: "LOG SETS", content: logHtml },
                    { title: "EXECUTION NOTES", content: `<p>${ex.notes}</p>` },
                    { title: "WHY THIS EXERCISE", content: `<p>${ex.benefits}</p>` },
                    { title: "MUSCLES WORKED", content: `<div class="muscle-tags">${musclesHtml}</div>` }
                ]
            };

            html += renderItemCard(normalizedItem, day.type);
        });
    }
    
    if (day.powerCircuit) {
        const pc = day.powerCircuit;
        const isExpanded = expandedCardIds.has(pc.id);
        
        const roundsHtml = pc.rounds.map((r, i) => {
            const log = Store.getItemLog(day.id, r.id) || {};
            const isCompleted = !!log.completed;
            const isChecked = isCompleted ? 'checked' : '';
            const dayIdStr = typeof day.id === 'string' ? `'${day.id}'` : day.id;
            
            return `
            <div class="nested-row ${isChecked}">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">${r.combo}</div>
                <button class="btn-check ${isChecked}" aria-label="${isCompleted ? 'Uncheck' : 'Start timer for'} ${r.name}" onclick="startPowerCircuitRoundFromCheckbox(event, ${dayIdStr}, '${r.id}', ${r.workSeconds}, ${r.restSeconds}, '${r.name.replace(/'/g, "\\'")}', '${r.restCue ? r.restCue.replace(/'/g, "\\'") : ''}')">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        let normalizedItem = {
            id: pc.id,
            badge: pc.badge || `R${day.exercises ? day.exercises.length + 1 : 1}`,
            title: pc.name,
            stats: [
                { icon: icons.clock, value: `~${Math.ceil((pc.rounds.length * 90 + 60) / 60)} min` },
                'divider',
                { icon: icons.repeat, value: `${pc.rounds.length} rounds` }
            ],
            callout: { icon: icons.flame, text: pc.benefits },
            sections: [
                { title: "ROUNDS", content: `<div class="nested-list">${roundsHtml}</div>` }
            ]
        };
        html += renderItemCard(normalizedItem, day.type || 'strength');
    }
    
    if (day.cooldown) {
        let drillsHtml = day.cooldown.map((n, i) => {
            const log = Store.getItemLog(day.id, 'cooldown-card-' + i) || {};
            const isCompleted = !!log.completed;
            const isChecked = isCompleted ? 'checked' : '';
            const demoIconBtn = n.videoId
                ? `<button class="btn-demo-icon" aria-label="Watch demo for ${n.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openVideoModal('${n.videoId}', '${n.name.replace(/'/g, "\\'")}', '${n.videoFormat || 'short'}')">
                       <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                   </button>`
                : '';
            return `
            <div class="nested-row interactive ${isChecked}" role="button" tabindex="0" onclick="Store.logItem(${day.id}, 'cooldown-card-${i}', { completed: !${isCompleted} }); renderDay(${day.id})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); Store.logItem(${day.id}, 'cooldown-card-${i}', { completed: !${isCompleted} }); renderDay(${day.id});}">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 500;">${n.name} — ${n.duration}</span>
                        ${demoIconBtn}
                    </div>
                    ${n.desc ? `<div style="font-size: 13px; opacity: 0.8; margin-top: 2px;">${n.desc}</div>` : ''}
                </div>
                <button class="btn-check ${isChecked}" aria-label="${isCompleted ? 'Uncheck' : 'Complete'} ${n.name}">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        let cdMinsStr = '~3 min';
        let totalCdSec = 0;
        day.cooldown.forEach(c => {
            if (c.workSeconds) totalCdSec += c.workSeconds;
            else if (c.duration && String(c.duration).includes('s')) totalCdSec += parseInt(c.duration) || 0;
            else if (c.duration && String(c.duration).includes('min')) totalCdSec += (parseFloat(c.duration) || 0) * 60;
            else totalCdSec += 60;
        });
        const m = Math.floor(totalCdSec / 60);
        const s = totalCdSec % 60;
        cdMinsStr = s > 0 ? `~${m} min ${s}s` : `~${m} min`;

        let normalizedItem = {
            id: 'cooldown-card',
            badge: 'CD',
            title: 'Cool Down',
            stats: [{ icon: icons.clock, value: cdMinsStr }],
            sections: [ { title: "STRETCHES & RECOVERY", content: `<div class="nested-list">${drillsHtml}</div>` } ]
        };

        const isAllCDCompleted = day.cooldown.every((item, i) => (Store.getItemLog(day.id, 'cooldown-card-' + i) || {}).completed || (Store.getItemLog(day.id, item.id) || {}).completed);
        if (isAllCDCompleted) {
            normalizedItem.actionHtml = `
                <button class="btn-large" style="margin-top: var(--sp-4);" onclick="resetCooldown(${day.id})">Reset Cool Down</button>
            `;
        } else {
            normalizedItem.actionHtml = `
                <button class="btn-large" style="margin-top: var(--sp-4);" onclick="startCooldownRoundTimer(${day.id})">Start Cool Down Session</button>
            `;
        }

        html += renderItemCard(normalizedItem, day.type || 'strength');
    }
    
    html += `</div>`; // .item-list
    
    html += `
        <div style="margin-top: 32px; margin-bottom: 64px;">
            <button class="btn-complete-session" onclick="finishWorkout(${day.id})">${icons.checkmark} Complete Session</button>
        </div>
    `;


    appContainer.innerHTML = html;
}

function renderAbout() {
    clearApp();
    appContainer.className = '';
    updateGlobalHeader(false);
    let html = '';
    
    html += `<button class="btn-nav" style="margin-bottom: var(--sp-6);" onclick="renderHome()">${icons.back} Back to Week</button>`;
    
    html += `
        <div class="card about-card" style="padding: var(--sp-6);">
            <div class="flex items-center gap-4">
                <div class="header-icon" style="width: 48px; height: 48px; border-radius: 12px; margin: 0; flex-shrink: 0; background: #E8643A; display: flex; align-items: center; justify-content: center;">
                    <img src="./assets/boxer-icon.png" style="width: 32px; height: 32px; object-fit: contain; filter: brightness(0) invert(1);"/>
                </div>
                <div style="text-align: left;">
                    <h1 class="title-page" style="margin-bottom: 2px; font-size: 24px;">Strike First</h1>
                    <div class="text-sec">Strike Hard. No Mercy.</div>
                </div>
            </div>
        </div>
    `;
    
    const p = workoutData.program;
    html += `
        <div class="card about-card">
            <div class="about-header">${icons.lightbulb} <span class="about-title">Program Goal</span></div>
            <p class="about-p">${p.goal}</p>
        </div>
        
        <div class="card about-card">
            <div class="about-header">${icons.lightbulb} <span class="about-title">Why This Split Works</span></div>
            <p class="about-p">${p.whySplit}</p>
        </div>
        
        <div class="card about-card">
            <div class="about-header">${icons.calendar} <span class="about-title">General Training Rules</span></div>
            <ul class="about-list">
                ${p.generalRules.map((r, i) => `
                    <li>
                        <div class="about-list-num">${i + 1}</div>
                        <div>${r}</div>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="card about-card">
            <div class="about-header">${icons.trend} <span class="about-title">Progression Rules</span></div>
            <ul class="timeline-list" style="list-style: none; padding-left: 8px; margin-top: var(--sp-4);">
                ${workoutData.progression.rules.map((r, i) => {
                    const prefixes = ["Every 2-3 Weeks", "When Form is Clean", "Every 2 Weeks", "Subjective Check"];
                    let prefix = prefixes[i] || "Rule";
                    return `
                        <li style="position: relative; padding-left: 24px; padding-bottom: 24px;">
                            <div style="position: absolute; left: 0; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: var(--strength-accent);"></div>
                            ${i !== workoutData.progression.rules.length - 1 ? `<div style="position: absolute; left: 3px; top: 12px; bottom: 0; width: 2px; background: var(--strength-border);"></div>` : ''}
                            <div class="about-rule-highlight" style="font-size: 13px; line-height: 1.2;">${prefix}</div>
                            <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${r}</div>
                        </li>
                    `;
                }).join('')}
            </ul>
        </div>
        
        <div class="card about-card">
            <div class="about-header">${icons.bag} <span class="about-title">Equipment Required</span></div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: var(--sp-4);">
                ${workoutData.equipmentNotes.map((n, i) => {
                    const isRequired = i < 2;
                    const pillClass = isRequired ? 'about-pill-req' : 'about-pill-opt';
                    const pillText = isRequired ? 'Required' : 'Optional';
                    let [title, ...rest] = n.split(':');
                    let desc = rest.join(':');
                    let displayTitle = desc ? title : n.split('—')[0];
                    let displayDesc = desc ? desc : (n.split('—')[1] || n);
                    
                    return `
                        <li style="display: flex; justify-content: space-between; align-items: flex-start; background: var(--bg-nested); padding: 16px; border-radius: var(--radius-inner); border: 1px solid var(--border-card);">
                            <div style="padding-right: 16px;">
                                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${displayTitle}</div>
                                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${displayDesc.trim()}</div>
                            </div>
                            <div class="${pillClass}" style="flex-shrink: 0;">${pillText}</div>
                        </li>
                    `;
                }).join('')}
            </ul>
        </div>
        
        <div class="card about-card">
            <div class="about-header">${icons.lightbulb} <span class="about-title">Key Reminders</span></div>
            <ul class="about-list" style="gap: 16px;">
                ${workoutData.keyReminders.map((r, i) => `
                    <li style="align-items: flex-start;">
                        <div class="about-list-num">${i + 1}</div>
                        <div style="padding-top: 2px;">${r}</div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    html += `
        <div style="display: flex; justify-content: center; margin-top: var(--sp-6);">
            <button class="back-to-week-btn" onclick="renderHome()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                    <path d="M10 3L5 8L10 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Back to This Week
            </button>
        </div>
    `;
    
    appContainer.innerHTML = html;
}

// --- YouTube Video Modal Logic ---

let toastTimeout;

function showToast(msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    
    toast.classList.remove('show');
    clearTimeout(toastTimeout);
    
    // Force reflow to restart animation
    void toast.offsetWidth;
    
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Phase-1 placeholder handler for Quick Session cards
window.showQuickSessionComingSoon = function(name) {
    showToast('🥊 Coming soon — ' + name);
};

// Swap Confirmation Banner for Quick Sessions
window.confirmQuickSessionSwap = function(quickId) {
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'video-modal-overlay';
    overlay.id = 'swap-banner';
    
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    };
    
    overlay.innerHTML = `
        <div class="video-modal-card" style="text-align: center; padding: var(--sp-6) var(--sp-5);">
            <div class="video-modal-title" style="margin-bottom: var(--sp-5); line-height: 1.4;">Doing ${session.title} today instead of your scheduled workout?</div>
            <div style="display: flex; gap: var(--sp-3); justify-content: center; width: 100%;">
                <button class="btn-ghost" style="flex: 1;" onclick="this.closest('.video-modal-overlay').remove()">Cancel</button>
                <button id="btn-confirm-swap" class="btn-primary" style="flex: 1;" onclick="this.closest('.video-modal-overlay').remove(); renderQuickSession('${quickId}')">Confirm</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
};


let activeVideoReturnFocus = null;

window.openVideoModal = function(videoId, title, format = 'short') {
    if (!navigator.onLine) {
        showToast("Video unavailable — connect to the internet to watch");
        return;
    }
    
    activeVideoReturnFocus = document.activeElement;
    
    const overlay = document.createElement('div');
    overlay.className = 'video-modal-overlay';
    overlay.id = 'videoModalOverlay';
    overlay.onclick = function(e) {
        if (e.target === overlay) closeVideoModal();
    };
    
    // Fallback URL for footer link
    const fbUrl = `https://www.youtube.com/shorts/${videoId}`;
    
    const html = `
        <div class="video-modal-card">
            <!-- Close button: always visible, overlaid top-right -->
            <button class="btn-close-modal" onclick="closeVideoModal()" aria-label="Close video">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <!-- Title block — padded right so text clears the X button -->
            <div style="padding: 12px 60px 8px 16px; flex-shrink: 0;">
                <div class="video-modal-title">${title}</div>
                <div class="video-modal-subtitle">EXERCISE DEMO</div>
            </div>
            <div class="video-container format-${format}">
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${videoId}" 
                    title="${title} video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="video-modal-footer">
                <a href="${fbUrl}" target="_blank" style="color: var(--strength-accent); text-decoration: none; font-size: 12px;">Watch on YouTube ↗</a>
            </div>
        </div>
    `;
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    
    // Close on Escape key
    const onEsc = function(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
            document.removeEventListener('keydown', onEsc);
        }
    };
    document.addEventListener('keydown', onEsc);
};

window.closeVideoModal = function() {
    const overlay = document.getElementById('videoModalOverlay');
    if (overlay) {
        overlay.remove(); // This instantly destroys the iframe and stops the audio
    }
    if (activeVideoReturnFocus && typeof activeVideoReturnFocus.focus === 'function') {
        activeVideoReturnFocus.focus();
        activeVideoReturnFocus = null;
    }
};

// Fix for iOS Safari :active state
document.addEventListener('touchstart', function() {}, {passive: true});

document.addEventListener('DOMContentLoaded', init);


// Splash Screen Logic
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Add a slight delay so it feels like a real app loading
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.remove();
            }, 400); // Matches the CSS transition duration
        }, 600);
    }
});

// =====================================================================
// Phase 2 — Quick Sessions Renderer
// =====================================================================

window.startQuickBagRoundFromCheckbox = function(e, quickId, exId, workSec, restSec, roundNum, title, comboArg, isLast, timedCuesArg, skipCountdown, restCueArg) {
    if (e && e.stopPropagation) e.stopPropagation();
    const logData = Store.getItemLog(quickId, exId) || {};
    const isCompleted = !!logData.completed;

    if (isCompleted) {
        // Uncheck — toggle off
        Store.logItem(quickId, exId, { completed: false });
        if (String(viewingDayId).startsWith('quick-')) {
            renderQuickSession(viewingDayId);
        } else {
            reRenderViewingDay();
        }
        return;
    }

    startQuickRound(quickId, exId, workSec, restSec, roundNum, title, comboArg, isLast, timedCuesArg, skipCountdown, restCueArg);
};

window.startQuickRound = function(quickId, exId, workSec, restSec, roundNum, title, comboArg, isLast, timedCuesArg, skipCountdown, restCueArg) {
    const cue = decodeURIComponent(comboArg);
    const restCue = restCueArg ? decodeURIComponent(restCueArg) : '';
    const timedCues = timedCuesArg ? JSON.parse(decodeURIComponent(timedCuesArg)) : null;
    const startRound = () => {
        Timer.startRound(workSec, restSec, title, cue, 'bag', () => {
            Store.logItem(quickId, exId, { completed: true });
            if (isLast) {
                setTimeout(() => {
                    window.speakAlert("Session complete — outstanding work!");
                }, 500);
            }
            if (viewingDayId === quickId) renderQuickSession(quickId);
        }, timedCues, false, restCue);
    };
    if (skipCountdown) {
        startRound();
    } else {
        Timer.startCountdown(5, title, startRound);
    }
};

window.toggleQuickCircuitItem = function(quickId, itemId) {
    const logData = Store.getItemLog(quickId, itemId) || {};
    const isCompleted = !!logData.completed;
    
    // Toggle completed state for this item
    Store.logItem(quickId, itemId, { completed: !isCompleted });
    
    const session = window.quickWorkouts.find(q => q.id === quickId);
    let shouldStartRest = false;
    let restDuration = 0;
    let restTitle = "";
    let restCue = "";
    let onRestComplete = null;

    if (session && session.circuit) {
        if (!isCompleted) {
            // Checkbox was just checked — check if all exercises in circuit are now checked
            const allDone = session.circuit.exercises.every(ex => {
                const l = Store.getItemLog(quickId, ex.id);
                return l && l.completed;
            });
            
            if (allDone) {
                const completionsLog = Store.getItemLog(quickId, 'circuit_completions') || { count: 0 };
                completionsLog.count += 1;
                Store.logItem(quickId, 'circuit_completions', completionsLog);
                
                if (completionsLog.count < session.circuit.rounds) {
                    shouldStartRest = true;
                    restDuration = session.circuit.restSeconds || 45;
                    restTitle = "Circuit Rest";
                    restCue = session.circuit.restCue || "One round down. Shake out the legs before the next round.";
                    onRestComplete = () => {
                        session.circuit.exercises.forEach(e => {
                            Store.logItem(quickId, e.id, { completed: false });
                        });
                        if (viewingDayId === quickId) renderQuickSession(quickId);
                    };
                } else if (session.circuit.finishRestCue) {
                    shouldStartRest = true;
                    restDuration = session.circuit.restSeconds || 45;
                    restTitle = "Circuit Complete";
                    restCue = session.circuit.finishRestCue;
                    onRestComplete = () => {
                        if (viewingDayId === quickId) renderQuickSession(quickId);
                    };
                }
            }
        } else {
            // Checkbox was unchecked — if all are now unchecked, reset completions counter
            const anyChecked = session.circuit.exercises.some(ex => {
                const l = Store.getItemLog(quickId, ex.id);
                return l && l.completed;
            });
            if (!anyChecked) {
                Store.logItem(quickId, 'circuit_completions', { count: 0 });
            }
        }
    }
    
    // Re-render UI to update checkbox states and round header
    if (viewingDayId === quickId) renderQuickSession(quickId);
    
    // Trigger rest timer if round 1 completed
    if (shouldStartRest) {
        Timer.startRest(restDuration, restTitle, restCue, "strength", onRestComplete);
    }
};

window.completeCircuitRound = function(quickId) {
    SFDebug.log('COMPLETE_ROUND_TAP', { quickId, viewingDayId });
    try {
        const session = window.quickWorkouts.find(q => q.id === quickId);
        if (!session) {
            SFDebug.error('SESSION_NOT_FOUND', { quickId });
            return;
        }
        if (!session.circuit) {
            SFDebug.error('SESSION_CIRCUIT_NOT_FOUND', { quickId, hasCircuit: !!session.circuit });
            return;
        }
        
        // 1. Force all exercises in this circuit to be completed
        session.circuit.exercises.forEach(ex => {
            Store.logItem(quickId, ex.id, { completed: true });
        });
        SFDebug.log('EXERCISES_MARKED_COMPLETED', session.circuit.exercises.map(e => e.id));
        
        // 2. Increment completions log
        const completionsLogBefore = Store.getItemLog(quickId, 'circuit_completions') || { count: 0 };
        const completionsLog = { count: (completionsLogBefore.count || 0) + 1 };
        Store.logItem(quickId, 'circuit_completions', completionsLog);
        SFDebug.log('COMPLETIONS_INCREMENTED', { before: completionsLogBefore.count || 0, after: completionsLog.count, roundsTotal: session.circuit.rounds });
        
        // 3. Determine if rest is needed
        if (completionsLog.count < session.circuit.rounds) {
            SFDebug.log('TRIGGERING_REST_PATH', { currentCount: completionsLog.count, rounds: session.circuit.rounds, restSeconds: session.circuit.restSeconds });
            
            // Re-render immediately so checkboxes show as checked before rest modal appears
            if (viewingDayId === quickId) {
                SFDebug.log('CALLING_RENDER_QUICK_SESSION');
                renderQuickSession(quickId);
            }
            
            const restCueText = "One round down. Shake out the legs before the next round.";
            const args = {
                duration: session.circuit.restSeconds,
                title: "Circuit Rest",
                cue: restCueText,
                workoutType: "strength"
            };
            SFDebug.log('CALLING_TIMER_START_REST', args);
            
            Timer.startRest(session.circuit.restSeconds, "Circuit Rest", restCueText, "strength", () => {
                SFDebug.log('REST_ON_COMPLETE_CALLBACK_FIRED');
                // Uncheck exercises for the next round
                session.circuit.exercises.forEach(e => {
                    Store.logItem(quickId, e.id, { completed: false });
                });
                if (viewingDayId === quickId) renderQuickSession(quickId);
            });

            // Inspect DOM immediately
            const modalEl = document.querySelector('#timer-modal');
            const modalCheck = {
                modalFoundInDOM: !!modalEl,
                inBody: modalEl ? modalEl.parentNode === document.body : false,
                classList: modalEl ? modalEl.className : null,
                computedDisplay: modalEl ? window.getComputedStyle(modalEl).display : null,
                computedVisibility: modalEl ? window.getComputedStyle(modalEl).visibility : null,
                computedZIndex: modalEl ? window.getComputedStyle(modalEl).zIndex : null
            };
            SFDebug.log('POST_START_REST_DOM_CHECK', modalCheck);
        } else {
            SFDebug.log('FINAL_ROUND_SKIPPING_TIMER', { currentCount: completionsLog.count, rounds: session.circuit.rounds });
            // Final round complete: no rest timer needed, just reflect the fully complete state
            if (viewingDayId === quickId) renderQuickSession(quickId);
        }
    } catch (err) {
        SFDebug.error('EXCEPTION_IN_COMPLETE_CIRCUIT_ROUND', err);
    }
};

window.finishQuickHybrid = function(quickId, title) {
    Store.logQuickSession(quickId, title);
    renderHome();
};

window.renderQuickSession = function(quickId) {
    clearApp();
    appContainer.className = 'is-day-view'; // reuse styles
    viewingDayId = quickId;
    
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session) return;
    
    // For HIIT Boxing, dynamically regenerate structural data from the single-source-of-truth playlist
    if (session.id === 'quick-hiit-boxing' && session.playlist) {
        const pList = session.playlist;
        session.warmupPlaylist = pList.slice(0, 2);
        session.bagRoundsPlaylist = pList.slice(2, 19);
        session.circuitPlaylist = pList.slice(19, 26);
        session.cooldownPlaylist = pList.slice(26);
        
        session.warmup = pList.slice(0, 2).map((p, i) => ({
            id: 'hiit-wu' + (i+1),
            name: p.name,
            type: 'timed',
            duration: p.duration,
            cue: p.name.includes('Jump') ? 'Easy pace — just wake the body up' : 'Loosen those shoulders'
        }));
        session.bagRounds = {
             id: 'hiit-tabata',
             name: 'Tabata Bag Rounds',
             benefits: 'Alternating Power and Speed rounds. 30s work, 15s rest.',
             rounds: pList.filter(p => p.name && p.name.startsWith('Round')).map((p, i) => ({
                 id: 'hiit-tab-' + (i + 1),
                 name: p.name,
                 workSeconds: p.duration,
                 restSeconds: i < 7 ? 15 : 60,
                 combo: p.combo || '',
                 description: p.description || ''
             }))
        };
        const circuitRound1 = pList.find(p => p.name === 'Circuit Round 1');
        session.circuit = {
             id: 'hiit-circuit',
             name: 'Conditioning Circuit',
             rounds: 3,
             restSeconds: 45,
             benefits: 'High intensity conditioning to finish the session strong.',
             exercises: circuitRound1 && circuitRound1.exercises ? circuitRound1.exercises : []
        };
        session.cooldown = pList.filter(p => p.name && (p.name.includes('fold') || p.name.includes('breathing') || p.name.includes('stretch'))).map((p, i) => ({
             id: 'hiit-cd' + (i + 1),
             name: p.name,
             duration: '1 min',
             desc: p.desc || ''
        }));
    }
    
    // GA4 Tracking
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: `Strike First - ${session.title}`,
            page_location: location.href
        });
    }
    
    const headerHtml = `
        <header class="app-header">
            <div class="nav-day">
                <button class="nav-back-btn" onclick="renderHome()" aria-label="Back to Week">
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M8 2L2 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Back
                </button>
                <span class="nav-day-title">${session.title}</span>
                <div class="nav-day-arrows"></div>
            </div>
        </header>
    `;
    document.getElementById('global-header').innerHTML = headerHtml;
    
    let html = '';
    
    // Header Card
    html += `
        <div class="card day-header-card type-${session.type}">
            <div class="flex justify-between items-start" style="margin-bottom: var(--sp-2);">
                <span class="label-small">${session.focus.toUpperCase()}</span>
                <span class="type-badge" aria-hidden="true">${icons[session.type]} QUICK SESSION</span>
            </div>
            <h1 class="title-page" style="margin-bottom: var(--sp-1);">${session.title}</h1>
            <div class="session-duration-stat"><span class="time-pill type-${session.type}">⏱ ${calculateQuickSessionDuration(session)}</span></div>
        </div>
    `;
    
    if (session.equipment) {
        html += `
            <div class="callout type-strength" style="margin-bottom: var(--sp-4);">
                ${icons.lightbulb}
                <div class="callout-text"><strong>Equipment Required:</strong> ${session.equipment}</div>
            </div>
        `;
    }
    
    if (session.isContinuous) {
        html += `
        <div style="margin-bottom: var(--sp-4);">
            <button class="btn-primary" style="width: 100%; padding: 16px; font-size: 16px;" onclick="startContinuousSequence('${quickId}')">
                <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start Full Session
            </button>
            <p style="text-align: center; margin-top: 12px; color: var(--text-muted); font-size: 13px;">This session plays continuously from start to finish with full audio guidance. No manual taps required to advance.</p>
        </div>
        `;
    }

    // Expand/Collapse All Logic for Quick Sessions
    const expandableIds = getExpandableCardIds(session);
    const totalExpandable = expandableIds.length;
    const totalExpanded = expandableIds.filter(id => expandedCardIds.has(id) || expandedCardIds.has(String(id))).length;
    
    let toggleAction = "expandAll()";
    let toggleText = "Expand all";
    if (totalExpandable > 0 && totalExpanded === totalExpandable) {
        toggleAction = "collapseAll()";
        toggleText = "Collapse all";
    }

    html += `
        <div class="content-header-row">
            <h2 class="label-small">SECTIONS · ${totalExpandable}</h2>
            <div class="right-actions">
                <button class="btn-nav" style="font-size: 11px;" onclick="${toggleAction}">${toggleText}</button>
            </div>
        </div>
    `;

    html += `<div class="item-list">`;
    
    // 1. Warm-Up
    html += renderWarmup(session, quickId);
    
    let globalBlockIndex = 1;
    
    const renderExercises = (exercises, quickId, sessionType) => {
        let outHtml = '';
        exercises.forEach((ex, idx) => {
            let musclesHtml = ex.muscles ? ex.muscles.split(',').map(m => `<div class="muscle-tag">${m.trim()}</div>`).join('') : '';
            
            let stats = [];
            if (ex.setsReps) stats.push({ icon: icons.repeat, value: ex.setsReps, label: "sets × reps" }, "divider");
            if (ex.weight) stats.push({ icon: icons.weight, value: ex.weight });
            
            if (ex.restSeconds) {
                if (stats.length > 0 && stats[stats.length - 1] !== "divider") stats.push("divider");
                let m = Math.floor(ex.restSeconds / 60);
                let s = ex.restSeconds % 60;
                let text = m > 0 && s > 0 ? `${m} min ${s} sec rest` : m > 0 ? `${m} min rest` : `${s} sec rest`;
                stats.push({ icon: icons.rest, value: text });
            }
            
            // Generate Set Logging Rows
            let setsCount = parseInt((ex.setsReps || "1").split(/[xX\u00d7\s]/)[0]) || 1;
            let logHtml = '';
            const logData = Store.getItemLog(quickId, ex.id) || { sets: {} };
            for(let s=1; s<=setsCount; s++) {
                const setData = logData.sets[s] || {};
                const isChecked = setData.completed ? 'checked' : '';
                const repsParts = (ex.setsReps || '').split(/[xX\u00d7]/);
                const repsVal = setData.reps || (repsParts[1] ? repsParts[1].trim() : '5');
                const weightVal = setData.weight || ex.weight || '';
                
                logHtml += `
                <div class="set-row ${isChecked}">
                    <div class="set-num">${s}</div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-weight" value="${weightVal}" placeholder="kg" />
                        <span class="input-label">weight</span>
                    </div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-rep" value="${repsVal}" />
                        <span class="input-label">reps</span>
                    </div>
                    <button class="btn-check ${isChecked}" onclick="logSet('${quickId}', '${ex.id}', ${s}, ${ex.restSeconds || 0}, '${ex.name.replace(/'/g, "\\'")}', ${ex.restCue ? "'" + ex.restCue.replace(/'/g, "\\'") + "'" : "'Focus on recovery.'"}, this)">${icons.checkmark}</button>
                </div>
                `;
            }

            let normalizedItem = {
                id: ex.id,
                badge: ex.badge || `R${globalBlockIndex++}`,
                title: ex.name,
                subtitle: ex.subtitle,
                videoId: ex.videoId,
                videoFormat: ex.videoFormat,
                stats: stats,
                callout: { icon: icons.strength, text: ex.calloutText || "Focus on explosion and intent over weight." },
                sections: [
                    { title: "LOG SETS", content: logHtml },
                    { title: "EXECUTION NOTES", content: `<p>${ex.notes}</p>` }
                ]
            };
            if (ex.benefits) normalizedItem.sections.push({ title: "WHY THIS EXERCISE", content: `<p>${ex.benefits}</p>` });
            if (ex.muscles) normalizedItem.sections.push({ title: "MUSCLES WORKED", content: `<div class="muscle-tags">${musclesHtml}</div>` });
            
            if (ex.isBlockStart) {
                normalizedItem.actionHtml = `
                <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                    <button class="btn-primary" style="width: 100%;" onclick="Timer.startCountdown(5, '${ex.name.replace(/'/g, "\\'")}', null)">
                        <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start ${ex.name}
                    </button>
                </div>`;
            }
            
            outHtml += renderItemCard(normalizedItem, sessionType);
        });
        return outHtml;
    };

    const renderExercisesBlock = (blockData, quickId, sessionType, blockIdx) => {
        let exercisesHtml = '<div class="nested-list">';
        blockData.exercises.forEach((ex, idx) => {
            let musclesHtml = ex.muscles ? ex.muscles.split(',').map(m => `<div class="muscle-tag">${m.trim()}</div>`).join('') : '';
            
            let setsCount = parseInt((ex.setsReps || "1").split(/[xX\u00d7\s]/)[0]) || 1;
            let logHtml = '';
            const logData = Store.getItemLog(quickId, ex.id) || { sets: {} };
            let allCompleted = true;
            for(let s=1; s<=setsCount; s++) {
                const setData = logData.sets[s] || {};
                const isChecked = setData.completed ? 'checked' : '';
                if (!setData.completed) allCompleted = false;
                const repsParts = (ex.setsReps || '').split(/[xX\u00d7]/);
                const repsVal = setData.reps || (repsParts[1] ? repsParts[1].trim() : '5');
                const weightVal = setData.weight || ex.weight || '';
                
                logHtml += `
                <div class="set-row ${isChecked}">
                    <div class="set-num">${s}</div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-weight" value="${weightVal}" placeholder="kg" />
                        <span class="input-label">weight</span>
                    </div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-rep" value="${repsVal}" />
                        <span class="input-label">reps</span>
                    </div>
                    <button class="btn-check ${isChecked}" onclick="logSet('${quickId}', '${ex.id}', ${s}, ${ex.restSeconds || 0}, '${ex.name.replace(/'/g, "\\'")}', ${ex.restCue ? "'" + ex.restCue.replace(/'/g, "\\'") + "'" : "'Focus on recovery.'"}, this)">${icons.checkmark}</button>
                </div>
                `;
            }
            
            const isCheckedRow = (allCompleted && setsCount > 0) ? 'checked' : '';
            
            const isExExpanded = expandedCardIds.has(ex.id);
            
            let stats = [];
            if (ex.setsReps) stats.push({ icon: icons.repeat, value: ex.setsReps, label: "sets × reps" }, "divider");
            if (ex.weight) stats.push({ icon: icons.weight, value: ex.weight });
            
            if (ex.restSeconds || ex.restSeconds === 0) {
                if (stats.length > 0 && stats[stats.length - 1] !== "divider") stats.push("divider");
                let m = Math.floor(ex.restSeconds / 60);
                let s = ex.restSeconds % 60;
                let text = m > 0 && s > 0 ? `${m} min ${s} sec rest` : m > 0 ? `${m} min rest` : `${s} sec rest`;
                stats.push({ icon: icons.rest, value: text });
            }
            
            let statsHtml = '';
            if (stats.length > 0) {
                statsHtml = `
                    <div class="item-stats" style="margin-left: 0; margin-top: 6px;">
                        ${stats.map((st) => {
                            if (st === 'divider') return '<div class="stat-divider" aria-hidden="true"></div>';
                            return `<div class="stat-item">${st.icon ? st.icon : ''} <span class="text-mono">${st.value}</span> ${st.label ? `<span class="stat-item-label">${st.label}</span>` : ''}</div>`;
                        }).join('')}
                    </div>
                `;
            }

            const demoIconBtn = ex.videoId
                ? `<button class="btn-demo-icon" aria-label="Watch demo for ${ex.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openVideoModal('${ex.videoId}', '${ex.name.replace(/'/g, "\\'")}', '${ex.videoFormat || 'short'}')">
                       <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                   </button>`
                : '';

            exercisesHtml += `
                <div class="nested-row ${isCheckedRow}" style="flex-direction: column; align-items: stretch; gap: 0;">
                    <div role="button" tabindex="0" aria-expanded="${isExExpanded}" aria-label="Toggle ${ex.name.replace(/"/g, '&quot;')} details" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCard('${ex.id}');}" style="margin-bottom: ${isExExpanded ? '12px' : '0'}; display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 8px;" onclick="toggleCard('${ex.id}')">
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <h4 class="label-small" style="margin-bottom: 2px; color: var(--text-primary); font-size: 14px; text-transform: none; letter-spacing: normal;">${ex.name}</h4>
                                ${demoIconBtn}
                            </div>
                            ${ex.subtitle ? `<div style="font-size: 13px; color: var(--accent-color); margin-bottom: 4px; font-weight: 500;">${ex.subtitle}</div>` : ''}
                            ${statsHtml}
                        </div>
                        <div class="item-chevron" aria-hidden="true" style="transform: ${isExExpanded ? 'rotate(90deg)' : 'rotate(0)'}; flex-shrink: 0;">${icons.chevron}</div>
                    </div>
                    ${isExExpanded ? `
                    ${logHtml}
                    ${(ex.notes || ex.benefits || musclesHtml) ? `
                    <div style="margin-top: 16px;">
                        ${ex.notes ? `
                        <div class="item-content-section">
                            <h4 class="label-small">EXECUTION NOTES</h4>
                            <p>${ex.notes}</p>
                        </div>
                        ` : ''}
                        
                        ${ex.benefits ? `
                        <div class="item-content-section">
                            <h4 class="label-small">WHY THIS EXERCISE</h4>
                            <p>${ex.benefits}</p>
                        </div>
                        ` : ''}
                        
                        ${musclesHtml ? `
                        <div class="item-content-section">
                            <h4 class="label-small">MUSCLES WORKED</h4>
                            <div class="muscle-tags">${musclesHtml}</div>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    ` : ''}
                </div>
            `;
        });
        exercisesHtml += '</div>';
        
        let stats = blockData.stats || [
            { icon: icons.clock, value: blockData.duration || '~7 min' },
            'divider',
            { icon: icons.repeat, value: `${blockData.rounds || 2} sets` },
            'divider',
            { icon: icons.strength, value: `${blockData.exercises.length} exercises` }
        ];

        let normalizedItem = {
            id: blockData.id,
            badge: blockData.badge || `R${globalBlockIndex++}`,
            title: blockData.title || blockData.name,
            stats: stats,
            callout: blockData.benefits ? { icon: icons.strength, text: blockData.benefits } : null,
            sections: [
                { title: "EXERCISES", content: exercisesHtml }
            ]
        };

        if (blockData.rule) {
            normalizedItem.sections.unshift({
                title: "POWER BLOCK RULES",
                content: `<p style="font-size: 13px; line-height: 1.5; color: var(--text-secondary); margin: 0;">${blockData.rule}</p>`
            });
        }
        
        if (blockData.isBlockStart) {
            normalizedItem.actionHtml = `
            <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                <button class="btn-primary" style="width: 100%;" onclick="Timer.startCountdown(5, '${(blockData.title || blockData.name).replace(/'/g, "\\'")}', null)">
                    <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start ${blockData.title || blockData.name}
                </button>
            </div>`;
        }
        
        return renderItemCard(normalizedItem, sessionType);
    };

    // 1.2 Punch Power Primer (Explosive Preparation)
    if (session.powerPrimer) {
        html += renderExercisesBlock(session.powerPrimer, quickId, 'strength');
    }

    // 1.5 Main Exercises (Strength)
    if (session.exercises) {
        html += renderExercises(session.exercises, quickId, session.type);
    }
    
    // Helper to render bag/finisher rounds
    const renderBagSection = (sectionObj, isFinisher) => {
        const isExpanded = expandedCardIds.has(sectionObj.id);
        const roundsHtml = sectionObj.rounds.map((r, i) => {
            const log = Store.getItemLog(quickId, r.id) || {};
            const isCompleted = !!log.completed;
            const isChecked = isCompleted ? 'checked' : '';
            const isLast = isFinisher && i === sectionObj.rounds.length - 1;
            const timedCuesArg = r.timedCues ? encodeURIComponent(JSON.stringify(r.timedCues)).replace(/'/g, "%27") : '';
            const comboArg = encodeURIComponent(r.combo).replace(/'/g, "%27");
            const restCueArg = r.restCue ? encodeURIComponent(r.restCue).replace(/'/g, "%27") : '';
            
            return `
            <div class="nested-row interactive ${isChecked}" role="button" tabindex="0" onclick="startQuickBagRoundFromCheckbox(event, '${quickId}', '${r.id}', ${r.workSeconds}, ${r.restSeconds}, ${i+1}, '${r.name ? r.name.replace(/'/g, "\\'") : ''}', '${comboArg}', ${isLast}, '${timedCuesArg}', ${!!r.skipCountdown}, '${restCueArg}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); startQuickBagRoundFromCheckbox(event, '${quickId}', '${r.id}', ${r.workSeconds}, ${r.restSeconds}, ${i+1}, '${r.name ? r.name.replace(/'/g, "\\'") : ''}', '${comboArg}', ${isLast}, '${timedCuesArg}', ${!!r.skipCountdown}, '${restCueArg}');}">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">
                    ${r.name ? `<div style="font-weight: 700; font-size: 14px; color: var(--text-primary); margin-bottom: 4px;">${r.name}</div>` : ''}
                    <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${r.description || r.combo}</div>
                </div>
                <button class="btn-check ${isChecked}" aria-label="${isCompleted ? 'Uncheck' : 'Start'} ${r.name || 'Round ' + (i+1)}" onclick="startQuickBagRoundFromCheckbox(event, '${quickId}', '${r.id}', ${r.workSeconds}, ${r.restSeconds}, ${i+1}, '${r.name ? r.name.replace(/'/g, "\\'") : ''}', '${comboArg}', ${isLast}, '${timedCuesArg}', ${!!r.skipCountdown}, '${restCueArg}')">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        const totalSec = sectionObj.rounds.reduce((sum, r) => sum + (r.workSeconds || 0) + (r.restSeconds || 0), 0);
        const mins = Math.ceil(totalSec / 60);
        
        let normalizedItem = {
            id: sectionObj.id,
            badge: sectionObj.badge || `R${globalBlockIndex++}`,
            title: sectionObj.name,
            stats: [
                { icon: icons.clock, value: `~${mins} min` },
                'divider',
                { icon: icons.repeat, value: `${sectionObj.rounds.length} rounds` }
            ],
            callout: { icon: icons.flame, text: sectionObj.benefits },
            sections: [
                { title: "COMBINATIONS", content: `<div class="nested-list">${roundsHtml}</div>` }
            ]
        };
        
        if (sectionObj.isBlockStart) {
            normalizedItem.actionHtml = `
            <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                <button class="btn-primary" style="width: 100%;" onclick="Timer.startCountdown(5, '${sectionObj.name.replace(/'/g, "\\'")}', null)">
                    <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start ${sectionObj.name}
                </button>
            </div>`;
        } else if (sectionObj.id === 'hiit-tabata' && session.bagRoundsPlaylist) {
            normalizedItem.actionHtml = `
            <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                <button class="btn-primary" style="width: 100%;" onclick="startSectionSequence('${quickId}', 'bagRoundsPlaylist')">
                    <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start Tabata Bag Rounds
                </button>
            </div>`;
        }

        return renderItemCard(normalizedItem, session.type);
    };
    
    // 2. Bag Work
    if (session.bagRounds) html += renderBagSection(session.bagRounds, false);
    
    // 3. Conditioning Circuit
    if (session.circuit) {
        const c = session.circuit;
        
        let drillsHtml = c.exercises.map((ex, i) => {
            const log = Store.getItemLog(quickId, ex.id) || {};
            const isChecked = log.completed ? 'checked' : '';
            const demoIconBtn = ex.videoId
                ? `<button class="btn-demo-icon" aria-label="Watch demo for ${ex.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openVideoModal('${ex.videoId}', '${ex.name.replace(/'/g, "\\'")}', '${ex.videoFormat || 'short'}')">
                       <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                   </button>`
                : '';
            return `
            <div class="nested-row interactive ${isChecked}" role="button" tabindex="0" onclick="toggleQuickCircuitItem('${quickId}', '${ex.id}')">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 500;">${ex.name} — ${ex.reps}</span>
                        ${demoIconBtn}
                    </div>
                    ${ex.description ? `<div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">${ex.description}</div>` : ''}
                </div>
                <button class="btn-check ${isChecked}" aria-label="${isChecked ? 'Uncheck' : 'Complete'} ${ex.name}">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        const totalSec = c.rounds * 180 + (c.rounds > 1 ? (c.rounds - 1) * (c.restSeconds || 0) : 0);
        const mins = Math.ceil(totalSec / 60);
        
        const completionsLog = Store.getItemLog(quickId, 'circuit_completions') || { count: 0 };
        const currentRoundStr = (completionsLog.count > 0 && completionsLog.count < c.rounds) ? ` (Round ${completionsLog.count + 1} of ${c.rounds})` : '';

        let normalizedItem = {
            id: c.id,
            badge: c.badge || `R${globalBlockIndex++}`,
            title: c.name + currentRoundStr,
            stats: [
                { icon: icons.clock, value: c.duration || `~${mins} min` },
                'divider',
                { icon: icons.repeat, value: `${c.rounds} rounds` },
                'divider',
                { icon: icons.rest, value: 'No rest between exercises' }
            ],
            callout: { icon: icons.strength, text: c.benefits },
            sections: [
                { title: "CIRCUIT CHECKLIST", content: `<div class="nested-list">${drillsHtml}</div>` }
            ]
        };
        
        if (session.circuitPlaylist) {
            normalizedItem.actionHtml = `
            <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                <button class="btn-primary" style="width: 100%;" onclick="startSectionSequence('${quickId}', 'circuitPlaylist')">
                    <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start Conditioning Circuit
                </button>
            </div>`;
        } else {
            const isCircuitComplete = (Store.getItemLog(quickId, 'circuit_completions') || {}).count >= c.rounds || !!(Store.getItemLog(quickId, c.id) || {}).completed;
            if (isCircuitComplete) {
                normalizedItem.actionHtml = `
                    <button class="btn-large" style="margin-top: var(--sp-4);" onclick="resetConditioningCircuit('${quickId}')">Reset Conditioning Circuit</button>
                `;
            } else {
                normalizedItem.actionHtml = `
                    <button class="btn-large" style="margin-top: var(--sp-4);" onclick="startConditioningCircuitTimer('${quickId}')">Start Conditioning Circuit</button>
                `;
            }
        }

        html += renderItemCard(normalizedItem, 'strength');
    }
    
    // 4. Finisher
    if (session.finisher) html += renderBagSection(session.finisher, true);
    
    // 4.5 Power Circuit (Special Finisher)
    if (session.powerCircuit) {
        const pc = session.powerCircuit;
        const isExpanded = expandedCardIds.has(pc.id);
        
        const roundsHtml = pc.rounds.map((r, i) => {
            const log = Store.getItemLog(quickId, r.id) || {};
            const isCompleted = !!log.completed;
            const isChecked = isCompleted ? 'checked' : '';
            
            return `
            <div class="nested-row ${isChecked}">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">${r.combo}</div>
                <button class="btn-check ${isChecked}" aria-label="${isCompleted ? 'Uncheck' : 'Start timer for'} ${r.name}" onclick="startPowerCircuitRoundFromCheckbox(event, '${quickId}', '${r.id}', ${r.workSeconds}, ${r.restSeconds}, '${r.name.replace(/'/g, "\\'")}', '${r.restCue ? r.restCue.replace(/'/g, "\\'") : ''}')">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        let normalizedItem = {
            id: pc.id,
            badge: pc.badge || `R${globalBlockIndex++}`,
            title: pc.name,
            stats: [
                { icon: icons.clock, value: `~${Math.ceil((pc.rounds.length * 90 + 60) / 60)} min` },
                'divider',
                { icon: icons.repeat, value: `${pc.rounds.length} rounds` }
            ],
            callout: { icon: icons.flame, text: pc.benefits },
            sections: [
                { title: "ROUNDS", content: `<div class="nested-list">${roundsHtml}</div>` }
            ]
        };
        html += renderItemCard(normalizedItem, session.type || 'strength');
    }
    
    // 4.8 Custom Blocks
    if (session.blocks) {
        session.blocks.forEach(block => {
            if (block.type === 'warmup') {
                html += renderWarmup(block.data, quickId, session.type);
            } else if (block.type === 'exercises') {
                html += renderExercisesBlock(block.data, quickId, session.type);
            } else if (block.type === 'bagRounds') {
                html += renderBagSection(block.data, false);
            } else if (block.type === 'circuit') {
                // Not implementing general circuit rendering inside blocks for now, unless needed
            }
        });
    }
    
    // 5. Cooldown
    if (session.cooldown) {
        let drillsHtml = session.cooldown.map((n, i) => {
            const log = Store.getItemLog(quickId, 'cooldown-card-' + i) || {};
            const isCompleted = !!log.completed;
            const isChecked = isCompleted ? 'checked' : '';
            const demoIconBtn = n.videoId
                ? `<button class="btn-demo-icon" aria-label="Watch demo for ${n.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openVideoModal('${n.videoId}', '${n.name.replace(/'/g, "\\'")}', '${n.videoFormat || 'short'}')">
                       <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                   </button>`
                : '';
            return `
            <div class="nested-row interactive ${isChecked}" role="button" tabindex="0" onclick="Store.logItem('${quickId}', 'cooldown-card-${i}', { completed: !${isCompleted} }); renderQuickSession('${quickId}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); Store.logItem('${quickId}', 'cooldown-card-${i}', { completed: !${isCompleted} }); renderQuickSession('${quickId}');}">
                <div class="set-num">${i + 1}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 500;">${n.name} — ${n.duration}</span>
                        ${demoIconBtn}
                    </div>
                    ${n.desc ? `<div style="font-size: 13px; opacity: 0.8; margin-top: 2px;">${n.desc}</div>` : ''}
                </div>
                <button class="btn-check ${isChecked}" aria-label="${isCompleted ? 'Uncheck' : 'Complete'} ${n.name}">${icons.checkmark}</button>
            </div>`;
        }).join('');
        
        let cdMinsStr = '~3 min';
        if (session.cooldown && session.cooldown.length > 0) {
            let totalCdSec = 0;
            session.cooldown.forEach(c => {
                if (c.workSeconds) totalCdSec += c.workSeconds;
                else if (c.duration && String(c.duration).includes('s')) totalCdSec += parseInt(c.duration) || 0;
                else if (c.duration && String(c.duration).includes('min')) totalCdSec += (parseFloat(c.duration) || 0) * 60;
                else totalCdSec += 60;
            });
            const m = Math.floor(totalCdSec / 60);
            const s = totalCdSec % 60;
            cdMinsStr = s > 0 ? `~${m} min ${s}s` : `~${m} min`;
        }

        let normalizedItem = {
            id: 'cooldown-card',
            badge: 'CD',
            title: 'Cool Down',
            stats: [
                { icon: icons.clock, value: cdMinsStr },
                'divider',
                { icon: icons.rest, value: 'Active recovery' }
            ],
            callout: null,
            sections: [
                { title: "STRETCH ROUTINE", content: `<div class="nested-list">${drillsHtml}</div>` }
            ]
        };
        
        if (session.cooldownPlaylist) {
            normalizedItem.actionHtml = `
            <div style="padding: 16px; border-top: 1px solid var(--border-color);">
                <button class="btn-primary" style="width: 100%;" onclick="startSectionSequence('${quickId}', 'cooldownPlaylist')">
                    <span class="play-icon" style="margin-right: 8px;">${icons.play}</span> Start Cool Down
                </button>
            </div>`;
        } else {
            const isAllCDCompleted = session.cooldown.every((item, i) => (Store.getItemLog(quickId, 'cooldown-card-' + i) || {}).completed || (Store.getItemLog(quickId, item.id) || {}).completed);
            if (isAllCDCompleted) {
                normalizedItem.actionHtml = `
                    <button class="btn-large" style="margin-top: var(--sp-4);" onclick="resetCooldown('${quickId}')">Reset Cool Down</button>
                `;
            } else {
                normalizedItem.actionHtml = `
                    <button class="btn-large" style="margin-top: var(--sp-4);" onclick="startCooldownRoundTimer('${quickId}')">Start Cool Down Session</button>
                `;
            }
        }
        
        html += renderItemCard(normalizedItem, session.type || 'strength');
    }
    
    html += `</div>`; // .item-list
    
    html += `
        <div style="margin-top: 32px; margin-bottom: 64px;">
            <button class="btn-complete-session" onclick="finishQuickHybrid('${quickId}', '${session.title}')">${icons.checkmark} Complete Session</button>
        </div>
    `;

    appContainer.innerHTML = html;
};

// ==========================================
// CONTINUOUS AUTO-PLAY QUICK SESSIONS
// ==========================================
window.startContinuousSequence = function(quickId) {
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session || !session.playlist) return;
    
    // Do not wipe the DOM, keep the detail page visible beneath the timer.
    
    Timer.startSequence(session.playlist, () => {
        Store.logQuickSession(quickId, session.title);
        renderQuickSession(quickId);
    });
};

window.startSectionSequence = function(quickId, playlistType) {
    const session = window.quickWorkouts.find(q => q.id === quickId);
    if (!session || !session[playlistType]) return;
    
    // Do not wipe the DOM, keep the detail page visible beneath the timer.
    Timer.startSequence(session[playlistType], () => {
        // When finished, just re-render the detail page to show any log updates if applicable
        renderQuickSession(quickId);
    });
};

// ==========================================
// PWA UPDATE NOTIFICATION SYSTEM
// ==========================================
const APP_VERSION = 'v37';
const APP_UPDATE_MESSAGE = 'Strike First has been updated with improvements and fixes.';

window.PWAUpdateManager = {
    registration: null,
    bannerElement: null,
    isReloading: false,

    init() {
        if (!('serviceWorker' in navigator)) return;

        // Initialize banner DOM
        this.createBannerElement();

        // Track if this is the first time a controller is taking over
        let hasInitialController = !!navigator.serviceWorker.controller;

        // Listen for controllerchange to reload safely
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // Ignore the very first activation to prevent infinite reload on initial visit
            if (!hasInitialController) {
                hasInitialController = true;
                return;
            }
            
            if (!this.isReloading) {
                this.isReloading = true;
                window.location.reload();
            }
        });

        // Register and track updates
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    this.registration = reg;
                    
                    // Handle existing waiting worker on startup
                    if (reg.waiting && navigator.serviceWorker.controller) {
                        this.showUpdateAvailable();
                    }

                    // Handle new update found during session
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    this.showUpdateAvailable();
                                }
                            });
                        }
                    });
                })
                .catch(err => console.error('[SW] Registration failed:', err));
        });
    },

    createBannerElement() {
        const banner = document.createElement('div');
        banner.id = 'update-banner';
        document.body.appendChild(banner);
        this.bannerElement = banner;
    },

    showUpdateAvailable() {
        if (!this.bannerElement || this.bannerElement.style.display === 'flex') return;

        // Check if workout is active to determine safe UI
        const isWorkoutActive = Timer && (Timer.isActive || Timer.phase === 'work' || Timer.phase === 'rest');
        
        let messageHtml = `<p>${APP_UPDATE_MESSAGE}</p>`;
        let actionsHtml = `
            <button class="btn-update-later" onclick="PWAUpdateManager.dismissBanner()">Later</button>
            <button class="btn-update-now" onclick="PWAUpdateManager.applyUpdate()">Update now</button>
        `;

        if (isWorkoutActive) {
            messageHtml = `<p>Your workout is still running. Update when you're finished.</p>`;
            actionsHtml = `<button class="btn-update-later" onclick="PWAUpdateManager.dismissBanner()">Later</button>`;
        }

        this.bannerElement.innerHTML = `
            <h3>New version available (${APP_VERSION})</h3>
            ${messageHtml}
            <div class="update-actions">
                ${actionsHtml}
            </div>
        `;
        
        this.bannerElement.style.display = 'flex';
    },

    dismissBanner() {
        if (this.bannerElement) {
            this.bannerElement.style.display = 'none';
        }
    },

    applyUpdate() {
        if (!this.registration || !this.registration.waiting) return;
        
        // Prevent accidental multiple taps
        this.dismissBanner();
        
        // Send SKIP_WAITING to the waiting service worker
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
};

// Initialize PWA Update Manager
window.PWAUpdateManager.init();

