"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-store";
import dynamic from "next/dynamic";

import animationData from "@/public/loading.json";

const LottieAnimation = dynamic(() => import("@/components/custom-loader"), {
  ssr: false,
});

export const TakingScreenshotModal = () => {
  const { isOpen } = useModalStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle className="flex items-center justify-center gap-2">
          <span className="text-2xl font-semibold animate-pulse">
            Taking Screenshot ...
          </span>
        </DialogTitle>
        <LottieAnimation animationData={animationData} />
      </DialogContent>
    </Dialog>
  );
};
