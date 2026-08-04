const fs = require('fs');

const path = './data.js';
let content = fs.readFileSync(path, 'utf8');

// Extract JSON part
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}') + 1;
const jsonStr = content.substring(jsonStart, jsonEnd);

let data = JSON.parse(jsonStr);

// Add IDs
data.days.forEach(day => {
    if (day.exercises) {
        day.exercises.forEach((ex, index) => {
            ex.id = `day${day.id}-ex${index + 1}`;
            if (ex.rounds) {
                ex.rounds.forEach((r, rIndex) => {
                    r.id = `day${day.id}-ex${index + 1}-r${rIndex + 1}`;
                });
            }
        });
    }
    if (day.sections) {
        day.sections.forEach((sec, index) => {
            sec.id = `day${day.id}-sec${index + 1}`;
            if (sec.rounds) {
                sec.rounds.forEach((r, rIndex) => {
                    r.id = `day${day.id}-sec${index + 1}-r${rIndex + 1}`;
                });
            }
        });
    }
    if (day.notes) {
        day.notes = day.notes.map((noteText, index) => {
            return {
                id: `day${day.id}-note${index + 1}`,
                text: noteText
            };
        });
    }
});

// Add locked phase (Step 4 requirement)
data.lockedPhase = {
    title: "Phase 2 — Plyometric Power",
    subtitle: "Unlocks after 3 complete cycles of Phase 1"
};

const updatedContent = `const workoutData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path, updatedContent, 'utf8');
console.log('Successfully updated data.js');
