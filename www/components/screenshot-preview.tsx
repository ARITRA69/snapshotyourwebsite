"use client";

import { useDataStore } from "@/hooks/use-store";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowDownToLine, MousePointerClick } from "lucide-react";
import { Badge } from "./ui/badge";

export const ScreenshotPreview = () => {
  const { data } = useDataStore();
  const { imageSrc, pageTitle, fileName, isFullPage } = data;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc!;
    link.download = fileName!;
    link.click();
  };

  if (!imageSrc) {
    return (
      <div className="w-full border aspect-video h-fit shadow-md p-4 flex items-center justify-center">
        <div className="flex items-center gap-2 font-medium text-muted-foreground">
          <MousePointerClick />
          <span className="">Waiting for Input</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-full w-full space-y-4">
      {pageTitle && fileName && (
        <div className="flex w-full justify-between border shadow-md p-4 items-center">
          <div className="flex gap-4">
            <div className="flex gap-1">
              <span className="font-semibold">Website: </span>
              <span className="text-accent">{pageTitle}</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">File: </span>
              <span className="text-accent">{fileName}</span>
            </div>
            <Badge className="bg-zinc-700 text-white px-2 py-1">
              {isFullPage ? "Full Page" : "Visible Part"}
            </Badge>
          </div>
          <div className="flex gap-4">
            <Button
              className="w-fit px-3 flex gap-2 items-center rounded-none hover:text-white"
              variant={"outline"}
              size={"sm"}
              onClick={handleDownload}
            >
              <ArrowDownToLine className="size-4" />
              Download
            </Button>
          </div>
        </div>
      )}
      <div className="hide-scrollbar overflow-y-auto aspect-video object-cover w-full border shadow-md">
        <Image
          src={imageSrc}
          alt={pageTitle!}
          height={1000}
          width={1000}
          className="object-cover w-full"
        />
      </div>
    </div>
  );
};
