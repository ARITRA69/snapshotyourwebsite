"use client";

import { TakingScreenshotModal } from "@/components/modal/taking-screenshot-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TakingScreenshotModal />
    </>
  );
};
