import requests
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Multiple image URLs for each destination
destinations = {
    'zanzibar': [
        'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',  # Beach view
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',  # Traditional boat
        'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',  # Beach sunset
        'https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg'   # Crystal clear water
    ],
    'serengeti': [
        'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg',  # Lions
        'https://images.pexels.com/photos/4577801/pexels-photo-4577801.jpeg',  # Elephants
        'https://images.pexels.com/photos/4577784/pexels-photo-4577784.jpeg',  # Zebras
        'https://images.pexels.com/photos/4577770/pexels-photo-4577770.jpeg'   # Sunset landscape
    ],
    'victoria-falls': [
        'https://images.pexels.com/photos/164025/pexels-photo-164025.jpeg',  # Aerial view of Victoria Falls
        'https://images.pexels.com/photos/51947/victoria-falls-zimbabwe-africa-waterfall-51947.jpeg',  # Main falls with rainbow
        'https://images.pexels.com/photos/259554/pexels-photo-259554.jpeg',  # Zambezi River view
        'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg'  # Sunset over Victoria Falls
    ],
    'cape-town': [
        'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg',  # Table Mountain
        'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg',  # Waterfront
        'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg',  # Beach view
        'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg'   # City lights
    ],
    'hero-bg': [
        'https://images.pexels.com/photos/4577793/pexels-photo-4577793.jpeg',  # African sunset
        'https://images.pexels.com/photos/4577794/pexels-photo-4577794.jpeg',  # Safari landscape
        'https://images.pexels.com/photos/4577795/pexels-photo-4577795.jpeg',  # Wildlife
        'https://images.pexels.com/photos/4577796/pexels-photo-4577796.jpeg'   # Savanna
    ]
}

def download_image(url, filename, index):
    try:
        print(f'Downloading {filename}_{index}.jpg...')
        response = requests.get(url)
        if response.status_code == 200:
            with open(f'images/{filename}_{index}.jpg', 'wb') as f:
                f.write(response.content)
            print(f'Successfully downloaded {filename}_{index}.jpg')
            return True
        
        print(f'Failed to download {filename}_{index}.jpg')
        return False
    
    except Exception as e:
        print(f'Error downloading {filename}_{index}.jpg: {str(e)}')
        return False

# Download multiple images for each destination
for dest_key, urls in destinations.items():
    for index, url in enumerate(urls, 1):
        download_image(url, dest_key, index) 