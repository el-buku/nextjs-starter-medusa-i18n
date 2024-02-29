import k from "@lib/i18n/translations/keys"
import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }
  const t = await getTranslations()

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t(k.ORDERS)}</h1>
        <p className="text-base-regular">
          {t(k.VIEW_YOUR_PREVIOUS_ORDERS_AND)}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
