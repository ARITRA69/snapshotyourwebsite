"use server";

import puppeteer from "puppeteer";
import { toolboxFormSchema } from "@/schema/type";
import { normalizeUrl } from "@/lib/utils";

export type GenerateScreenshotResult =
  | {
      success: true;
      screenshot: any;
      mimeType: string;
      fileName: string;
      pageTitle: string;
    }
  | {
      success: false;
      message: string;
    };

export async function generateScreenshot(
  data: any
): Promise<GenerateScreenshotResult> {
  const res = toolboxFormSchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      message: "Invalid data passed",
    };
  }

  const {
    targetUrl: dataUrl,
    captureMode: viewport,
    deviceMockup,
    fileFormat,
    height,
    width,
  } = res.data;

  const url = normalizeUrl(dataUrl);

  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    const pageTitle = await page.title();

    if (viewport === "VISIBLE_PART") {
      await page.setViewport({
        width: width,
        height: height!,
      });
    } else {
      await page.setViewport({
        width: width,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false,
      });
    }

    const screenshot = await page.screenshot({
      encoding: "base64",
      fullPage: viewport === "VISIBLE_PART" ? false : true,
      type: fileFormat,
    });

    await browser.close();

    let mimeType = "";
    if (fileFormat === "png") {
      mimeType = "image/png";
    } else if (fileFormat === "jpeg") {
      mimeType = "image/jpeg";
    } else if (fileFormat === "webp") {
      mimeType = "image/webp";
    }
    const fileName = `${pageTitle!.toLowerCase()}.${fileFormat!.toLowerCase()}`;

    return {
      success: true,
      screenshot,
      mimeType,
      fileName,
      pageTitle,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
