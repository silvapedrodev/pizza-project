import Link from "next/link"
import { Button } from "../ui/button"
import { CartButton } from "../cart/cart-button"

export const Header = () => {
  return (
    <header className="container mx-auto flex my-4 p-5 items-center justify-between bg-secondary rounded-md">
      <Link href="/">
        <div className="text-2xl font-bold">Pizza</div>
      </Link>
      <div className="flex gap-2">
        <Button>Login / cadastro</Button>
        <CartButton />
      </div>
    </header>
  )
}