"use client"
import k from "@lib/i18n/translations/keys"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  const t = useSafeTranslations()

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        {t(k.SUMMARY)}
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink href={"/checkout?step=" + cart.checkout_step}>
        <Button className="w-full h-10">{t(k.GO_TO_CHECKOUT)}</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
