import { Customer, Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"
import k from "@lib/i18n/translations/keys"

type OverviewProps = {
  customer: Omit<Customer, "password_hash"> | null
  orders: Order[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const t = useSafeTranslations()

  return (
    <div>
      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-center mb-4">
          <span>
            {t(k.HELLO_CUSTOMER)} {customer?.first_name}
          </span>
          <span className="text-small-regular text-ui-fg-base">
            {t(k.SIGNED_IN_AS)}{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t(k.PROFILE)}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t(k.COMPLETED)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t(k.ADDRESSES)}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t(k.SAVED)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">{t(k.RECENT_ORDERS)}</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="bg-gray-50 flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">
                                {t(k.DATE_PLACED)}
                              </span>
                              <span className="font-semibold">
                                {t(k.ORDER_NUMBER)}
                              </span>
                              <span className="font-semibold">
                                {t(k.TOTAL_AMOUNT)}
                              </span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              <span>
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                            <button className="flex items-center justify-between">
                              <span className="sr-only">
                                {t(k.GO_TO_ORDER)} #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span>{t(k.NO_RECENT_ORDERS)}</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (
  customer: Omit<Customer, "password_hash"> | null
) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
