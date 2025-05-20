"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";

export const getSubscribers = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}) => {
  try {
    await connectDb();

    // Use .lean() to return plain JavaScript objects instead of Mongoose documents
    const subscribers = await Subscriber.find({
      newsLetterOwnerId,
    }).lean();

    return subscribers; // Plain JavaScript objects
  } catch (error) {
    console.log(error);
    return null; // Handle errors as needed
  }
};
