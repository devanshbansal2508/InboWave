"use server";

import Subscriber from "@/models/subscriber.model";
import { generateAnalyticsData } from "@/shared/utils/analytics.generator";

export const subscribersAnalytics = async () => {
  try {
    const subscribers = await generateAnalyticsData(Subscriber);

    // Convert the result to plain JavaScript objects if needed
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.log(error);
    return null; // Handle the error as needed
  }
};
