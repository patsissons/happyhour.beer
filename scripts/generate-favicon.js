import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set viewport to favicon dimensions (32x32)
  await page.setViewport({
    width: 32,
    height: 32,
    deviceScaleFactor: 2, // For retina quality
  });

  // Load the HTML file
  const htmlPath = path.resolve(__dirname, '../static/favicon.html');
  await page.goto(`file://${htmlPath}`);

  // Wait for the content to be rendered
  await page.waitForSelector('.emoji');

  // Take a screenshot
  const screenshotPath = path.resolve(__dirname, '../static/favicon.png');
  await page.screenshot({
    path: screenshotPath,
    type: 'png',
    omitBackground: true, // For transparent background
  });

  console.log(`Favicon generated at: ${screenshotPath}`);

  await browser.close();
}

generateFavicon().catch(console.error);
