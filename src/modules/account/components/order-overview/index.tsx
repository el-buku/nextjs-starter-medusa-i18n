"use client"
import k from "@lib/i18n/translations/keys"

import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

const OrderOverview = ({ orders }: { orders: Order[] }) => {
  const t = useSafeTranslations()
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h2 className="text-large-semi">{t(k.NOTHING_TO_SEE_HERE)}</h2>
      <p className="text-base-regular">
        {t(k.YOU_DON_T_HAVE_ANY_ORDERS_YET)} {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button>{t(k.CONTINUE_SHOPPING)}</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
