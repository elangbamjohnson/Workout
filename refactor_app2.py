import os
import re

app_js_path = '/Users/johnsonelangbam/Projects/Workout-Plan/app.js'
with open(app_js_path, 'r') as f:
    content = f.read()

# 1. Update Home page rendering to include Dashboard
render_home_target = """function renderHome() {
    clearApp();
    appContainer.className = 'home-layout';
    updateGlobalHeader(true);
    
    let html = `"""
dashboard_html = """
    // --- Phase 2 Dashboard ---
    const totalSessions = Store.getTotalSessions();
    const streak = Store.getStreak();
    const weeksElapsed = Store.getWeeksElapsed();
    
    // Find the latest currentDayId from Store, else fallback
    currentDayIndex = (Store.state.currentDayId || jsDay === 0 ? 7 : jsDay) - 1;
    const today = workoutData.days[currentDayIndex];
    
    let dashboardHtml = `
        <div class="dashboard">
            <div class="dash-stats">
                <div class="dash-stat">
                    <div class="stat-val">${totalSessions}</div>
                    <div class="stat-lbl">Sessions</div>
                </div>
                <div class="dash-stat">
                    <div class="stat-val">${streak}</div>
                    <div class="stat-lbl">Day Streak</div>
                </div>
                <div class="dash-stat">
                    <div class="stat-val">Wk ${weeksElapsed + 1}</div>
                    <div class="stat-lbl">Progression</div>
                </div>
            </div>
            ${weeksElapsed >= 2 ? `
            <div class="callout type-bag" style="margin-top: 16px;">
                ${icons.lightbulb}
                <div class="callout-text"><strong>Progression Alert:</strong> It's been 2 weeks! Check the program rules for progression (e.g. increase weight, add 1 round).</div>
            </div>
            ` : ''}
        </div>
    `;
"""
# Replace inside renderHome
content = content.replace(render_home_target, render_home_target + "\n" + dashboard_html)
# Insert dashboardHtml before the "Today" banner
content = content.replace('<div class="banner-today">', '${dashboardHtml}\n        <div class="banner-today">')

# 2. Update renderDay to include Finish Workout button
render_day_footer_target = "html += `</div>`; // .item-list"
finish_btn_html = """
    html += `</div>`; // .item-list
    
    html += `
        <div style="margin-top: 32px; margin-bottom: 64px;">
            <button class="btn-primary" style="width: 100%; padding: 16px; font-size: 16px;" onclick="finishWorkout(${day.id})">Complete Session</button>
        </div>
    `;
"""
content = content.replace(render_day_footer_target, finish_btn_html)

# 3. Add Window bindings for interactivity at the top
bindings = """
// Phase 2 bindings
window.logSet = function(dayId, itemId, setIndex, restSec, btn) {
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
        Timer.startRest(restSec);
    }
};

window.toggleRound = function(e, dayId, roundId) {
    e.stopPropagation();
    const logData = Store.getItemLog(dayId, roundId) || {};
    Store.logItem(dayId, roundId, { completed: !logData.completed });
    renderDay(viewingDayId);
};

window.startRoundTimer = function(dayId, roundId, workSec, restSec, title, cue) {
    Timer.startRound(workSec, restSec, title, cue, () => {
        Store.logItem(dayId, roundId, { completed: true });
        renderDay(viewingDayId);
    });
};

window.finishWorkout = function(dayId) {
    Store.finishWorkout(dayId);
    renderHome();
};
"""
content = content.replace("const appContainer = document.getElementById('app-container');", bindings + "\nconst appContainer = document.getElementById('app-container');")

# 4. Refactor Bag/Technical Day rendering in renderDay
# We need to change the drillsHtml mapping
bag_render_target = "day.exercises.forEach((ex, idx) => {"
tech_render_target = "day.sections.forEach((sec, idx) => {"

# We will just write a python function to dynamically patch the map logic inside app.js.
# Actually, I'll use regex.
import re

# For Technical days
tech_regex = re.compile(r"let drillsHtml = sec\.rounds \? sec\.rounds\.map\(r => `(.*?)`\)\.join\(''\) : '';", re.DOTALL)
new_tech_map = """let drillsHtml = sec.rounds ? sec.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                return `
                <div class="nested-row interactive" onclick="startRoundTimer(${day.id}, '${r.id}', sec.workSeconds || 60, sec.restSeconds || 0, '${r.combo.replace(/'/g, "\\'")}', '${sec.cue ? sec.cue.replace(/'/g, "\\'") : ""}')">
                    <button class="btn-check ${isChecked}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                    <div style="flex: 1;">${r.round ? `Round ${r.round} — ` : ''}${r.combo}${r.focus ? ` : ${r.focus}` : ''}</div>
                    <div class="play-icon"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>
                </div>`;
            }).join('') : '';"""
content = tech_regex.sub(new_tech_map, content)

# For Bag days
bag_regex = re.compile(r"let roundsHtml = ex\.rounds \? ex\.rounds\.map\(\(r, i\) => `(.*?)`\)\.join\(''\) : `(.*?)`;", re.DOTALL)
new_bag_map = """let roundsHtml = ex.rounds ? ex.rounds.map((r, i) => {
                const log = Store.getItemLog(day.id, r.id) || {};
                const isChecked = log.completed ? 'checked' : '';
                return `
                <div class="nested-row interactive" onclick="startRoundTimer(${day.id}, '${r.id}', ex.workSeconds || 60, ex.restSeconds || 0, '${r.combo.replace(/'/g, "\\'")}', '${ex.benefits ? ex.benefits.replace(/'/g, "\\'") : ""}')">
                    <button class="btn-check ${isChecked}" onclick="toggleRound(event, ${day.id}, '${r.id}')">${icons.checkmark}</button>
                    <div style="flex: 1;">${r.combo}</div>
                    <div class="play-icon"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>
                </div>`;
            }).join('') : `<div class="nested-row interactive" onclick="startRoundTimer(${day.id}, '${ex.id}', ex.workSeconds || 60, ex.restSeconds || 0, '${ex.name.replace(/'/g, "\\'")}', '')"><button class="btn-check ${Store.getItemLog(day.id, ex.id)?.completed ? 'checked':''}" onclick="toggleRound(event, ${day.id}, '${ex.id}')">${icons.checkmark}</button><div style="flex:1;">${ex.notes}</div><div class="play-icon"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div></div>`;"""
content = bag_regex.sub(new_bag_map, content)

# 5. For Strength Days
strength_render_regex = re.compile(r"let normalizedItem = \{\s*id: ex\.id,\s*badge: idx \+ 1,\s*title: ex\.name,\s*stats: stats,\s*callout: \{ icon: icons\.strength, text: \"Drive through the floor explosively — speed matters over weight\.\" \},\s*sections: \[\s*\{ title: \"EXECUTION NOTES\", content: `<p>\$\{ex\.notes\}</p>` \},\s*\{ title: \"WHY THIS EXERCISE\", content: `<p>\$\{ex\.benefits\}</p>` \},\s*\{ title: \"MUSCLES WORKED\", content: `<div class=\"muscle-tags\">\$\{musclesHtml\}</div>` \}\s*\]\s*\};")

new_strength_map = """
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
                    <button class="btn-check ${isChecked}" onclick="logSet(${day.id}, '${ex.id}', ${s}, ${ex.restSeconds || 90}, this)">${icons.checkmark}</button>
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
"""
content = strength_render_regex.sub(new_strength_map, content)

with open(app_js_path, 'w') as f:
    f.write(content)

print("app.js updated successfully")
