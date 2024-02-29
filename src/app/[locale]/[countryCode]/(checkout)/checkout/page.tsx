import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { createPaymentSessions, getCart } from "@lib/data"
import { CartWithCheckoutStep } from "types/global"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart: any) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }
  const cartPS = (await createPaymentSessions(cartId)) as CartWithCheckoutStep
  return { cart, cartPS }
}

export default async function Checkout() {
  const { cart, cartPS } = await fetchCart()
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cart) {
    return notFound()
  }

  return (
    <Suspense fallback={<></>}>
      {cartId && (
        <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
          <Wrapper cart={cart}>
            <CheckoutForm cartId={cartId} cart={cartPS} />
          </Wrapper>
          <CheckoutSummary cart={cart} cartId={cartId} />
        </div>
      )}
    </Suspense>
  )
}
