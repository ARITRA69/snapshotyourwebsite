import { Github } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="py-5 flex justify-center text-zinc-600 gap-4 items-center">
      <Link
        href={"https://github.com/ARITRA69/snapshotyourwebsite"}
        target="_blank"
      >
        <button className="flex items-center gap-1 px-2 py-0.5 rounded-md border font-semibold bg-gray-100/40">
          <FaGithub className="size-5" />
          Star
        </button>
      </Link>
      <h3>
        Built by{" "}
        <Link
          href={"https://www.aritra69.com/"}
          className="text-accent font-semibold"
          target="_blank"
        >
          @aritra
        </Link>{" "}
        and{" "}
        <Link
          href={"https://www.nilabjo.com/"}
          className="text-accent font-semibold"
          target="_blank"
        >
          @nilabjo
        </Link>
      </h3>
    </div>
  );
};
