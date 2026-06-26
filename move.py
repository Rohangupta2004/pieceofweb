import sys

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

booking_start = -1
booking_end = -1

for i, line in enumerate(lines):
    if '<section class="booking section" id="booking">' in line:
        booking_start = i
    if '</section>' in line and booking_start != -1 and booking_end == -1 and i > booking_start:
        booking_end = i

if booking_start != -1 and booking_end != -1:
    booking_lines = lines[booking_start:booking_end+1]
    
    # Remove booking section from original location
    del lines[booking_start:booking_end+1]
    
    # Find about section start
    about_start = -1
    for i, line in enumerate(lines):
        if '<section class="about section" id="about">' in line:
            about_start = i
            break
            
    if about_start != -1:
        # Insert booking lines before about section
        # add a newline for separation
        lines = lines[:about_start] + booking_lines + ['\n'] + lines[about_start:]
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print("Success")
    else:
        print("About section not found")
else:
    print("Booking section not found")
