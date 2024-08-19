import { z } from "zod";

export const searchSchema = z.object({
  url: z.string().refine(
    (value) => {
      const urlPattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/;
      return urlPattern.test(value);
    },
    {
      message: "Invalid URL format",
    }
  ),
  
});


export const toolboxFormSchema = z.object({
  targetUrl: z.string().refine(
    (value) => {
      const urlPattern =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/;
      return urlPattern.test(value);
    },
    {
      message: "Invalid URL format",
    }
  ),
  captureMode: z.enum(["VISIBLE_PART", "FULL_PAGE"]),
  deviceMockup: z.enum(["DESKTOP", "MOBILE"]).optional(),
  fileFormat: z.enum(["png", "jpeg", "webp"]).optional(),
  height: z.coerce.number().optional(),
  width: z.coerce.number(),
})