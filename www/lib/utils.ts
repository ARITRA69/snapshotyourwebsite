import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url: string): string {
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
}