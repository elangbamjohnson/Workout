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
// PHASE 2 HOOK: This should read from persistence (e.g., localStorage).
// For now, mapping calendar day of week to program day (Monday = Day 1 ... Sunday = Day 7).
const jsDay = new Date().getDay();
let currentDayIndex = jsDay === 0 ? 6 : jsDay - 1; 
let expandedCardIds = new Set();

function toggleCard(id) {
    if (expandedCardIds.has(id)) {
        expandedCardIds.delete(id);
    } else {
        expandedCardIds.add(id);
    }
    // Re-render the current day to reflect state
    const currentDay = workoutData.days[currentDayIndex];
    if (document.getElementById('app-container').className === '') {
        // We are on a day detail page. Let's just toggle the DOM class to avoid full re-render, 
        // or we can just re-render. Re-rendering is easiest.
        renderDay(currentDay.id);
    }
}

function expandAll() {
    const currentDay = workoutData.days[currentDayIndex];
    if (!currentDay) return;
    
    // Add all valid ids
    if (currentDay.exercises) currentDay.exercises.forEach(ex => expandedCardIds.add(ex.id));
    if (currentDay.sections) currentDay.sections.forEach(sec => expandedCardIds.add(sec.id));
    
    renderDay(currentDay.id);
}

function collapseAll() {
    expandedCardIds.clear();
    const currentDay = workoutData.days[currentDayIndex];
    if (currentDay) renderDay(currentDay.id);
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
            </div>
        </div>
    `;
    return html;
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
                <span class="type-badge" aria-hidden="true">${icons[iconName]} ${day.type}</span>
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
        
        if (day.type === 'strength') {
            countLabel = `EXERCISES · ${day.exercises.length}`;
        } else if (day.type === 'bag') {
            countLabel = `ROUNDS · ${day.exercises.length}`;
            let totalSeconds = day.exercises.reduce((sum, ex) => {
                let w = ex.workSeconds || 0;
                let r = ex.restSeconds || 0;
                let sets = parseInt((ex.setsReps || "1").split(" ")[0]) || 1;
                return sum + (w + r) * sets;
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
            let drillsHtml = sec.rounds ? sec.rounds.map(r => `
                <div class="nested-row">
                    <div class="nested-icon" aria-hidden="true">${icons.checkmark}</div>
                    <div>Round ${r.round} — ${r.combo} : ${r.focus}</div>
                </div>`).join('') : '';

            let normalizedItem = {
                id: sec.id,
                badge: idx + 1,
                title: sec.name,
                stats: [
                    { value: sec.duration },
                    { label: `· ${sec.rounds ? sec.rounds.length : 'Multiple'} drills` }
                ],
                callout: { icon: icons.technical, text: "Focus on mechanics and form over power." },
                sections: [
                    { title: "DETAILS", content: `<p>${sec.detail}</p>` },
                    { title: "DRILLS", content: `<div class="nested-list">${drillsHtml}</div>` }
                ]
            };
            html += renderItemCard(normalizedItem, day.type);
        });
    } else if (day.type === 'bag') {
        day.exercises.forEach((ex, idx) => {
            let roundsHtml = ex.rounds ? ex.rounds.map((r, i) => `
                <div class="nested-row">
                    <div class="nested-icon" aria-hidden="true">${i + 1}</div>
                    <div>${r.combo}</div>
                </div>
            `).join('') : `<div class="nested-row"><div class="nested-icon" aria-hidden="true">1</div><div>${ex.notes}</div></div>`;

            let normalizedItem = {
                id: ex.id,
                badge: `R${idx + 1}`,
                title: ex.name,
                stats: [
                    { icon: icons.clock, value: ex.setsReps },
                    { icon: icons.flame, value: "85-95%" }
                ],
                callout: { icon: icons.flame, text: ex.benefits },
                sections: [
                    { title: "COMBINATIONS", content: `<div class="nested-list">${roundsHtml}</div>` }
                ]
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
                stats.push("divider");
                stats.push({ icon: icons.clock, value: `${Math.floor(ex.restSeconds/60)} min rest` });
            }

            let normalizedItem = {
                id: ex.id,
                badge: idx + 1,
                title: ex.name,
                stats: stats,
                callout: { icon: icons.strength, text: "Drive through the floor explosively — speed matters over weight." },
                sections: [
                    { title: "EXECUTION NOTES", content: `<p>${ex.notes}</p>` },
                    { title: "WHY THIS EXERCISE", content: `<p>${ex.benefits}</p>` },
                    { title: "MUSCLES WORKED", content: `<div class="muscle-tags">${musclesHtml}</div>` }
                ]
            };
            html += renderItemCard(normalizedItem, day.type);
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
