"use client";

import { useSearchParams } from "next/navigation";
import { ToolboxForm } from "./toolbox-form";

export const Toolbox = () => {
  const params = useSearchParams();
  const urlSearchParams = new URLSearchParams(params);
  const url = urlSearchParams.get("url");
  return (
    <div className="border h-max flex flex-col shadow-md">
      <ToolboxForm url={url!} />
    </div>
  );
};
