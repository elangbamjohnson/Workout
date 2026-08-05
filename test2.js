const fs = require('fs');
eval(fs.readFileSync('data.js', 'utf8'));

// mock global functions
global.icons = { checkmark: '' };
global.Store = { getItemLog: () => ({}) };

// snippet from app.js
const day = workoutData.days[1];
const html = day.exercises.map((ex, idx) => {
    return ex.rounds ? ex.rounds.map((r, i) => {
        return `startRoundTimer(${day.id}, '${r.id}', ${ex.workSeconds || 60}, ${ex.restSeconds || 0}, '${r.combo.replace(/'/g, "\\'")}', '${ex.benefits ? ex.benefits.replace(/'/g, "\\'") : ""}')`;
    }).join('\n') : '';
}).join('\n');

console.log(html);
