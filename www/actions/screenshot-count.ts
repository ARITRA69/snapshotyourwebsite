"use server";

import { mongodb } from "@/lib/mongodb";
import { IScreenshot, screenshotsCollectionSchema } from "@/model/screenshot";

export type GetScreenshotCountResult =
  | {
      success: true;
      count: IScreenshot["count"];
    }
  | {
      success: false;
      message: string;
    };

export async function getScreenshotCount(): Promise<GetScreenshotCountResult> {
  try {
    await mongodb.connect();

    const getScreenshotCountResult = await mongodb
      .collection<IScreenshot>(screenshotsCollectionSchema)
      .find({})
      .toArray();

    return {
      success: true,
      count: getScreenshotCountResult[0].count,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export type IncreaseScreenshotCountResult =
  | {
      success: true;
      newCount: IScreenshot["count"];
    }
  | {
      success: false;
      message: string;
    };

export async function increaseScreenshotCount(): Promise<IncreaseScreenshotCountResult> {
  try {
    await mongodb.connect();

    const collection = mongodb.collection<IScreenshot>(
      screenshotsCollectionSchema
    );

    const firstDocument = await collection.findOne({});

    if (!firstDocument) {
      throw new Error("No document found in the collection");
    }

    const result = await collection.findOneAndUpdate(
      { _id: firstDocument._id },
      { $inc: { count: 1 } },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new Error("Failed to update the document");
    }

    return {
      success: true,
      newCount: result.count,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to increase screenshot count.",
    };
  }
}
