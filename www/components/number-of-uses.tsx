"use client";

import { GetScreenshotCountResult } from "@/actions/screenshot-count";
import NumberTicker from "./magicui/number-ticker";
import { FC } from "react";

type NumberOfUsesProps = {
  data: {
    count: Extract<GetScreenshotCountResult, { success: true }>["count"];
  };
};

export const NumberOfUses: FC<NumberOfUsesProps> = (props) => {
  return (
    <div className="text-center text-sm text-zinc-500/70 flex gap-1">
      <NumberTicker
        value={props.data.count}
        className="font-bold text-zinc-500/70 tracking-tight"
      />
      <span>
        websites captured using our screenshot tool. Get yours in seconds ;)
      </span>
    </div>
  );
};
