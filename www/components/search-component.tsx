"use client";

import { Shadows_Into_Light } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState, useTransition } from "react";
import { searchSchema } from "@/schema/type";
import { useDataStore, useModalStore } from "@/hooks/use-store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";

const shadows = Shadows_Into_Light({ subsets: ["latin"], weight: ["400"] });

export const SearchComponent = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const { setIsOpen } = useModalStore();
  const { setData } = useDataStore();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      url: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    startTransition(async () => {
      setIsOpen(true);
      const payloadData = {
        targetUrl: data.url,
        captureMode: "VISIBLE_PART",
        deviceMockup: "DESKTOP",
        fileFormat: "png",
        height: 1080,
        width: 1920,
      };
      try {
        const res = await axios.post(
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_RENDER_URL}/take-screenshot`
            : "http://localhost:4000/take-screenshot",
          payloadData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          const { fileName, pageTitle, screenshot, mimeType } = res.data;

          const imageSrc = `data:${mimeType};base64,${screenshot}`;
          setData({ imageSrc: imageSrc, fileName, pageTitle });
          router.push(`/screenshot-tool?url=${url}`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full">
      <div className="flex w-full justify-center gap-3">
        <div className="flex items-center gap-2 h-full justify-center">
          <div
            className={cn(
              "flex flex-col gap-4 text-zinc-600/70 text-center",
              shadows.className
            )}
          >
            <span className="rotate-6">Enter the URL here</span>
            <span className="-rotate-6">🤑 This tool is absolutely free</span>
          </div>
          <Image
            src={"/arrow.svg"}
            alt="arrow"
            height={100}
            width={100}
            className="w-12 h-fit -rotate-12"
          />
        </div>
        <div className=" w-[min(450px,100%)] p-2 bg-accent shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center w-full"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormControl>
                      <Input
                        placeholder="Website URL"
                        type="text"
                        className=" h-12 rounded-none bg-white/30 border-none px-6 placeholder:text-white placeholder:text-sm focus:placeholder:text-white/70 text-white"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUrl(e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-1/3 h-12 rounded-none text-accent bg-white hover:bg-white tracking-widest text-xs font-semibold hover:text-black disabled:opacity-80 disabled:text-black "
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin size-4 mr-2" />
                ) : (
                  "CAPTURE"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
