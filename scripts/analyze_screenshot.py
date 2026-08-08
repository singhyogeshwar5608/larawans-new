#!/usr/bin/env python3
"""Analyze the screenshot to find the actual colors."""
from PIL import Image

img = Image.open("/tmp/hero-debug.png")
print(f"Size: {img.size}")
print(f"Mode: {img.mode}")

# Sample pixels at different points
w, h = img.size
points = [
    ("top-left", 50, 50),
    ("top-center", w//2, 50),
    ("center", w//2, h//2),
    ("center-100", w//2, h//2 - 100),
    ("center+100", w//2, h//2 + 100),
    ("left-middle", 100, h//2),
    ("right-middle", w-100, h//2),
    ("bottom-center", w//2, h-100),
    ("quarter", w//4, h//4),
    ("three-quarter", 3*w//4, 3*h//4),
]
print("\nPixel colors at key points:")
for name, x, y in points:
    pixel = img.getpixel((x, y))
    print(f"  {name:20s} ({x:4d}, {y:4d}): {pixel}")

# Count colors
colors = img.getcolors(maxcolors=1000000)
if colors:
    colors.sort(reverse=True)
    print("\nTop 10 most common colors (count, RGB):")
    for count, color in colors[:10]:
        print(f"  {count:7d}: {color}")
