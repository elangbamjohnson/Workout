import json
import re

with open('/Users/johnsonelangbam/Projects/Workout-Plan/data.js', 'r') as f:
    content = f.read()

json_start = content.find('{')
json_end = content.rfind('}') + 1
data = json.loads(content[json_start:json_end])

day3 = next(d for d in data['days'] if d['id'] == 3)
original_section3 = day3['sections'][2]

day3['description'] = "Shadowboxing, footwork, and technique drills to refine punch mechanics and movement."
day3['callout'] = "Today is about quality of movement, not intensity. Work at 50–70% speed — fast enough to feel the mechanics, slow enough to correct errors in real time. Film yourself if possible. Use a mirror. You are programming motor patterns today."

sec1 = {
    "name": "Dynamic Warm-Up",
    "duration": "8 min",
    "detail": "Prepare joints and activate the movement patterns you will be training.",
    "cue": "Do not rush this. Cold joints and tight hip flexors are the #1 cause of mechanical breakdown in the first round.",
    "id": "day3-sec1",
    "rounds": [
        { "id": "day3-sec1-r1", "combo": "Leg swings (front-back, lateral) — 15 each direction, each leg" },
        { "id": "day3-sec1-r2", "combo": "Hip circles — 10 each direction" },
        { "id": "day3-sec1-r3", "combo": "Shoulder circles — 10 each direction" },
        { "id": "day3-sec1-r4", "combo": "Neck rolls — 5 each direction, slow" },
        { "id": "day3-sec1-r5", "combo": "Squat to stand — 10 reps, pause at bottom" },
        { "id": "day3-sec1-r6", "combo": "Lateral lunge to hip flexor stretch — 5 each side" }
    ]
}

sec2 = {
    "name": "Footwork Patterns",
    "duration": "12 min",
    "detail": "Boxing footwork is the foundation of power — you cannot punch hard from bad position.",
    "cue": "Stay on the balls of your feet. Heels should barely touch the floor. Move like you are standing on hot coals — light and ready.",
    "id": "day3-sec2",
    "rounds": [
        { "id": "day3-sec2-r1", "combo": "Box step pattern — forward, back, lateral × 5 min" },
        { "id": "day3-sec2-r2", "combo": "Pivot drills — lead foot pivot (hook position) × 3 min" },
        { "id": "day3-sec2-r3", "combo": "Angle exits — step off-line after jab, after cross × 4 min" }
    ]
}

sec4 = {
    "name": "Combination Drilling",
    "duration": "10 min (2×5 min rounds)",
    "detail": "Link the mechanics from the previous section into combinations.",
    "cue": "Each combination should feel smooth — not mechanical or choppy. If a transition feels awkward, slow down and isolate that transition.",
    "id": "day3-sec4",
    "rounds": [
        { "id": "day3-sec4-r1", "combo": "Round 1 — 1-2 only: Jab-Cross at 60% speed, focus on transition between the two" },
        { "id": "day3-sec4-r2", "combo": "Round 2 — 1-2-3: Add the hook, feel the hip pivot sequence" }
    ]
}

sec5 = {
    "name": "Defense & Head Movement",
    "duration": "8 min",
    "detail": "Slips, rolls, and parries integrated with offense.",
    "cue": "Defense creates offense. Every defensive movement should end in a position to counter. Do not just evade — evade and return.",
    "id": "day3-sec5",
    "rounds": [
        { "id": "day3-sec5-r1", "combo": "Slip jab, return cross — 3 min" },
        { "id": "day3-sec5-r2", "combo": "Roll under hook, return hook — 3 min" },
        { "id": "day3-sec5-r3", "combo": "Parry cross, jab return — 2 min" }
    ]
}

sec6 = {
    "name": "Cool Down & Mobility",
    "duration": "7 min",
    "detail": "Restore range of motion and lower the nervous system.",
    "cue": "Do not skip this. Hip flexor and shoulder mobility directly affect punch mechanics. Athletes who skip cool-downs develop compensatory patterns.",
    "id": "day3-sec6",
    "rounds": [
        { "id": "day3-sec6-r1", "combo": "Pigeon pose — 60 sec each side" },
        { "id": "day3-sec6-r2", "combo": "Hip flexor stretch (kneeling) — 45 sec each side" },
        { "id": "day3-sec6-r3", "combo": "Chest opener — 60 sec (arms back, open chest)" },
        { "id": "day3-sec6-r4", "combo": "Wrist and forearm stretch — 30 sec each direction" },
        { "id": "day3-sec6-r5", "combo": "Slow neck rolls — 5 each direction" }
    ]
}

day3['sections'] = [sec1, sec2, original_section3, sec4, sec5, sec6]

new_content = 'const workoutData = ' + json.dumps(data, indent=2) + ';\n'
with open('/Users/johnsonelangbam/Projects/Workout-Plan/data.js', 'w') as f:
    f.write(new_content)

print("Updated data.js")
