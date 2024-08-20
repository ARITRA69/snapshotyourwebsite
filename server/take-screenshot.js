const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

require("dotenv").config();

puppeteer.use(StealthPlugin());

const normalizeUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.startsWith('www.')) {
      parsedUrl.hostname = 'www.' + parsedUrl.hostname;
    }
    return parsedUrl.toString();
  } catch (error) {
    return url; // Return original if parsing fails
  }
};

const takeScreenshot = async (req, res) => {
  const { targetUrl: url, captureMode, deviceMockup, fileFormat, height, width } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const normalizedUrl = normalizeUrl(url);

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      "--disable-extensions",
      '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list',
    ],
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();
    
    await page.setViewport({ width: width , height: height || 1080 });

    page.setDefaultNavigationTimeout(20000); // 20 seconds

    const response = await page.goto(normalizedUrl, {
      waitUntil: "networkidle2",
      timeout: 20000, // 20 seconds
    });

    if(!response || response.status() >= 400) {
      return res.status(400).json({ error: "Failed to navigate to the URL" });
    }

    const content = await page.content();
    if (content.trim().length === 0) {
      return res.status(400).json({ error: "No content found on the page" });
    }

    let screenshotOptions = {
      type: fileFormat || "png",
      encoding: "base64"
    };

    if (captureMode === "FULL_PAGE") {
      screenshotOptions.fullPage = true;
    } else {
      screenshotOptions.fullPage = false;
    }

    const screenshot = await page.screenshot(screenshotOptions);
    const pageTitle = await page.title();

    await browser.close();

    res.status(200).json({
      fileName: `${pageTitle.toLowerCase().replace(' ', '-')}.${fileFormat || 'png'}`,
      pageTitle,
      screenshot,
      mimeType: `image/${fileFormat || 'png'}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  } finally {
   
    await browser.close();
    
  }
};

module.exports = { takeScreenshot };
