"use server";

import { connectDb } from "@/shared/libs/db";
import Email from "@/models/email.model";

export const GetEmailDetails = async ({
  title,
  newsLetterOwnerId,
}: {
  title: string;
  newsLetterOwnerId: string;
}) => {
  try {
    await connectDb();
    const email = await Email.findOne({
      title,
      newsLetterOwnerId,
    });

    // Convert to plain object if found
    return email ? JSON.parse(JSON.stringify(email)) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
