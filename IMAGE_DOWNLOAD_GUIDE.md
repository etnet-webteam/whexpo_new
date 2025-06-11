# 2025 Minisite Images Download Guide

Based on the 2024 Health Partnership Awards website structure at [https://whexpo.etnet.com.hk/](https://whexpo.etnet.com.hk/), you'll need to manually download the following images and organize them in the specified directories.

## Directory Structure Created
```
public/images/2025/
├── logos/          # Brand and organization logos
├── awards/         # Award category images
├── backgrounds/    # Background images and patterns  
├── social/         # Social media icons
└── sponsors/       # Supporting organization logos
```

## Images to Download from 2024 Site

### 1. Main Logos (`public/images/2025/logos/`)
- **Main event logo** - Health Partnership Awards 2025
- **etnet logo** - Main organizer
- **Event theme graphics** - "Healthy Assets Extraordinary Wealth" themed images

### 2. Award Category Images (`public/images/2025/awards/`)
Based on the categories mentioned:
- Beauty & Fitness
- Health & Personal Care Product  
- Health Food & Supplement
- Health Innovation
- Health Protection & Planning
- Healthy Community Partnership
- Healthy Entrepreneurship
- Hospital Service
- Marketing Campaign
- Medical & Professional Service
- Sustainable Corporate Social Responsibility
- Wellness & Therapeutic

### 3. Background Images (`public/images/2025/backgrounds/`)
- **Hero section background**
- **Section dividers/patterns**
- **Page backgrounds**
- **Decorative elements**

### 4. Social Media Icons (`public/images/2025/social/`)
- Facebook icon
- LinkedIn icon  
- WhatsApp icon
- Any other social platform icons used

### 5. Supporting Organization Logos (`public/images/2025/sponsors/`)
- **數碼港 Cyberport**
- **香港零售科技商會 RITA** 
- **智慧城市聯盟 SCC**
- **香港心理衛生會 The Mental Health Association of Hong Kong**

## How to Download

### Method 1: Browser Developer Tools
1. Right-click on any image → "Inspect Element"
2. Find the `<img>` tag in the HTML
3. Right-click the image URL → "Open in new tab"
4. Save the image with appropriate naming

### Method 2: Page Source
1. View page source (Ctrl+U / Cmd+Option+U)
2. Search for image URLs (look for .jpg, .png, .svg)
3. Copy URLs and download directly

### Method 3: Network Tab
1. Open Developer Tools → Network tab
2. Filter by "Images"
3. Refresh the page to see all loaded images
4. Right-click any image → "Save as"

## Naming Convention
Use descriptive, consistent names:
```
logos/
├── etnet-logo.png
├── health-awards-2025-logo.png
└── event-theme-logo.png

awards/
├── beauty-fitness.jpg
├── health-innovation.jpg
└── wellness-therapeutic.jpg

backgrounds/
├── hero-background.jpg
├── section-pattern.png
└── page-background.jpg

social/
├── facebook-icon.svg
├── linkedin-icon.svg  
└── whatsapp-icon.svg

sponsors/
├── cyberport-logo.png
├── rita-logo.png
├── scc-logo.png
└── mental-health-hk-logo.png
```

## Integration Steps

After downloading the images:

1. **Update CSS references** in `minisite.css`:
   ```css
   .whexpo-2025-bg {
     background-image: url('/images/2025/backgrounds/hero-background.jpg');
   }
   ```

2. **Update component imports** in React components:
   ```tsx
   <img src="/images/2025/logos/etnet-logo.png" alt="etnet" />
   ```

3. **Optimize images** before using:
   - Compress for web performance
   - Use appropriate formats (WebP when possible)
   - Create responsive sizes if needed

## Notes
- All images should be web-optimized (compressed)
- Consider creating 2x versions for high-DPI displays
- Ensure proper alt text for accessibility
- Check image licensing/usage rights before using

## Current Images Found
You already have these images in the directory:
- `background.jpg` - Main background image
- `etnet-logo.png` - etnet organization logo  
- `logo.png` - General logo
- `hero-bg.jpg` - Hero section background 