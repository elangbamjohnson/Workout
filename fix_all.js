const fs = require('fs');

let data = fs.readFileSync('data.js', 'utf8');

// For bag days (day 2 and 5), any "setsReps": "3 min" should have workSeconds: 180 and restSeconds: 60 (except the last exercise of the day).
// It's much easier to just do regex that catches all of them.

data = data.replace(/"workSeconds":\s*60,/g, '"workSeconds": 60,'); // dummy

// Let's just find and replace every single one using a replacer function
data = data.replace(/(\{\s*"name":\s*"[^"]+",\s*"setsReps":\s*"(\d+)\s*min",\s*"intensity":\s*"[^"]+",\s*)"workSeconds":\s*60,/g, (match, prefix, mins) => {
    let workSec = parseInt(mins) * 60;
    return `${prefix}"workSeconds": ${workSec},\n          "restSeconds": 60,`;
});

// Now we need to fix the LAST exercises of day 2 and day 5 to have restSeconds: 0
data = data.replace(/"name": "Power Endurance Finisher",([\s\S]*?)"restSeconds": 60,/g, '"name": "Power Endurance Finisher",$1"restSeconds": 0,');
data = data.replace(/"name": "Cool-Down Shadowboxing",([\s\S]*?)"restSeconds": 60,/g, '"name": "Cool-Down Shadowboxing",$1"restSeconds": 0,');


// Fix Technical Day (Day 3) remaining sections
// Technical combos on bag or pads
data = data.replace(/"name": "Punch Mechanics Shadowboxing",\s*"duration": "15 min",\s*"workSeconds": 60,\s*"restSeconds": 30,/g, '"name": "Punch Mechanics Shadowboxing",\n          "duration": "15 min",\n          "workSeconds": 900,\n          "restSeconds": 0,');

// Combination Drilling has an alternate spelling maybe?
data = data.replace(/"name": "Combination Drilling",\s*"duration": "10 min[^\"]*",/g, '"name": "Combination Drilling",\n          "duration": "10 min (2x5 min rounds)",\n          "workSeconds": 600,\n          "restSeconds": 0,');

fs.writeFileSync('data.js', data);
