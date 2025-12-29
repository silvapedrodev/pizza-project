import { prisma } from "@/lib/prisma";
import { cartItem } from "@/types/cart-item";

export const createNewOrder = async (userId: number, cart: cartItem[]) => {
  const newOrder = await prisma.order.create({
    data: { userId }
  })

  for (let item of cart) {
    await prisma.orderProducts.create({
      data: {
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity
      }
    })
  }

  return newOrder
}