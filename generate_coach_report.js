const fs = require('fs');

let dataRaw = fs.readFileSync('data.js', 'utf8');
const script = `
${dataRaw}
module.exports = workoutData;
`;
fs.writeFileSync('/tmp/workoutDataCoach.js', script);
const data = require('/tmp/workoutDataCoach.js');

let markdown = "# Strength & Power Coach Rest Period Review\n\n";
markdown += "| Day | Exercise Name | Reps | Current Rest | Within 90-120s Rule? | CNS Demand | Recommended Rest | Reasoning |\n";
markdown += "|---|---|---|---|---|---|---|---|\n";

// I'll leave the reasoning empty for now and fill it in python or just output the raw data as JSON and write the coach report manually.
let reportData = [];
data.days.forEach(day => {
    if (day.type === 'strength') {
        day.exercises.forEach(ex => {
            reportData.push({
                day: day.id,
                name: ex.name,
                reps: ex.setsReps,
                weight: ex.weight,
                notes: ex.notes,
                currentRest: ex.restSeconds
            });
        });
    }
});
fs.writeFileSync('/tmp/coach_data.json', JSON.stringify(reportData, null, 2));
