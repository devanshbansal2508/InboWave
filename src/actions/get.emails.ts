"use server";

import Email from "@/models/email.model";
import { connectDb } from "@/shared/libs/db";

export const getEmails = async ({
  newsLetterOwnerId,
}: {
  newsLetterOwnerId: string;
}) => {
  try {
    await connectDb();
    
    // Use .lean() to get plain objects instead of Mongoose documents
    const emails = await Email.find({ newsLetterOwnerId }).lean();
    
    return emails; // Plain JavaScript objects
  } catch (error) {
    console.log(error);
    return null; // or handle errors as needed
  }
};
