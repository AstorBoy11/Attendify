import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceIcon = path.join(__dirname, '..', 'app', 'icon.png');
const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
    console.log('Generating PWA icons...');

    for (const size of sizes) {
        const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
        await sharp(sourceIcon)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        console.log(`Generated: icon-${size}x${size}.png`);
    }

    // Generate Apple Touch Icon (180x180)
    const appleTouchIconPath = path.join(iconsDir, 'apple-touch-icon.png');
    await sharp(sourceIcon)
        .resize(180, 180)
        .png()
        .toFile(appleTouchIconPath);
    console.log('Generated: apple-touch-icon.png');

    // Generate maskable icon (512x512 with padding for safe area)
    const maskableIconPath = path.join(iconsDir, 'maskable-icon-512x512.png');
    const maskableSize = 512;
    const padding = Math.round(maskableSize * 0.1); // 10% padding
    const innerSize = maskableSize - (padding * 2);

    await sharp(sourceIcon)
        .resize(innerSize, innerSize)
        .extend({
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
            background: { r: 30, g: 35, b: 48, alpha: 1 } // Dark navy matching the icon background
        })
        .png()
        .toFile(maskableIconPath);
    console.log('Generated: maskable-icon-512x512.png');

    console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
