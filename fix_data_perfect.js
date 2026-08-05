const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');

// The best way is to do string replacement with regex very carefully.
// Day 2
content = content.replace(/"name": "Jab Power Development",\s*"setsReps": "3 min",\s*"intensity": "85-95%",\s*"workSeconds": 60,/g, '"name": "Jab Power Development",\n          "setsReps": "3 min",\n          "intensity": "85-95%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Cross Power",\s*"setsReps": "3 min",\s*"intensity": "85-95%",\s*"workSeconds": 60,/g, '"name": "Cross Power",\n          "setsReps": "3 min",\n          "intensity": "85-95%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Lead Hook Power",\s*"setsReps": "3 min",\s*"intensity": "85-95%",\s*"workSeconds": 60,/g, '"name": "Lead Hook Power",\n          "setsReps": "3 min",\n          "intensity": "85-95%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Rear Body Hook \+ Uppercut",\s*"setsReps": "3 min",\s*"intensity": "85-90%",\s*"workSeconds": 60,/g, '"name": "Rear Body Hook + Uppercut",\n          "setsReps": "3 min",\n          "intensity": "85-90%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Power Combinations",\s*"setsReps": "3 min",\s*"intensity": "90-100%",\s*"workSeconds": 60,/g, '"name": "Power Combinations",\n          "setsReps": "3 min",\n          "intensity": "90-100%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Power Endurance Finisher",\s*"setsReps": "3 min",\s*"intensity": "Maximum Output",\s*"workSeconds": 60,/g, '"name": "Power Endurance Finisher",\n          "setsReps": "3 min",\n          "intensity": "Maximum Output",\n          "workSeconds": 180,\n          "restSeconds": 0,');

// Day 5
content = content.replace(/"name": "Warm-Up Combinations",\s*"setsReps": "3 min",\s*"intensity": "60-70%",\s*"workSeconds": 60,/g, '"name": "Warm-Up Combinations",\n          "setsReps": "3 min",\n          "intensity": "60-70%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Power Singles",\s*"setsReps": "3 min",\s*"intensity": "95-100%",\s*"workSeconds": 60,/g, '"name": "Power Singles",\n          "setsReps": "3 min",\n          "intensity": "95-100%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Body Work",\s*"setsReps": "3 min",\s*"intensity": "85-95%",\s*"workSeconds": 60,/g, '"name": "Body Work",\n          "setsReps": "3 min",\n          "intensity": "85-95%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Combination Power",\s*"setsReps": "3 min",\s*"intensity": "90%",\s*"workSeconds": 60,/g, '"name": "Combination Power",\n          "setsReps": "3 min",\n          "intensity": "90%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Pressure Round",\s*"setsReps": "3 min",\s*"intensity": "85-95%",\s*"workSeconds": 60,/g, '"name": "Pressure Round",\n          "setsReps": "3 min",\n          "intensity": "85-95%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Power Endurance Test",\s*"setsReps": "3 min",\s*"intensity": "95-100%",\s*"workSeconds": 60,/g, '"name": "Power Endurance Test",\n          "setsReps": "3 min",\n          "intensity": "95-100%",\n          "workSeconds": 180,\n          "restSeconds": 60,');
content = content.replace(/"name": "Cool-Down Shadowboxing",\s*"setsReps": "2 min",\s*"intensity": "30-40%",\s*"workSeconds": 60,/g, '"name": "Cool-Down Shadowboxing",\n          "setsReps": "2 min",\n          "intensity": "30-40%",\n          "workSeconds": 120,\n          "restSeconds": 0,');

// Day 3 Technical
content = content.replace(/"duration": "8 min",\s*"workSeconds": 480,\s*"restSeconds": 0,/g, '"duration": "8 min",');
content = content.replace(/"duration": "12 min",\s*"workSeconds": 480,\s*"restSeconds": 0,/g, '"duration": "12 min",');
content = content.replace(/"duration": "15 min",\s*"workSeconds": 480,\s*"restSeconds": 0,/g, '"duration": "15 min",');

// Apply fresh Technical replacements
content = content.replace(/"name": "Dynamic Warm-Up",\s*"duration": "8 min",/g, '"name": "Dynamic Warm-Up",\n          "duration": "8 min",\n          "workSeconds": 480,\n          "restSeconds": 0,');
content = content.replace(/"name": "Footwork Patterns",\s*"duration": "12 min",/g, '"name": "Footwork Patterns",\n          "duration": "12 min",\n          "workSeconds": 720,\n          "restSeconds": 0,');
content = content.replace(/"name": "Punch Mechanics Shadowboxing",\s*"duration": "15 min",\s*"workSeconds": 60,\s*"restSeconds": 30,/g, '"name": "Punch Mechanics Shadowboxing",\n          "duration": "15 min",\n          "workSeconds": 900,\n          "restSeconds": 0,');
content = content.replace(/"name": "Combination Drilling",\s*"duration": "10 min \(2×5 min rounds\)",/g, '"name": "Combination Drilling",\n          "duration": "10 min (2x5 min rounds)",\n          "workSeconds": 600,\n          "restSeconds": 0,');
content = content.replace(/"name": "Defense & Head Movement",\s*"duration": "8 min",/g, '"name": "Defense & Head Movement",\n          "duration": "8 min",\n          "workSeconds": 480,\n          "restSeconds": 0,');
content = content.replace(/"name": "Cool Down & Mobility",\s*"duration": "7 min",/g, '"name": "Cool Down & Mobility",\n          "duration": "7 min",\n          "workSeconds": 420,\n          "restSeconds": 0,');

// Note: Combination Drilling has "10 min (2×5 min rounds)". In regex, matching unicode × is tricky. Let's just fix it.
content = content.replace(/"duration": "10 min \(2×5 min rounds\)",/g, '"duration": "10 min (2×5 min rounds)",\n          "workSeconds": 600,\n          "restSeconds": 0,');

fs.writeFileSync('data.js', content);
