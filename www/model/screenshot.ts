import { ObjectId } from "mongodb";

export type IScreenshot = {
  _id: ObjectId;
  count: number;
};

export const screenshotsCollectionSchema = "records";
