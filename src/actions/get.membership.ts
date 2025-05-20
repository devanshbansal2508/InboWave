"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";

export const getMemberShip = async () => {
  try {
    await connectDb();

    const user = await currentUser();
    if (!user) {
      console.error("No current user found");
      return null;
    }

    const membership = await Membership.findOne({ userId: user.id });

    if (!membership) {
      console.warn("Membership not found for user:", user.id);
      return null;
    }

    return {
      stripeCustomerId: membership.stripeCustomerId,
      plan: membership.plan,
    };
  } catch (error) {
    console.error("❌ Error in getMemberShip:", error);
    return null;
  }
};
