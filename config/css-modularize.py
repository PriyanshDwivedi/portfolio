#!/usr/bin/env python3
"""
CSS Modularization Tool
Intelligently splits style.css into modular components
"""

import re
import os

# Read the current style.css
with open('style.css', 'r') as f:
    css_content = f.read()

# Define CSS section patterns and their target files
sections = {
    # Components
    'navbar.css': r'(/\* ── Navbar ──.*?)((?=/\*|$))',
    'buttons.css': r'(\.btn\s*\{.*?(?=\n\.[a-z]|\n/\*|$))',
    'hero.css': r'(/\* ── HERO ──.*?)((?=/\* ── Skills|$))',
    'footer.css': r'(/\* ── Footer ──.*?)((?=/\*|$))',
    'cards.css': r'(\.skill-category.*?\.domain-card.*?\.cert-card.*?)((?=/\*|$))',
    'tilted-cards.css': r'(/\* ── Tilted Card ──.*?)((?=/\* ── Reveal|$))',
    
    # Sections
    'skills.css': r'(/\* ── Skills ──.*?)((?=/\* ── Experience|$))',
    'experience.css': r'(/\* ── Experience ──.*?)((?=/\* ── Domains|$))',
    'domains.css': r'(/\* ── Domains ──.*?)((?=/\* ── Certs|$))',
    'certifications.css': r'(/\* ── Certs ──.*?)((?=/\* ── Contact|$))',
    'contact.css': r'(/\* ── Contact ──.*?)((?=/\* ── Footer|$))',
    'projects.css': r'(/\* ── Projects ──.*?)((?=/\* ── Tilted Card|$))',
    
    # Utilities
    'animations.css': r'(/\* ── Reveal ──.*?)((?=/\* ── Responsive|$))',
    'responsive.css': r'(/\* ── Responsive ──.*?)$',
}

print("🔧 CSS Modularization Tool")
print("=" * 50)

for filename, pattern in sections.items():
    match = re.search(pattern, css_content, re.DOTALL)
    if match:
        content = match.group(0)
        # Determine directory
        if filename in ['skills.css', 'experience.css', 'domains.css', 'certifications.css', 'contact.css', 'projects.css']:
            filepath = f'css/sections/{filename}'
        elif filename in ['animations.css', 'responsive.css']:
            filepath = f'css/utilities/{filename}'
        else:
            filepath = f'css/components/{filename}'
        
        # Write file
        with open(filepath, 'w') as f:
            f.write(f"/**\n * {filename.replace('.css', '').title()}\n * Auto-generated from style.css\n */\n\n")
            f.write(content)
print(f"✓ Created {filename}")
        
print("\n✅ CSS modularization complete!")
print("Next: Run 'python3 css-modularize.py' to generate all CSS modules")
