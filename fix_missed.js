const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

// The rest of Day 2 & Day 5
data = data.replace(/"name": "Jab Power Development",([\s\S]*?)"workSeconds": 60,/g, '"name": "Jab Power Development",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Power Endurance Finisher",([\s\S]*?)"workSeconds": 60,/g, '"name": "Power Endurance Finisher",$1"workSeconds": 180,\n          "restSeconds": 0,');

data = data.replace(/"name": "Warm-Up Combinations",([\s\S]*?)"workSeconds": 60,/g, '"name": "Warm-Up Combinations",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Power Singles",([\s\S]*?)"workSeconds": 60,/g, '"name": "Power Singles",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Body Work",([\s\S]*?)"workSeconds": 60,/g, '"name": "Body Work",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Pressure Round",([\s\S]*?)"workSeconds": 60,/g, '"name": "Pressure Round",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Power Endurance Test",([\s\S]*?)"workSeconds": 60,/g, '"name": "Power Endurance Test",$1"workSeconds": 180,\n          "restSeconds": 60,');
data = data.replace(/"name": "Cool-Down Shadowboxing",([\s\S]*?)"workSeconds": 60,/g, '"name": "Cool-Down Shadowboxing",$1"workSeconds": 120,\n          "restSeconds": 0,');

// Fix Day 3 section 3 which might be named "Technical combos on bag or pads"
data = data.replace(/"name": "Technical combos on bag or pads",\s*"duration": "15 min",/g, '"name": "Technical combos on bag or pads",\n          "duration": "15 min",\n          "workSeconds": 900,\n          "restSeconds": 0,');

fs.writeFileSync('data.js', data);
