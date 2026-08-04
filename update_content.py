import json

# Read data.js
with open('/Users/johnsonelangbam/Projects/Workout-Plan/data.js', 'r') as f:
    content = f.read()

json_start = content.find('{')
json_end = content.rfind('}') + 1
data = json.loads(content[json_start:json_end])

day2_exercises = [
    {
        "id": "day2-ex1",
        "name": "Jab Power Development",
        "setsReps": "3 min",
        "intensity": "Build — 60% → 80%",
        "workSeconds": 60,
        "benefits": "The jab is your range finder AND a weapon. Drive from the rear foot through the hip. Your shoulder should nearly touch your chin at full extension.",
        "rounds": [
            { "id": "day2-ex1-r1", "combo": "10x Power Jabs — full hip rotation, not just arm" },
            { "id": "day2-ex1-r2", "combo": "5x Jab-Cross — pause between each, reset stance fully" },
            { "id": "day2-ex1-r3", "combo": "10x Jab with Lead Hip Drive — focus on pushing off the rear foot to lead hip" },
            { "id": "day2-ex1-r4", "combo": "Repeat 2x through the sequence" }
        ]
    },
    {
        "id": "day2-ex2",
        "name": "Cross Power",
        "setsReps": "3 min",
        "intensity": "85-95%",
        "workSeconds": 60,
        "benefits": "The cross is your power weapon. Hip rotation leads — your shoulder follows your hip, not the other way. You should feel this in your glute and hip, not just your shoulder.",
        "rounds": [
            { "id": "day2-ex2-r1", "combo": "10x Standing Crosses — no jab, full hip and shoulder rotation" },
            { "id": "day2-ex2-r2", "combo": "5x Cross with Rear Foot Push — consciously push the floor away with the rear foot" },
            { "id": "day2-ex2-r3", "combo": "8x Jab-Cross — both punches at 90%+ power" },
            { "id": "day2-ex2-r4", "combo": "Repeat 2x through the sequence" }
        ]
    },
    {
        "id": "day2-ex3",
        "name": "Lead Hook Power",
        "setsReps": "3 min",
        "intensity": "85-95%",
        "workSeconds": 60,
        "benefits": "The hook generates power through hip pivot, not shoulder swing. Lead foot pivots inward as you throw. Your bodyweight transfers to the lead foot. Feel the hip snap.",
        "rounds": [
            { "id": "day2-ex3-r1", "combo": "10x Lead Hooks — horizontal elbow path, pivot on lead foot" },
            { "id": "day2-ex3-r2", "combo": "5x Jab-Cross-Hook — power on the hook" },
            { "id": "day2-ex3-r3", "combo": "8x Hook with Hip Pivot — exaggerate the lead foot pivot" },
            { "id": "day2-ex3-r4", "combo": "Repeat 2x through the sequence" }
        ]
    },
    {
        "id": "day2-ex4",
        "name": "Rear Body Hook + Uppercut",
        "setsReps": "3 min",
        "intensity": "85-90%",
        "workSeconds": 60,
        "benefits": "Uppercuts are leg-driven. Bend your knees slightly, then drive upward through the punch. The power comes from leg extension, not shoulder elevation.",
        "rounds": [
            { "id": "day2-ex4-r1", "combo": "10x Rear Uppercuts — drive up from the legs, not just the arm" },
            { "id": "day2-ex4-r2", "combo": "8x Rear Body Hook to Rear Uppercut — body then head" },
            { "id": "day2-ex4-r3", "combo": "5x Full Combo: Jab-Cross-Lead Hook-Rear Uppercut" },
            { "id": "day2-ex4-r4", "combo": "Repeat 2x through the sequence" }
        ]
    },
    {
        "id": "day2-ex5",
        "name": "Power Combinations",
        "setsReps": "3 min",
        "intensity": "90-100%",
        "workSeconds": 60,
        "benefits": "Maintain power through the full combination. Most fighters lose power after the 3rd punch. Train to keep it through punch 6.",
        "rounds": [
            { "id": "day2-ex5-r1", "combo": "5x Jab-Cross-Lead Hook (1-2-3)" },
            { "id": "day2-ex5-r2", "combo": "5x Jab-Cross-Lead Hook-Rear Uppercut (1-2-3-4)" },
            { "id": "day2-ex5-r3", "combo": "3x Full 6-punch combo at maximum power" },
            { "id": "day2-ex5-r4", "combo": "Finish each combo — do not trail off at the end" }
        ]
    },
    {
        "id": "day2-ex6",
        "name": "Power Endurance Finisher",
        "setsReps": "3 min",
        "intensity": "100% on work intervals",
        "workSeconds": 60,
        "benefits": "This round tests power under fatigue. Your punch quality at the end of this round is your baseline — you will improve it over the program.",
        "rounds": [
            { "id": "day2-ex6-r1", "combo": "30 sec: Maximum effort — one punch per second, full power" },
            { "id": "day2-ex6-r2", "combo": "30 sec: Rest (hands up, move feet)" },
            { "id": "day2-ex6-r3", "combo": "30 sec: Power combinations of your choice" },
            { "id": "day2-ex6-r4", "combo": "30 sec: Rest" },
            { "id": "day2-ex6-r5", "combo": "60 sec: Final push — best combinations, full power" }
        ]
    }
]

day5_exercises = [
    {
        "id": "day5-ex1",
        "name": "Warm-Up Combinations",
        "setsReps": "3 min",
        "intensity": "70-80%",
        "workSeconds": 60,
        "benefits": "Do not start cold. This round prepares your joints and motor patterns for the power work ahead.",
        "rounds": [
            { "id": "day5-ex1-r1", "combo": "1-2 combinations at 70% — warm up the shoulders and hips" },
            { "id": "day5-ex1-r2", "combo": "Add the 3 (hook) at round midpoint" },
            { "id": "day5-ex1-r3", "combo": "Finish with 1-2-3-2 at 80%" }
        ]
    },
    {
        "id": "day5-ex2",
        "name": "Power Singles",
        "setsReps": "3 min",
        "intensity": "90-95%",
        "workSeconds": 60,
        "benefits": "Singles force you to commit fully to each punch. No combination rhythm to hide behind.",
        "rounds": [
            { "id": "day5-ex2-r1", "combo": "10x Power Jabs (one at a time, full reset)" },
            { "id": "day5-ex2-r2", "combo": "10x Power Crosses (one at a time, full reset)" },
            { "id": "day5-ex2-r3", "combo": "10x Power Hooks (lead, one at a time)" },
            { "id": "day5-ex2-r4", "combo": "Focus: maximum force on each individual punch" }
        ]
    },
    {
        "id": "day5-ex3",
        "name": "Body Work",
        "setsReps": "3 min",
        "intensity": "85-90%",
        "workSeconds": 60,
        "benefits": "Body shots require you to bend your knees and get your level down — do not just swing downward. Your punch trajectory should be horizontal to the body.",
        "rounds": [
            { "id": "day5-ex3-r1", "combo": "10x Lead Body Hook — dig into the body, not just tap it" },
            { "id": "day5-ex3-r2", "combo": "10x Rear Body Hook" },
            { "id": "day5-ex3-r3", "combo": "8x Jab-Rear Body Hook" },
            { "id": "day5-ex3-r4", "combo": "8x Lead Body Hook-Cross (come back up after the body shot)" }
        ]
    },
    {
        "id": "day5-ex4",
        "name": "Combination Power",
        "setsReps": "3 min",
        "intensity": "90%",
        "workSeconds": 60,
        "benefits": "Move your feet between combinations. Set up each combination from a new angle.",
        "rounds": [
            { "id": "day5-ex4-r1", "combo": "8x 1-2-3 at full power" },
            { "id": "day5-ex4-r2", "combo": "6x 1-2-3-2 at full power" },
            { "id": "day5-ex4-r3", "combo": "5x 1-2-body hook-2 at full power" },
            { "id": "day5-ex4-r4", "combo": "Move between combinations — do not stay planted" }
        ]
    },
    {
        "id": "day5-ex5",
        "name": "Pressure Round",
        "setsReps": "3 min",
        "intensity": "85%",
        "workSeconds": 60,
        "benefits": "This simulates a real fight round. Constant movement with intermittent power output. Your power maintenance under movement is tested here.",
        "rounds": [
            { "id": "day5-ex5-r1", "combo": "Constant movement — never stop moving your feet" },
            { "id": "day5-ex5-r2", "combo": "Throw combinations every 5-8 seconds" },
            { "id": "day5-ex5-r3", "combo": "No set pattern — improvise but maintain power" },
            { "id": "day5-ex5-r4", "combo": "Mix head and body targets" }
        ]
    },
    {
        "id": "day5-ex6",
        "name": "Power Endurance Test",
        "setsReps": "3 min",
        "intensity": "100% on work intervals",
        "workSeconds": 60,
        "benefits": "Note your power level in the final 45-second interval. Compare to Round 1 of Day 2. This gap is your power endurance deficit — it narrows over the program.",
        "rounds": [
            { "id": "day5-ex6-r1", "combo": "45 sec: Maximum output — hardest punches you can throw" },
            { "id": "day5-ex6-r2", "combo": "15 sec: Active rest (footwork only)" },
            { "id": "day5-ex6-r3", "combo": "45 sec: Maximum output" },
            { "id": "day5-ex6-r4", "combo": "15 sec: Active rest" },
            { "id": "day5-ex6-r5", "combo": "45 sec: Final maximum output" }
        ]
    },
    {
        "id": "day5-ex7",
        "name": "Cool-Down Shadowboxing",
        "setsReps": "2 min",
        "intensity": "40%",
        "workSeconds": 60,
        "benefits": "Do not end on the bag. Cool down with shadowboxing to begin the recovery process.",
        "rounds": [
            { "id": "day5-ex7-r1", "combo": "Light shadowboxing at 40% — no bag contact" },
            { "id": "day5-ex7-r2", "combo": "Focus on breath control and movement" },
            { "id": "day5-ex7-r3", "combo": "Shake out the hands and shoulders" }
        ]
    }
]

for d in data['days']:
    if d['id'] == 2:
        d['description'] = "Pure power application on the heavy bag — every punch thrown with maximum intent."
        d['callout'] = "This is not a cardio session. Every single punch must be thrown with maximum power intent. If you are not slightly winded after each combination, you are not punching hard enough. Quality over quantity — 6 rounds of focused power beats 12 rounds of casual work."
        d['exercises'] = day2_exercises
    elif d['id'] == 5:
        d['description'] = "Higher-volume bag work building power endurance — maintaining punch quality under accumulated fatigue."
        d['callout'] = "Today tests whether your power holds up as you fatigue. The goal is to maintain punch quality through more rounds than Day 2. If your combinations deteriorate significantly in round 5-6, you have found your current power endurance limit — that is the number to push next week."
        d['exercises'] = day5_exercises

new_content = 'const workoutData = ' + json.dumps(data, indent=2) + ';\n'
with open('/Users/johnsonelangbam/Projects/Workout-Plan/data.js', 'w') as f:
    f.write(new_content)

print("Updated data.js")
