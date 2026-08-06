const fs = require('fs');
const data = fs.readFileSync('data.js', 'utf8');
const scriptContext = {};
eval(data + '; scriptContext.workoutData = workoutData;');
const workoutData = scriptContext.workoutData;
const day = workoutData.days[1]; // Day 2
const ex = day.exercises[0];
const r = ex.rounds[0];

const html = `<div onclick="startRoundTimer(${day.id}, '${r.id}', sec.workSeconds || 60, sec.restSeconds || 0, '${r.combo.replace(/'/g, "\\'")}', '')">`;
console.log(html);
