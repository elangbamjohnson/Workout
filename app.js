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

const appContainer = document.getElementById('app-container');
let currentDayIndex = 1; // Phase 1 placeholder (Day 2)

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
            <div class="flex items-center gap-2">
                <div class="header-pill pill-active"><div class="header-pill-dot"></div> Phase 1 of 3</div>
                <div class="header-pill">Week 1</div>
                <button class="header-pill" style="cursor:pointer;" onclick="renderAbout()">${icons.info} About</button>
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
                <div class="banner-icon">${icons.flame}</div>
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
    html += `<div class="section-header">This Week</div><div class="days-grid">`;
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
            <div class="card day-card type-${day.type} ${isCurrent ? 'is-current' : ''}" onclick="renderDay('${day.id}')">
                <div class="flex justify-between items-start" style="margin-bottom: var(--sp-4);">
                    <div class="flex items-center gap-2">
                        <div class="card-icon-box">${icons[iconName]}</div>
                        <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : '6-7'}</span>
                    </div>
                    <div class="type-badge">${icons[iconName]} ${day.type}</div>
                </div>
                <div class="title-card" style="margin-bottom: 4px;">${day.title}</div>
                <div class="text-sec" style="font-size: 12px; margin-bottom: var(--sp-3); min-height: 18px;">${day.subtitle || ''}</div>
                <div class="text-sec" style="font-size: 13px; line-height: 1.5; margin-bottom: var(--sp-4);">${day.note || ''}</div>
                <div class="card-footer">
                    <span>${countLabel}</span>
                    <span style="color: var(--text-primary); font-weight: 500;">View ${icons.forward}</span>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    // Locked Phase
    html += `
        <div class="card locked-card">
            <div class="flex items-center gap-4">
                <div class="card-icon-box" style="background: var(--bg-nested); color: var(--text-muted); border-radius: 50%;">${icons.trend}</div>
                <div>
                    <div class="title-card" style="color: var(--text-secondary);">Phase 2 — Plyometric Power</div>
                    <div class="text-sec" style="font-size: 13px;">Unlocks after 3 complete cycles of Phase 1</div>
                </div>
            </div>
        </div>
    `;

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
            <button class="btn-nav" onclick="renderHome()">${icons.back} Week</button>
            <div class="flex items-center gap-2">
                ${prevDay ? `<button class="btn-nav" onclick="renderDay('${prevDay.id}')">${icons.back} Day ${prevDay.id}</button>` : ''}
                <span class="btn-nav" style="background: transparent; border: none; cursor: default;">${dayIndex + 1} / ${workoutData.days.length}</span>
                ${nextDay ? `<button class="btn-nav" onclick="renderDay('${nextDay.id}')">Day ${nextDay.id} ${icons.forward}</button>` : ''}
            </div>
        </div>
    `;

    // Header Card
    html += `
        <div class="card day-header-card type-${day.type}">
            <div class="flex justify-between items-start" style="margin-bottom: var(--sp-2);">
                <span class="label-small">DAY ${typeof day.id === 'number' ? day.id : '6-7'}</span>
                <span class="type-badge">${icons[iconName]} ${day.type}</span>
            </div>
            <h1 class="title-page" style="margin-bottom: var(--sp-1);">${day.title}</h1>
            ${day.subtitle ? `<div class="text-sec" style="margin-bottom: var(--sp-4);">${day.subtitle}</div>` : ''}
            <div class="text-sec" style="line-height: 1.6;">${day.note ? day.note.split('—')[0] : 'Pure power application on the heavy bag.'}</div>
        </div>
    `;

    // Callout
    if (day.note) {
        html += `
            <div class="callout type-${day.type}">
                ${icons.lightbulb}
                <div class="callout-text">${day.note}</div>
            </div>
        `;
    }

    // Content Section Header
    if (day.type !== 'rest') {
        let countLabel = '';
        let totalTime = null;
        if (day.type === 'strength') countLabel = `EXERCISES · ${day.exercises.length}`;
        else if (day.type === 'bag') { countLabel = `ROUNDS · ${day.exercises.length}`; totalTime = "18 min total"; }
        else if (day.type === 'technical') { countLabel = `SECTIONS · ${day.sections.length}`; totalTime = "40 min total"; }

        html += `
            <div class="content-header-row">
                <span class="label-small">${countLabel}</span>
                <div class="right-actions">
                    ${totalTime ? `<span class="time-pill type-${day.type}">${icons.clock} ${totalTime}</span>` : ''}
                    <button class="btn-nav" style="font-size: 11px;" onclick="document.querySelectorAll('.item-card').forEach(c => c.classList.add('expanded'))">Expand all</button>
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
                    ${day.notes.map(n => `<li>${n}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (day.type === 'technical') {
        day.sections.forEach((sec, idx) => {
            let drillsHtml = sec.rounds ? sec.rounds.map(r => `
                <div class="nested-row">
                    <div class="nested-icon">${icons.checkmark}</div>
                    <div>Round ${r.round} — ${r.combo} : ${r.focus}</div>
                </div>`).join('') : '';

            html += `
                <div class="item-card type-${day.type}">
                    <div class="item-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <div class="item-header-top">
                            <div class="item-title-wrap">
                                <div class="num-badge">${idx + 1}</div>
                                <div class="title-card">${sec.name}</div>
                            </div>
                            <div class="item-chevron">${icons.chevron}</div>
                        </div>
                        <div class="item-stats">
                            <div class="stat-item"><span class="text-mono">${sec.duration}</span></div>
                            <div class="stat-item"><span class="stat-item-label">· ${sec.rounds ? sec.rounds.length : 'Multiple'} drills</span></div>
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="item-content-section">
                            <p>${sec.detail}</p>
                        </div>
                        <div class="item-content-section">
                            <div class="label-small">DRILLS</div>
                            <div class="nested-list">${drillsHtml}</div>
                        </div>
                        <div class="item-callout" style="margin-top: var(--sp-4);">
                            ${icons.technical} <span>Focus on mechanics and form over power.</span>
                        </div>
                    </div>
                </div>
            `;
        });
    } else if (day.type === 'bag') {
        day.exercises.forEach((ex, idx) => {
            html += `
                <div class="item-card type-${day.type}">
                    <div class="item-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <div class="item-header-top">
                            <div class="item-title-wrap">
                                <div class="num-badge">R${idx + 1}</div>
                                <div class="title-card">${ex.name}</div>
                            </div>
                            <div class="item-chevron">${icons.chevron}</div>
                        </div>
                        <div class="item-stats">
                            <div class="stat-item">${icons.clock} <span class="text-mono">${ex.setsReps}</span></div>
                            <div class="stat-item">${icons.flame} <span class="text-mono">85-95%</span></div>
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="item-content-section">
                            <div class="label-small">COMBINATIONS</div>
                            <div class="nested-list">
                                ${ex.rounds ? ex.rounds.map((r, i) => `
                                    <div class="nested-row">
                                        <div class="nested-icon">${i + 1}</div>
                                        <div>${r.combo}</div>
                                    </div>
                                `).join('') : `<div class="nested-row"><div class="nested-icon">1</div><div>${ex.notes}</div></div>`}
                            </div>
                        </div>
                        <div class="item-callout" style="margin-top: var(--sp-4);">
                            ${icons.flame} <span>${ex.benefits}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Strength
        day.exercises.forEach((ex, idx) => {
            let musclesHtml = ex.muscles ? ex.muscles.split(',').map(m => `<div class="muscle-tag">${m.trim()}</div>`).join('') : '';
            html += `
                <div class="item-card type-${day.type}">
                    <div class="item-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <div class="item-header-top">
                            <div class="item-title-wrap">
                                <div class="num-badge">${idx + 1}</div>
                                <div class="title-card">${ex.name}</div>
                            </div>
                            <div class="item-chevron">${icons.chevron}</div>
                        </div>
                        <div class="item-stats">
                            <div class="stat-item">${icons.repeat} <span class="text-mono">${ex.setsReps}</span> <span class="stat-item-label">sets × reps</span></div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">${icons.weight} <span class="text-mono">${ex.weight}</span></div>
                            ${ex.restSeconds ? `<div class="stat-divider"></div><div class="stat-item">${icons.clock} <span class="text-mono">${Math.floor(ex.restSeconds/60)} min rest</span></div>` : ''}
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="item-callout" style="margin-bottom: var(--sp-4);">
                            ${icons.strength} <span>Drive through the floor explosively — speed matters over weight.</span>
                        </div>
                        <div class="item-content-section">
                            <div class="label-small">EXECUTION NOTES</div>
                            <p>${ex.notes}</p>
                        </div>
                        <div class="item-content-section">
                            <div class="label-small">WHY THIS EXERCISE</div>
                            <p>${ex.benefits}</p>
                        </div>
                        <div class="item-content-section">
                            <div class="label-small">MUSCLES WORKED</div>
                            <div class="muscle-tags">${musclesHtml}</div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    html += `</div>`; // .item-list

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

document.addEventListener('DOMContentLoaded', init);
