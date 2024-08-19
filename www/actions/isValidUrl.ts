"use server";

import { normalizeUrl } from "@/lib/utils";
import { searchSchema } from "@/schema/type";
import puppeteer from "puppeteer";

interface isValidUrlResponse {
  url: string;
  isValid: boolean;
}

export async function isValidUrl(values: any): Promise<isValidUrlResponse> {
  const res = searchSchema.safeParse(values);
  if (!res.success) {
    return { url: "", isValid: false };
  }

  let url = normalizeUrl(res.data.url);

  let browser;
  try {
    // Check if the URL is valid
    new URL(url);

    browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    // Set a timeout for the navigation
    page.setDefaultNavigationTimeout(5000); // 5 seconds

    // Try to navigate to the URL
    const response = await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 10000,
    });

    // Check if the navigation was successful
    if (!response) {
      return { url: "", isValid: false };
    }

    // Check the status code
    const status = response.status();
    if (status < 200 || status >= 400) {
      return { url: "", isValid: false };
    }

    // Check if there's content
    const content = await page.content();

    if (content.trim().length > 0) {
      return { url, isValid: true };
    }

    return { url: "", isValid: false };
  } catch (error) {
    console.error("Error checking URL:", error);
    return { url: "", isValid: false };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
