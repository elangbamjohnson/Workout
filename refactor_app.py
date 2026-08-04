import re

with open('./app.js', 'r') as f:
    content = f.read()

# 1. State Variables
content = content.replace(
    'let currentDayIndex = 1; // Phase 1 placeholder (Day 2)',
    '''// PHASE 2 HOOK: This should read from persistence (e.g., localStorage).
// For now, defaulting to Day 1 (index 0).
let currentDayIndex = 0; 
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
'''
)

# 2. Fix the locked card in renderHome
content = content.replace(
    '''    // Locked Phase
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
    `;''',
    '''    // Locked Phase
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
    }'''
)

# 3. Fix Day cards on home to be a tags / buttons
content = content.replace(
    '<div class="card day-card type-${day.type} ${isCurrent ? \'is-current\' : \'\'}" onclick="renderDay(\'${day.id}\')">',
    '<a href="#" class="card day-card type-${day.type} ${isCurrent ? \'is-current\' : \'\'}" onclick="event.preventDefault(); renderDay(\'${day.id}\')" style="text-decoration: none;">'
)
content = content.replace(
    '''                    <span style="color: var(--text-primary); font-weight: 500;">View ${icons.forward}</span>
                </div>
            </div>''',
    '''                    <span style="color: var(--text-primary); font-weight: 500;">View ${icons.forward}</span>
                </div>
            </a>'''
)
content = content.replace('<div class="section-header">This Week</div>', '<h2 class="section-header">This Week</h2>')


# 4. Total Time dynamic calculation in renderDay
import textwrap

# We will replace the entire renderDay function's body from `// Content Section Header` to `html += \`</div>\`; // .item-list`

render_day_replacement = '''    // Content Section Header
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
    html += `</div>`; // .item-list'''

old_renderDay_part = re.search(r'    // Content Section Header(.*?)    html \+= `</div>`; // \.item-list', content, re.DOTALL)
if old_renderDay_part:
    content = content.replace(old_renderDay_part.group(0), render_day_replacement)
else:
    print("Could not find renderDay part to replace.")

# Fix aria-hidden on other icons
content = content.replace('<div class="item-chevron">', '<div class="item-chevron" aria-hidden="true">')
content = content.replace('<div class="banner-icon">', '<div class="banner-icon" aria-hidden="true">')
content = content.replace('<div class="card-icon-box">', '<div class="card-icon-box" aria-hidden="true">')
content = content.replace('<span class="type-badge">', '<span class="type-badge" aria-hidden="true">')
content = content.replace('<div class="type-badge">', '<div class="type-badge" aria-hidden="true">')

# Make "About" nav link a button
content = content.replace('<div class="pill" onclick="renderAbout()">', '<button class="pill" onclick="renderAbout()">')
content = content.replace('</div>${icons.info} About</div>', '</div>${icons.info} About</button>')
content = content.replace('${icons.info} About</div>', '${icons.info} About</button>')

# Change currentDayIndex definition in renderDay to use the global state correctly
content = content.replace('currentDayIndex = workoutData.days.findIndex(d => d.id === dayId);', 'currentDayIndex = workoutData.days.findIndex(d => d.id === dayId);')

with open('./app.js', 'w') as f:
    f.write(content)

print("Updated app.js")
