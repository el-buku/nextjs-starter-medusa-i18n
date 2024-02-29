import k from "@lib/i18n/translations/keys"
import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"
import { Cart } from "@medusajs/medusa"

const CheckoutSummary = ({
  cartId,
  cart,
}: {
  cartId: string
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const t = useSafeTranslations()
  if (!cartId) {
    return null
  }

  if (!cart) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          {t(k.IN_YOUR_CART)}
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
