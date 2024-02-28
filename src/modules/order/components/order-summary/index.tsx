import k from "@lib/i18n/translations/keys"
import { Order } from "@medusajs/medusa"
import { formatAmount } from "@lib/util/prices"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type OrderSummaryProps = {
  order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }
  const t = useSafeTranslations()

  return (
    <div>
      <h2 className="text-base-semi">{t(k.ORDER_SUMMARY)}</h2>
      <div className="text-small-regular text-ui-fg-base my-2">
        <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
          <span>{t(k.SUBTOTAL)}</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t(k.DISCOUNT)}</span>
              <span>
                {t(k._5)} {getAmount(order.discount_total)}
              </span>
            </div>
          )}

          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t(k.DISCOUNT)}</span>
              <span>
                {t(k._5)} {getAmount(order.gift_card_total)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span>{t(k.SHIPPING)}</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t(k.TAXES)}</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
          <span>{t(k.TOTAL)}</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
