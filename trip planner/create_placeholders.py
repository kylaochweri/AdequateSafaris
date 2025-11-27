from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Dictionary of destination colors and text
destinations = {
    'zanzibar': ('#4ECDC4', 'Zanzibar'),
    'serengeti': ('#FFB75E', 'Serengeti'),
    'victoria-falls': ('#1BA39C', 'Victoria Falls'),
    'cape-town': ('#4B77BE', 'Cape Town'),
    'hero-bg': ('#2C3E50', 'African Safari')
}

# Create placeholder images
for name, (color, text) in destinations.items():
    print(f'Creating {name}.jpg...')
    
    # Create a new image with a colored background
    img = Image.new('RGB', (800, 600), color)
    draw = ImageDraw.Draw(img)
    
    # Add text
    text_width = draw.textlength(text, font=None)
    text_x = (800 - text_width) / 2
    text_y = (600 - 20) / 2
    draw.text((text_x, text_y), text, fill='white')
    
    # Save the image
    img.save(f'images/{name}.jpg', 'JPEG')
    print(f'Successfully created {name}.jpg') 