import k from "@lib/i18n/translations/keys"
import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatAmount } from "@lib/util/prices"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])
  const t = useSafeTranslations()

  return (
    <div className="bg-white flex flex-col">
      <div className="uppercase text-large-semi mb-1">
        {t(k._1)}
        {order.display_id}
      </div>
      <div className="flex items-center divide-x divide-gray-200 text-small-regular text-ui-fg-base">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? t(k.ITEMS) : t(k.ITEM)
        }`}</span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id} className="flex flex-col gap-y-2">
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="flex items-center text-small-regular text-ui-fg-base">
                <span className="text-ui-fg-base font-semibold">{i.title}</span>
                <span className="ml-2">{t(k.X)}</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-small-regular text-ui-fg-base">
              {t(k._2)} {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-ui-fg-base">
              {t(k.MORE)}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button variant="secondary">{t(k.SEE_DETAILS)}</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
