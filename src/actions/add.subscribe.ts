"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";
import { validateEmail } from "@/shared/utils/ZeroBounceApi";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const subscribe = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    await connectDb();

    // Fetch all users (PaginatedResourceResponse<User[]>)
    const allUsers = await clerkClient.users.getUserList();

    // Access .data to get the array of users
    const newsletterOwner = allUsers.data.find((i) => i.username === username);

    if (!newsletterOwner) {
      throw new Error("Username is not valid!");
    }

    // Check if subscriber already exists
    const isSubscriberExist = await Subscriber.findOne({
      email,
      newsLetterOwnerId: newsletterOwner.id,
    });

    if (isSubscriberExist) {
      return { error: "Email already exists!" };
    }

    // Validate email
    const validationResponse = await validateEmail({ email });
    if (validationResponse.status === "invalid") {
      return { error: "Email not valid!" };
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      newsLetterOwnerId: newsletterOwner.id,
      source: "By InboWave website",
      status: "Subscribed",
    });

    return subscriber.toObject();

  } catch (error) {
    console.error(error);
    return { error: "An error occurred while subscribing." };
  }
};
