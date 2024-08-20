import { ScreenshotPreview } from "@/components/screenshot-preview";
import { Toolbox } from "@/components/toolbox";
import { Suspense } from "react";

export default function ScreenshotTool() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <Suspense>
        <Toolbox />
      </Suspense>
      <ScreenshotPreview />
    </div>
  );
}
