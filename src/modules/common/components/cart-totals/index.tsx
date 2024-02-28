"use client"
import k from "@lib/i18n/translations/keys"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React from "react"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const t = useSafeTranslations()

  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            {t(k.SUBTOTAL)}
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span>{getAmount(subtotal)}</span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>{t(k.DISCOUNT)}</span>
            <span className="text-ui-fg-interactive">
              {t(k._5)} {getAmount(discount_total)}
            </span>
          </div>
        )}

        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>{t(k.GIFT_CARD)}</span>
            <span className="text-ui-fg-interactive">
              {t(k._5)} {getAmount(gift_card_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>{t(k.SHIPPING)}</span>
          <span>{getAmount(shipping_total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">{t(k.TAXES)}</span>
          <span>{getAmount(tax_total)}</span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>{t(k.TOTAL)}</span>
        <span className="txt-xlarge-plus">{getAmount(total)}</span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
