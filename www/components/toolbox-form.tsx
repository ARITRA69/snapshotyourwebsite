"use client";

import { toolboxFormSchema } from "@/schema/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { generateScreenshot } from "@/actions/generate-screenshot";
import { Loader2, X } from "lucide-react";
import { useDataStore, useModalStore } from "@/hooks/use-store";
import { increaseScreenshotCount } from "@/actions/screenshot-count";

export const ToolboxForm = ({ url }: { url?: string }) => {
  const [canSelectMockup, setCanSelectMockup] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { setIsOpen } = useModalStore();

  const router = useRouter();
  const { setData } = useDataStore();

  const form = useForm<z.infer<typeof toolboxFormSchema>>({
    resolver: zodResolver(toolboxFormSchema),
    defaultValues: {
      targetUrl: url ? url : "",
      captureMode: "VISIBLE_PART",
      deviceMockup: undefined,
      fileFormat: "png",
      height: 1080,
      width: 1920,
    },
  });

  const onSubmit = async (data: z.infer<typeof toolboxFormSchema>) => {
    startTransition(async () => {
      setIsOpen(true);
      const generateScreenshotResult = await generateScreenshot(data);
      if (generateScreenshotResult.success) {
        const { fileName, pageTitle, screenshot, mimeType } =
          generateScreenshotResult;
        const imageSrc = `data:${mimeType};base64,${screenshot}`;
        setData({ imageSrc: imageSrc, fileName, pageTitle });
        increaseScreenshotCount();
      } else {
        console.error(generateScreenshotResult.message);
      }
      setIsOpen(false);
    });
  };

  const watchedURL = form.watch("targetUrl");

  useEffect(() => {
    if (watchedURL) {
      router.push(`/screenshot-tool?url=${watchedURL}`);
    }
  }, [watchedURL]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-4 p-4">
          <FormField
            name="targetUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Website URL"
                    type="text"
                    className="rounded-none disabled:opacity-50"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <FormField
              name="captureMode"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start gap-2">
                  <FormLabel>Capture Mode</FormLabel>
                  <FormControl className="">
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "VISIBLE_PART") {
                          setCanSelectMockup(true);
                        } else {
                          setCanSelectMockup(false);
                          form.setValue("deviceMockup", undefined);
                          form.resetField("deviceMockup");
                        }
                      }}
                      disabled={isPending}
                      defaultValue={field.value}
                      className="flex h-full items-center"
                    >
                      <FormItem className="flex-1 flex items-end gap-1">
                        <FormControl className="">
                          <RadioGroupItem value="VISIBLE_PART" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Visible Part
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex-1 flex items-end gap-1">
                        <FormControl>
                          <RadioGroupItem value="FULL_PAGE" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Full Page
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="deviceMockup"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start gap-2">
                  <FormLabel>Device Mockup</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        if (value === "none") {
                          field.onChange(undefined);
                        } else {
                          field.onChange(value);
                        }
                      }}
                      defaultValue={field.value}
                      disabled={!canSelectMockup || isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select mockup" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="DESKTOP">Desktop</SelectItem>
                        <SelectItem value="MOBILE">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="fileFormat"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex justify-start flex-col items-start gap-2">
                  <FormLabel>File Format</FormLabel>
                  <FormControl className="">
                    <RadioGroup
                      onValueChange={field.onChange}
                      disabled={isPending}
                      defaultValue={field.value}
                      className="flex w-full h-full items-center"
                    >
                      <FormItem className="flex items-end gap-1 flex-1">
                        <FormControl className="">
                          <RadioGroupItem value="png" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          PNG
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-end gap-1 flex-1">
                        <FormControl>
                          <RadioGroupItem value="jpeg" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          JPEG
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-end gap-1 flex-1">
                        <FormControl>
                          <RadioGroupItem value="webp" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          WEBP
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4 items-start">
              <FormLabel>Browser Resolution</FormLabel>
              <div className="flex items-center w-full gap-2">
                <FormField
                  name="height"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Height"
                          type="number"
                          className="rounded-none disabled:opacity-50"
                          {...field}
                          disabled={isPending || !canSelectMockup}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <X className="size-4" />
                <FormField
                  name="width"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Width"
                          type="number"
                          className="rounded-none disabled:opacity-50"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-none bg-accent hover:bg-accent/90"
            disabled={isPending}
            size={"lg"}
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2 size-4" />
            ) : (
              "Retake Screenshot"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
