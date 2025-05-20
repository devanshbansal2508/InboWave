import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import Membership from "@/models/membership.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(`❌ Webhook Error: ${errorMessage}`);
      return NextResponse.json({ error: { message: `Webhook Error: ${errorMessage}` } }, { status: 400 });
    }

    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const itemId = subscription.items.data[0]?.price?.product;

        if (!itemId) {
          console.warn("⚠️ itemId is missing in subscription");
          return NextResponse.json({ error: { message: "Missing product ID" } }, { status: 400 });
        }

        const product = await stripe.products.retrieve(itemId as string);
        const planName = product.name;

        const customerId = subscription.customer;

        if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
          const membership = await Membership.findOne({ stripeCustomerId: customerId });

          if (membership) {
            await Membership.updateOne(
              { stripeCustomerId: customerId },
              { $set: { plan: planName } }
            );
            console.log(`🔄 Updated membership for customer: ${customerId}`);
          } else {
            console.warn("⚠️ Membership not found for:", customerId);
          }
        }

        if (event.type === "customer.subscription.deleted") {
          await Membership.updateOne(
            { stripeCustomerId: customerId },
            { $set: { plan: "free" } }
          );
          console.log(`🚫 Subscription cancelled for customer: ${customerId}`);
        }

        break;
      }

      default:
        console.warn(`🤷‍♂️ Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("🔥 Internal Error:", err);
    return NextResponse.json({ error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
