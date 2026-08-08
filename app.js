const icons = {
    back: `<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>`,
    forward: `<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
    info: `<svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`,
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
    repeat: `<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`
};


// Phase 2 bindings
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
    renderDay(viewingDayId); // Re-render to update UI
    
    if (!isCompleted && restSec > 0) {
        const day = workoutData.days.find(d => d.id === dayId);
        Timer.startRest(restSec, title, cue, day ? day.type : 'strength');
    }
};

window.toggleRound = function(e, dayId, roundId) {
    e.stopPropagation();
    const logData = Store.getItemLog(dayId, roundId) || {};
    Store.logItem(dayId, roundId, { completed: !logData.completed });
    renderDay(viewingDayId);
};

window.startRoundTimer = function(dayId, roundId, workSec, restSec, title, cue) {
    const day = workoutData.days.find(d => d.id === dayId);
    Timer.startRound(workSec, restSec, title, cue, day ? day.type : 'bag', () => {
        Store.logItem(dayId, roundId, { completed: true });
        renderDay(viewingDayId);
    });
};


window.startWarmupTimer = function(dayId, itemId, duration, title, cue, switchSides) {
    const day = workoutData.days.find(d => d.id === dayId);
    Timer.startWarmup(duration, title, cue, switchSides, day ? day.type : 'strength', () => {
        Store.logItem(dayId, itemId, { completed: true });
        renderDay(viewingDayId);
    });
};

window.toggleWarmupExpanded = function() {
    const isExpanded = sessionStorage.getItem('warmupExpanded') === 'true';
    if (isExpanded) {
        sessionStorage.removeItem('warmupExpanded');
    } else {
        sessionStorage.setItem('warmupExpanded', 'true');
    }
    renderDay(viewingDayId);
};

function renderWarmup(day) {
    if (!day.warmup || day.warmup.length === 0) return '';
    
    // Auto-expand if any item is completed
    const hasCompletedItem = day.warmup.some(item => {
        const logData = Store.getItemLog(day.id, item.id) || {};
        return logData.completed;
    });
    
    // Explicit user toggle overrides default collapsed state
    const userExpanded = sessionStorage.getItem('warmupExpanded');
    
    let isExpanded = false;
    if (userExpanded === 'true') {
        isExpanded = true;
    } else if (userExpanded === null && hasCompletedItem) {
        isExpanded = true; // Auto-expand
    }

    const totalDurationSec = day.warmup.filter(w => w.type === 'timed').reduce((s, w) => s + w.duration, 0);
    const mins = Math.ceil(totalDurationSec / 60);
    
    let html = `
        <div class="card warmup-card">
            <div class="warmup-header" onclick="toggleWarmupExpanded()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleWarmupExpanded();}" aria-expanded="${isExpanded}" role="button" tabindex="0">
                <div class="flex items-center gap-2">
                    <span class="warmup-label">WARM-UP</span>
                    <span class="warmup-header-duration">· ~${mins} min</span>
                </div>
                <div class="warmup-chevron ${isExpanded ? 'expanded' : ''}" aria-hidden="true">${icons.chevron}</div>
            </div>
    `;
    
    if (isExpanded) {
        html += `<div class="warmup-list">`;
        day.warmup.forEach((item, idx) => {
            const logData = Store.getItemLog(day.id, item.id) || {};
            const isCompleted = logData.completed;
            const isRepBased = item.type === 'reps';
            
            let timeOrRepsStr = '';
            if (isRepBased) {
                timeOrRepsStr = item.reps;
            } else {
                timeOrRepsStr = item.duration >= 60 ? `${Math.floor(item.duration / 60)} min` : `${item.duration} sec`;
            }
            
            html += `
                <div class="warmup-row">
                    <div class="warmup-info">
                        <div class="warmup-title-row">
                            <h3 class="warmup-name">${item.name}</h3>
                            ${isRepBased ? `<span class="warmup-reps">${timeOrRepsStr}</span>` : `<span class="warmup-duration">${timeOrRepsStr}</span>`}
                        </div>
                        <div class="warmup-cue">${item.cue}</div>
                    </div>
                    <div class="warmup-actions">
                        ${!isRepBased && !isCompleted ? `
                            <button class="btn-play type-${day.type}" onclick="startWarmupTimer(${day.id}, '${item.id}', ${item.duration}, '${item.name.replace(/'/g, "\\'")}', '${item.cue.replace(/'/g, "\\'")}', ${item.switchSides})">
                                ▶ Start
                            </button>
                        ` : ''}
                        ${isCompleted ? `
                            <div class="check-indicator done" onclick="toggleRound(event, ${day.id}, '${item.id}')">${icons.checkmark}</div>
                        ` : (isRepBased ? `
                            <div class="check-indicator empty" onclick="toggleRound(event, ${day.id}, '${item.id}')"></div>
                        ` : `
                            <div class="check-indicator empty" onclick="toggleRound(event, ${day.id}, '${item.id}')"></div>
                        `)}
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    html += `</div>`;
    return html;
}

window.finishWorkout = function(dayId) {
    Store.finishWorkout(dayId);
    renderHome();
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

function toggleCard(id) {
    if (expandedCardIds.has(id)) {
        expandedCardIds.delete(id);
    } else {
        expandedCardIds.add(id);
    }
    // Re-render the currently viewed day to reflect state
    if (document.getElementById('app-container').className === '' && viewingDayId !== null) {
        renderDay(viewingDayId);
    }
}

function expandAll() {
    if (viewingDayId === null) return;
    const currentDay = workoutData.days.find(d => d.id === viewingDayId);
    if (!currentDay) return;
    
    // Add all valid ids
    if (currentDay.exercises) currentDay.exercises.forEach(ex => expandedCardIds.add(ex.id));
    if (currentDay.sections) currentDay.sections.forEach(sec => expandedCardIds.add(sec.id));
    
    renderDay(viewingDayId);
}

function collapseAll() {
    expandedCardIds.clear();
    if (viewingDayId !== null) renderDay(viewingDayId);
}

function renderItemCard(item, dayType) {
    const isExpanded = expandedCardIds.has(item.id);
    
    let html = `
        <div class="item-card type-${dayType} ${isExpanded ? 'expanded' : ''}" data-id="${item.id}">
            <button class="item-header" onclick="toggleCard('${item.id}')" aria-expanded="${isExpanded}">
                <div class="item-header-top">
                    <div class="item-title-wrap">
                        <div class="num-badge" aria-hidden="true">${item.badge}</div>
                        <h3 class="title-card">${item.title}</h3>
                    </div>
                    <div class="item-chevron" aria-hidden="true">${icons.chevron}</div>
                </div>
                <div class="item-stats">
                    ${item.stats.map((s, idx) => {
                        if (s === 'divider') return '<div class="stat-divider" aria-hidden="true"></div>';
                        return `<div class="stat-item">${s.icon ? s.icon : ''} <span class="text-mono">${s.value}</span> ${s.label ? `<span class="stat-item-label">${s.label}</span>` : ''}</div>`;
                    }).join('')}
                </div>
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

function updateGlobalHeader(isHome) {
    const headerHtml = `
        <div class="global-header-inner ${isHome ? 'is-home' : ''}">
            <div class="flex items-center gap-3">
                <div class="header-logo-box" style="margin:0;">
                    ${icons.strength}
                </div>
                <div>
                    <div style="font-weight: 700; font-size: 16px; color: #fff;">PunchPower</div>
                    <div class="text-sec" style="font-size: 12px; margin-top: 2px;">Explosive Power · Phase 1</div>
                </div>
            </div>
            <div class="header-pills">
                <div class="pill pill-accent"><div class="dot"></div> Phase 1 of 3</div>
                <div class="pill">Week 1</div>
                <button class="pill" onclick="renderAbout()">${icons.info} About</button>
            </div>
        </div>
    `;
    document.getElementById('global-header').innerHTML = headerHtml;
}

function renderHome() {
    clearApp();
    appContainer.className = 'is-home';
    updateGlobalHeader(true);
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

    // Week Grid
    html += `<h2 class="section-header">This Week</h2><div class="days-grid">`;
    workoutData.days.forEach((day, index) => {
        const isCurrent = index === currentDayIndex;
        let iconName = day.type === 'rest' ? 'rest' : (day.type === 'strength' ? 'strength' : (day.type === 'bag' ? 'bag' : 'technical'));
        let countLabel = '';
        if (day.type === 'strength') countLabel = `${day.exercises.length} exercises`;
        else if (day.type === 'bag') countLabel = `${day.exercises.length} rounds`;
        else if (day.type === 'technical') countLabel = `${day.sections.length} sections`;
        else countLabel = `0 exercises`;

        let dayLabelStr = typeof day.id === 'string' ? day.id : `Day ${day.id}`;
        
        html += `
            <a href="#" class="card day-card type-${day.type} ${isCurrent ? 'is-current' : ''}" onclick="event.preventDefault(); renderDay('${day.id}')" style="text-decoration: none;">
                <div class="flex justify-between items-start" style="margin-bottom: var(--sp-4);">
                    <div class="flex items-center gap-2">
                        <div class="card-icon-box" aria-hidden="true">${icons[iconName]}</div>
                        <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : '6-7'}</span>
                    </div>
                    <div class="type-badge" aria-hidden="true">${icons[iconName]} ${day.type}</div>
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

function renderDay(dayIdRaw) {
    let dayId = dayIdRaw;
    if (!isNaN(dayIdRaw)) dayId = parseInt(dayIdRaw);
    const dayIndex = workoutData.days.findIndex(d => d.id === dayId);
    const day = workoutData.days[dayIndex];
    if (!day) return;
    
    viewingDayId = day.id;
    
    let iconName = day.type === 'rest' ? 'rest' : (day.type === 'strength' ? 'strength' : (day.type === 'bag' ? 'bag' : 'technical'));
    const prevDay = dayIndex > 0 ? workoutData.days[dayIndex - 1] : null;
    const nextDay = dayIndex < workoutData.days.length - 1 ? workoutData.days[dayIndex + 1] : null;

    clearApp();
    appContainer.className = '';
    updateGlobalHeader(false);
    let html = '';

    // Nav Row
    html += `
        <div class="nav-row">
            <button class="btn-nav" onclick="renderHome()">← Week</button>
            ${prevDay ? `<button class="btn-nav" onclick="renderDay('${prevDay.id}')">‹ Day ${prevDay.id}</button>` : ''}
            <span class="nav-indicator">${dayIndex + 1} / ${workoutData.days.length}</span>
            ${nextDay ? `<button class="btn-nav" onclick="renderDay('${nextDay.id}')">Day ${nextDay.id} ›</button>` : ''}
        </div>
    `;
    
    html += renderWarmup(day);

    // Header Card
    html += `
        <div class="card day-header-card type-${day.type}">
            <div class="flex justify-between items-start" style="margin-bottom: var(--sp-2);">
                <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : '6-7'}</span>
                <span class="type-badge" aria-hidden="true">${icons[iconName]} ${day.type}</span>
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
                // Bag rounds are executed exactly once per round array element, do not multiply by setsReps
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

        let allExpanded = false;
        let toggleAction = "expandAll()";
        let toggleText = "Expand all";
        
        let totalExpandable = 0;
        let totalExpanded = 0;
        if (day.exercises) { totalExpandable = day.exercises.length; totalExpanded = day.exercises.filter(ex => expandedCardIds.has(ex.id)).length; }
        if (day.sections) { totalExpandable = day.sections.length; totalExpanded = day.sections.filter(sec => expandedCardIds.has(sec.id)).length; }
        
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
    if (day.type === 'rest') {
        html += `
            <div class="card type-rest">
                <ul class="rest-list">
                    ${day.notes.map(n => `<li>${n.text}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (day.type === 'technical') {
        day.sections.forEach((sec, idx) => {
            let drillsHtml = sec.rounds ? sec.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                const demoBtn = r.videoId
                    ? `<button class="btn-demo" onclick="openVideoModal('${r.videoId}', '${r.combo.replace(/'/g, "\\'")}', '${r.videoFormat || 'short'}')">
                           <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M8 5v14l11-7z"/></svg> Demo
                       </button>`
                    : '';
                return `
                <div class="nested-row interactive" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}">
                    <button class="btn-check ${isChecked}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                    <div style="flex: 1;">${r.round ? `Round ${r.round} — ` : ''}${r.combo}${r.focus ? ` : ${r.focus}` : ''}</div>
                    ${demoBtn}
                </div>`;
            }).join('') : '';

            let normalizedItem = {
                id: sec.id,
                badge: idx + 1,
                title: sec.name,
                stats: [
                    { value: sec.duration },
                    { label: `· ${sec.rounds ? sec.rounds.length : 'Multiple'} drills` }
                ],
                callout: { icon: icons.technical, text: sec.cue || "Focus on mechanics and form over power." },
                sections: [
                    { title: "DETAILS", content: `<p>${sec.detail}</p>` },
                    { title: "DRILLS", content: `<div class="nested-list">${drillsHtml}</div>` }
                ],
                actionHtml: `<button class="btn-primary" style="width: 100%;" onclick="startRoundTimer(${day.id}, '${sec.id}', ${sec.workSeconds}, ${sec.restSeconds}, '${sec.name.replace(/'/g, "\\'")}', '')">Start Section Timer</button>`
            };
            
            html += renderItemCard(normalizedItem, day.type);
        });
    } else if (day.type === 'bag') {
        day.exercises.forEach((ex, idx) => {
            let roundsHtml = ex.rounds ? ex.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                const demoBtn = r.videoId
                    ? `<button class="btn-demo" onclick="openVideoModal('${r.videoId}', '${r.combo.replace(/'/g, "\\'")}', 'short')">
                           <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M8 5v14l11-7z"/></svg> Demo
                       </button>`
                    : '';
                return `
                <div class="nested-row">
                    <button class="btn-check ${isChecked}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                    <div style="flex: 1;">${r.combo}</div>
                    ${demoBtn}
                </div>`;
            }).join('') : `<div class="nested-row"><button class="btn-check ${Store.getItemLog(day.id, ex.id)?.completed ? 'checked':''}" onclick="toggleRound(event, ${day.id}, '${ex.id}')">${icons.checkmark}</button><div style="flex:1;">${ex.notes}</div></div>`;

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
                actionHtml: `<button class="btn-primary" style="width: 100%; margin-top: var(--sp-4);" onclick="startRoundTimer(${day.id}, '${ex.id}', ${ex.workSeconds}, ${ex.restSeconds}, '${ex.name.replace(/'/g, "\\'")}', '${ex.benefits ? ex.benefits.replace(/'/g, "\\'") : ""}')">Start Round Timer</button>`
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
            let setsCount = parseInt((ex.setsReps || "1").split(" ")[0]) || 1;
            let logHtml = '';
            const logData = Store.getItemLog(day.id, ex.id) || { sets: {} };
            for(let s=1; s<=setsCount; s++) {
                const setData = logData.sets[s] || {};
                const isChecked = setData.completed ? 'checked' : '';
                const repsVal = setData.reps || (ex.setsReps.includes('x') ? ex.setsReps.split('x')[1].trim() : '5');
                const weightVal = setData.weight || ex.weight || '';
                
                logHtml += `
                <div class="set-row ${isChecked}">
                    <div class="set-num">${s}</div>
                    <div class="set-input-group">
                        <input type="text" class="input-val input-weight" value="${weightVal}" placeholder="lbs" />
                        <span class="input-label">weight</span>
                    </div>
                    <div class="set-input-group">
                        <input type="number" class="input-val input-rep" value="${repsVal}" />
                        <span class="input-label">reps</span>
                    </div>
                    <button class="btn-check ${isChecked}" onclick="logSet(${day.id}, '${ex.id}', ${s}, ${ex.restSeconds}, '${ex.name.replace(/'/g, "\\'")}', 'Drive through the floor explosively — speed matters over weight.', this)">${icons.checkmark}</button>
                </div>
                `;
            }

            let normalizedItem = {
                id: ex.id,
                badge: idx + 1,
                title: ex.name,
                stats: stats,
                callout: { icon: icons.strength, text: "Drive through the floor explosively — speed matters over weight." },
                sections: [
                    { title: "LOG SETS", content: logHtml },
                    { title: "EXECUTION NOTES", content: `<p>${ex.notes}</p>` },
                    { title: "WHY THIS EXERCISE", content: `<p>${ex.benefits}</p>` },
                    { title: "MUSCLES WORKED", content: `<div class="muscle-tags">${musclesHtml}</div>` }
                ]
            };
            
            if (ex.videoId) {
                normalizedItem.actionHtml = `<button class="btn-ghost" style="width: 100%; margin-top: var(--sp-4);" onclick="openVideoModal('${ex.videoId}', '${ex.name.replace(/'/g, "\\'")}', '${ex.videoFormat || 'short'}')">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg> Watch Video
                </button>`;
            }

            html += renderItemCard(normalizedItem, day.type);
        });
    }
    
    html += `</div>`; // .item-list
    
    html += `
        <div style="margin-top: 32px; margin-bottom: 64px;">
            <button class="btn-primary" style="width: 100%; padding: 16px; font-size: 16px;" onclick="finishWorkout(${day.id})">Complete Session</button>
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
                <div class="header-logo-box" style="width: 48px; height: 48px; border-radius: 12px; margin: 0; flex-shrink: 0;">
                    <svg viewBox="0 0 24 24" style="fill: #fff; width: 24px; height: 24px;"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>
                </div>
                <div style="text-align: left;">
                    <div class="label-small" style="margin-bottom: 4px;">PHASE 1 OF 3</div>
                    <h1 class="title-page" style="margin-bottom: 2px; font-size: 24px;">Explosive Punching Power</h1>
                    <div class="text-sec">7 Days · Foundation Phase</div>
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
            <button class="btn-primary" style="padding: 12px 24px;" onclick="renderHome()">
                ${icons.back} Back to This Week
            </button>
        </div>
    `;
    
    appContainer.innerHTML = html;
}

// --- YouTube Video Modal Logic ---

function showToast(msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

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
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}" 
                    title="${title} video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
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

document.addEventListener('DOMContentLoaded', init);
