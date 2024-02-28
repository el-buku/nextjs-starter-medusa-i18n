import k from "@lib/i18n/translations/keys"
import { Order } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import Divider from "@modules/common/components/divider"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type ShippingDetailsProps = {
  order: Order
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const t = useSafeTranslations()

  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        {t(k.DELIVERY)}
      </Heading>
      <div className="flex items-start gap-x-8">
        <div className="flex flex-col w-1/3">
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {t(k.SHIPPING_ADDRESS)}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address.first_name}{" "}
            {order.shipping_address.last_name}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address.address_1}{" "}
            {order.shipping_address.address_2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address.postal_code}
            {t(k._10)} {order.shipping_address.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address.country_code?.toUpperCase()}
          </Text>
        </div>

        <div className="flex flex-col w-1/3 ">
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {t(k.CONTACT)}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div className="flex flex-col w-1/3">
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {t(k.METHOD)}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_methods[0].shipping_option?.name} {t(k._3)}
            {formatAmount({
              amount: order.shipping_methods[0].price,
              region: order.region,
              includeTaxes: false,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            {t(k._4)}
          </Text>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
