import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const periodEnd = sub.items?.data?.[0]?.current_period_end;
        await prisma.user.update({
          where: { id: userId },
          data: {
            isPremium: true,
            stripeSubId: sub.id,
            subStatus: sub.status,
            subCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
          },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      if (userId) {
        const isActive = ["active", "trialing"].includes(sub.status);
        const periodEnd = sub.items?.data?.[0]?.current_period_end;
        await prisma.user.update({
          where: { id: userId },
          data: {
            isPremium: isActive,
            subStatus: sub.status,
            subCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isPremium: false, subStatus: "canceled", stripeSubId: null },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
