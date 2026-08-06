import re

with open('data.js', 'r') as f:
    content = f.read()

# PART 1: Strength Days Rest Times
day1_rests = {
    'Barbell deadlift': 150,
    'Kettlebell swings': 105,
    'Squat jumps': 105,
    'Bulgarian split squat': 105,
    'Lateral bounds (skater jumps)': 90,
    'Broad jumps': 105,
    'Med ball rotational throws (wall or hard floor)': 90,
    'Barbell landmine rotations': 90,
    'Core: Russian twists (med ball)': 60
}

day4_rests = {
    'Plyometric push-ups (floor, or rings for added instability)': 105,
    'Explosive DB floor press': 120,
    'Ring rows (explosive pull)': 105,
    'Med ball chest pass throws (wall)': 90,
    'Barbell landmine anti-rotation press': 90,
    'Single-arm kettlebell swings': 105,
    'Dumbbell woodchoppers (explosive)': 90,
    'Hanging leg raises (power stand)': 75
}

def replace_rest(match):
    name = match.group(1)
    if name in day1_rests:
        return f'"name": "{name}",{match.group(2)}"restSeconds": {day1_rests[name]}'
    if name in day4_rests:
        return f'"name": "{name}",{match.group(2)}"restSeconds": {day4_rests[name]}'
    return match.group(0)

content = re.sub(r'"name":\s*"([^"]+)",(.*?)("restSeconds":\s*105)', replace_rest, content, flags=re.DOTALL)


# PART 2: Bag days (2, 5)
def fix_bag(match):
    block = match.group(0)
    
    # We find setsReps
    sr = re.search(r'"setsReps":\s*"(\d+)\s*min"', block)
    if not sr: return block
    work_sec = int(sr.group(1)) * 60
    
    # Check if it's the last exercise of the day
    # Day 2 last: day2-ex6
    # Day 5 last: day5-ex7
    is_last = ('"id": "day2-ex6"' in block) or ('"id": "day5-ex7"' in block)
    rest_sec = 0 if is_last else 60
    
    # Replace workSeconds: 60 with workSeconds: X, \n restSeconds: Y
    # Match the indentation of workSeconds
    block = re.sub(
        r'(\s*)"workSeconds":\s*60,',
        rf'\1"workSeconds": {work_sec},\1"restSeconds": {rest_sec},',
        block
    )
    return block

# Find all blocks that look like Bag day exercises (have setsReps: "X min" and workSeconds: 60)
# We can just run it on the whole file, matching { ... "setsReps": "\d+ min" ... "workSeconds": 60 ... "id": "day..." }
content = re.sub(r'\{\s*"name":\s*"[^"]+",\s*"setsReps":\s*"\d+\s*min".*?"id":\s*"day[25]-ex\d+"\s*\}', fix_bag, content, flags=re.DOTALL)


# PART 3: Technical day (Day 3)
# "Dynamic Warm-Up": 8 min -> 480s
# "Footwork Patterns": 12 min -> 720s
# "Technical combos on bag or pads": 15 min -> 900s
# "Combination Drilling": 10 min (2x5 min rounds) -> 600s
# "Defense & Head Movement": 8 min -> 480s
# "Cool Down & Mobility": 7 min -> 420s
tech_durations = {
    'Dynamic Warm-Up': 480,
    'Footwork Patterns': 720,
    'Punch Mechanics Shadowboxing': 900, # renamed from Technical combos
    'Combination Drilling': 600,
    'Defense & Head Movement': 480,
    'Cool Down & Mobility': 420
}

# The technical sections are like:
# {
#   "name": "Dynamic Warm-Up",
#   "duration": "8 min",
#   ...
#   "id": "day3-sec1"
# }
# Some have workSeconds: 60, restSeconds: 30 already. We need to REPLACE them or ADD them.

def fix_tech(match):
    name = match.group(1)
    if name not in tech_durations:
        return match.group(0)
        
    block = match.group(0)
    work_sec = tech_durations[name]
    
    # Remove existing workSeconds / restSeconds if any
    block = re.sub(r'\s*"workSeconds":\s*\d+,?', '', block)
    block = re.sub(r'\s*"restSeconds":\s*\d+,?', '', block)
    
    # Add new workSeconds and restSeconds right after "duration"
    block = re.sub(
        r'(\s*)"duration":\s*"([^"]+)",',
        rf'\1"duration": "\2",\1"workSeconds": {work_sec},\1"restSeconds": 0,',
        block
    )
    return block

content = re.sub(r'\{\s*"name":\s*"([^"]+)",\s*"duration":\s*"[^"]+".*?"id":\s*"day3-sec\d+"\s*\}', fix_tech, content, flags=re.DOTALL)

with open('data.js', 'w') as f:
    f.write(content)

