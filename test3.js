const fs = require('fs');
eval(fs.readFileSync('timer.js', 'utf8'));
console.log(typeof window !== 'undefined' ? window.Timer : typeof Timer);
