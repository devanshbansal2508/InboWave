"use server";

import Email from "@/models/email.model";
import { connectDb } from "@/shared/libs/db";

export const saveEmail = async ({
  title,
  content,
  newsLetterOwnerId,
}: {
  title: string;
  content: string;
  newsLetterOwnerId: string;
}) => {
  try {
    // Connect to the database
    await connectDb();

    // Try to find existing email
    const email = await Email.findOne({
      title,
      newsLetterOwnerId,
    });

    if (email) {
      // Update existing email content
      await Email.findByIdAndUpdate(email._id, { content });

      return {
        success: true,
        message: "Email updated successfully!",
      };
    } else {
      // Create a new email entry
      const newEmail = await Email.create({
        title,
        content,
        newsLetterOwnerId,
      });

      // Use .lean() to return a plain object
      return {
        success: true,
        message: "Email saved successfully!",
        data: newEmail.toObject(), // Converts to plain object
      };
    }
  } catch (error) {
    console.error("Error saving email:", error);

    return {
      success: false,
      message: "An error occurred while saving the email.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
