import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const headersList = await headers()
  const stripeSignature = headersList.get('stripe-signature')
  const rawBody = await request.text()

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature!,
      process.env.STRIPE_WEBHOOK_KEY!
    )

    const eventTypes = [
      'checkout.session.completed',
      'checkout.session.async_payment_succeeded'
    ]

    if (eventTypes.includes(event.type)) {
      const { metadata, payment_status } = event.data.object as any

      if (payment_status === 'paid') {
        const orderId = parseInt(metadata.order_id)
        if (orderId) {
          const order = await prisma.order.findUnique({
            where: { id: orderId }
          })
          if (order) {
            await prisma.order.update({
              where: { id: orderId },
              data: { status: 'PAID' }
            })
          }
        }
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  return NextResponse.json({})
}