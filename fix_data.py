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
        return f'"name": "{name}",' + match.group(2) + f'"restSeconds": {day1_rests[name]}'
    if name in day4_rests:
        return f'"name": "{name}",' + match.group(2) + f'"restSeconds": {day4_rests[name]}'
    return match.group(0)

content = re.sub(r'"name":\s*"([^"]+)",(.*?)("restSeconds":\s*105)', replace_rest, content, flags=re.DOTALL)


# PART 2: Bag days (2, 5)
def bag_fix(match):
    full_block = match.group(0)
    # Extract setsReps
    m_sr = re.search(r'"setsReps":\s*"(\d+)\s*min"', full_block)
    if not m_sr:
        return full_block
        
    mins = int(m_sr.group(1))
    work_sec = mins * 60
    
    # Check if this is the last exercise of the day?
    # We can handle restSeconds manually since there are only a few.
    return full_block

# Actually, I can just do a line-by-line processor in python
with open('data.js', 'r') as f:
    lines = f.readlines()

new_lines = []
in_day = None
current_exercise = None
exercises_in_day = []

# First pass to find last exercise of Day 2 and Day 5
for line in lines:
    m_day = re.search(r'"id":\s*(\d)', line)
    if m_day and 'day' not in line:
        in_day = int(m_day.group(1))
    m_ex = re.search(r'"id":\s*"(day\d-ex\d+)"', line)
    if m_ex:
        exercises_in_day.append((in_day, m_ex.group(1)))

day2_last = [ex for d, ex in exercises_in_day if d == 2][-1]
day5_last = [ex for d, ex in exercises_in_day if d == 5][-1]

in_day = None
ex_name = None
ex_id = None
ex_work_sec = None

for line in lines:
    m_day = re.search(r'"id":\s*(\d),', line)
    if m_day:
        in_day = int(m_day.group(1))
        
    m_name = re.search(r'"name":\s*"([^"]+)"', line)
    if m_name:
        ex_name = m_name.group(1)
        
    m_id = re.search(r'"id":\s*"(day\d-ex\d+)"', line)
    if m_id:
        ex_id = m_id.group(1)
        if in_day in [2, 5] and ex_work_sec:
            # We already passed workSeconds, meaning we missed injecting restSeconds.
            # But workSeconds comes BEFORE id in the file!
            pass
            
    m_sets = re.search(r'"setsReps":\s*"(\d+)\s*min"', line)
    if in_day in [2, 5] and m_sets:
        ex_work_sec = int(m_sets.group(1)) * 60
        
    m_work = re.search(r'"workSeconds":\s*60', line)
    if in_day in [2, 5] and m_work and ex_work_sec:
        # replace workSeconds and ADD restSeconds
        # But wait, how do we know if it's the last exercise? We haven't seen the ID yet.
        pass

# OK, better to use regex on the whole block.
