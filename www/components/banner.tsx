"use client";

import { usePathname } from "next/navigation";

export const Banner = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div className="w-full p-1 bg-accent text-white absolute flex justify-center">
      {children}
    </div>
  );
};
