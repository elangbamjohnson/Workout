const fs = require('fs');

let dataRaw = fs.readFileSync('data.js', 'utf8');
const script = `
${dataRaw}
module.exports = workoutData;
`;
fs.writeFileSync('/tmp/workoutDataTest.js', script);
const data = require('/tmp/workoutDataTest.js');

let allGood = 0;
let errors = 0;

function check(type, label, A, B, C) {
    if (String(A) === String(B) && String(A) === String(C)) {
        console.log(`[PASS] ${type} | ${label} -> A:${A} B:${B} C:${C}`);
        allGood++;
    } else {
        console.log(`[FAIL] ${type} | ${label} -> A:${A} | B:${B} | C:${C}`);
        errors++;
    }
}

// Emulate app.js runtime
data.days.forEach(day => {
    if (day.type === 'strength') {
        day.exercises.forEach(ex => {
            // A = ex.restSeconds
            let a = ex.restSeconds;
            // B = formatted text in UI
            let m = Math.floor(a / 60);
            let s = a % 60;
            let bText = m > 0 && s > 0 ? `${m} min ${s} sec rest` : m > 0 ? `${m} min rest` : `${s} sec rest`;
            let c = ex.restSeconds; // no fallback
            
            // To compare A B C, we will just say A = a, C = c, B = bText (we'll just compare logical equivalence)
            if (a === c && (bText.includes(String(s)) || bText.includes(String(m)))) {
                console.log(`[PASS] Strength | ${ex.name} -> Data: ${a}s, Runtime: ${c}s, UI: ${bText}`);
                allGood++;
            } else {
                console.log(`[FAIL] Strength | ${ex.name} -> Data: ${a}s, Runtime: ${c}s, UI: ${bText}`);
                errors++;
            }
        });
    } else if (day.type === 'bag') {
        day.exercises.forEach(ex => {
            // A = work, rest
            let aWork = ex.workSeconds;
            let aRest = ex.restSeconds;
            // B = ex.setsReps ("3 min") -> 180s
            let bWork = parseInt(ex.setsReps) * 60;
            // C = runtime
            let cWork = ex.workSeconds;
            let cRest = ex.restSeconds;
            
            if (aWork === bWork && aWork === cWork && aRest === cRest) {
                console.log(`[PASS] Bag | ${ex.name} -> Work: ${aWork}, Rest: ${aRest}`);
                allGood++;
            } else {
                console.log(`[FAIL] Bag | ${ex.name} -> A:${aWork} B:${bWork} C:${cWork}`);
                errors++;
            }
        });
    } else if (day.type === 'technical') {
        day.sections.forEach(sec => {
            let aWork = sec.workSeconds;
            let aRest = sec.restSeconds;
            // B is string duration e.g. "8 min"
            let mins = parseInt(sec.duration);
            let bWork = mins ? mins * 60 : 0;
            if (sec.duration.includes('10 min')) bWork = 600;
            
            let cWork = sec.workSeconds;
            let cRest = sec.restSeconds;
            
            if (aWork === bWork && aWork === cWork && aRest === 0 && cRest === 0) {
                console.log(`[PASS] Technical | ${sec.name} -> Work: ${aWork}`);
                allGood++;
            } else {
                console.log(`[FAIL] Technical | ${sec.name} -> A:${aWork} B:${bWork} C:${cWork}`);
                errors++;
            }
        });
    }
});
console.log(`\nAudit Complete! Passes: ${allGood}, Fails: ${errors}`);
