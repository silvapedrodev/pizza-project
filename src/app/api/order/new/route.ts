import { getLoggedUserFromHeader } from "@/services/auth"
import { createNewOrder } from "@/services/order"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { cart } = await request.json()
  const loggedUser = await getLoggedUserFromHeader()

  if (!loggedUser) return NextResponse.json({ error: "Usuário não logado" })
  if (!cart || (cart && cart.length <= 0)) return NextResponse.json({ error: "Carrinho vazio" })

  const order = await createNewOrder(loggedUser.id, cart)
  if (!order) return NextResponse.json({ error: 'Ocorreu um erro' })

  return NextResponse.json({ order }, { status: 201 })
}