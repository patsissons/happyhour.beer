import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set viewport to OpenGraph image dimensions (1200x630)
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2, // For retina quality
  });

  // Load the HTML file
  const htmlPath = path.resolve(__dirname, '../static/images/og-image.html');
  await page.goto(`file://${htmlPath}`);

  // Wait for the content to be rendered
  await page.waitForSelector('.container');

  // Take a screenshot
  const screenshotPath = path.resolve(__dirname, '../static/images/og-image.jpg');
  await page.screenshot({
    path: screenshotPath,
    type: 'jpeg',
    quality: 90,
  });

  console.log(`OG image generated at: ${screenshotPath}`);

  await browser.close();
}

generateOGImage().catch(console.error);
