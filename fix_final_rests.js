const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

// Day 1
data = data.replace(/"name": "Barbell deadlift",([\s\S]*?)"restSeconds": 150/g, '"name": "Barbell deadlift",$1"restSeconds": 120');
data = data.replace(/"name": "Squat jumps",([\s\S]*?)"restSeconds": 105/g, '"name": "Squat jumps",$1"restSeconds": 90');
data = data.replace(/"name": "Broad jumps",([\s\S]*?)"restSeconds": 105/g, '"name": "Broad jumps",$1"restSeconds": 90');

// Day 4
data = data.replace(/"name": "Plyometric push-ups \(floor, or rings for added instability\)",([\s\S]*?)"restSeconds": 105/g, '"name": "Plyometric push-ups (floor, or rings for added instability)",$1"restSeconds": 90');
data = data.replace(/"name": "Explosive DB floor press",([\s\S]*?)"restSeconds": 120/g, '"name": "Explosive DB floor press",$1"restSeconds": 90');
data = data.replace(/"name": "Ring rows \(explosive pull\)",([\s\S]*?)"restSeconds": 105/g, '"name": "Ring rows (explosive pull)",$1"restSeconds": 90');
data = data.replace(/"name": "Dumbbell woodchoppers \(explosive\)",([\s\S]*?)"restSeconds": 90/g, '"name": "Dumbbell woodchoppers (explosive)",$1"restSeconds": 75');
data = data.replace(/"name": "Hanging leg raises \(power stand\)",([\s\S]*?)"restSeconds": 75/g, '"name": "Hanging leg raises (power stand)",$1"restSeconds": 60');

fs.writeFileSync('data.js', data);
