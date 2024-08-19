const puppeteer = require("puppeteer");
require("dotenv").config();

const takeScreenshot = async (res) => {
  //   const { url } = req.body;

  //   if (!url) {
  //     return res.status(400).json({ error: "URL is required" });
  //   }

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    await page.goto("https://www.nilabjo.com", {
      waitUntil: "networkidle0",
      timeout: 10000,
    });

    const screenshot = await page.screenshot({
      fullPage: true,
      type: "png",
    });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { takeScreenshot };
