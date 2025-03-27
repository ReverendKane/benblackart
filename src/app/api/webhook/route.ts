import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);
  const sig = req.headers.get("stripe-signature");
  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log("WOOHOO... event", event.type);
    /*
                    In the tutorial: https://www.youtube.com/watch?v=2JDKquIMJws&ab_channel=RasMic
                    the instructor talks about how you can set up the webhook to respond to any number of
                    events that can be found in the developer dashboard under webhooks. The response will
                    give you a wealth of data that you can use to then communicate with a database and
                    do all kinds of shit based on for instance whether a payment was made. In his example
                    he is using "charge.succeeded", "payment_intent.succeeded" and "payment_intent.created"
    
                    here is how he structures his info gathering:
                    const response: any = await registerPayment(
                    res?.data?.object?billing_details?.email, //email
                    res?.data?.object?.amount, //amount
                    res?.type, //type
                    String(timeString), //time
                    String(dateTime), //date
                    res?.data?.object?.receipt_email, //email
                    res?.data?.object?.receipt_url, //url
                    JSON.stringify(res?.data?.object?.payment_method_details), //payment method details
                    JSON.stringify(res?.data?.object?.billing_details), //billing details
                    res?.data?.object?.currency //currency
                    );
                
                     */
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "error", error });
  }
}
