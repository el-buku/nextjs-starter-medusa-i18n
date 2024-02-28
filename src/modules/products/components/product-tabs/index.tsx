"use client"
import k from "@lib/i18n/translations/keys"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const t = useSafeTranslations()

  const tabs = [
    {
      label: t(k.PRODUCT_INFORMATION),
      component: <ProductInfoTab product={product} />,
    },
    {
      label: t(k.SHIPPING_RETURNS),
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const t = useSafeTranslations()

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t(k.MATERIAL)}</span>
            <p>{product.material ? product.material : t(k._5)}</p>
          </div>
          <div>
            <span className="font-semibold">{t(k.COUNTRY_OF_ORIGIN)}</span>
            <p>{product.origin_country ? product.origin_country : t(k._5)}</p>
          </div>
          <div>
            <span className="font-semibold">{t(k.TYPE)}</span>
            <p>{product.type ? product.type.value : t(k._5)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t(k.WEIGHT)}</span>
            <p>{product.weight ? `${product.weight} ${t(k.G)}` : t(k._5)}</p>
          </div>
          <div>
            <span className="font-semibold">{t(k.DIMENSIONS)}</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}${t(k.L_X)} ${product.width}${t(k.W_X)} ${
                    product.height
                  }${t(k.H)}`
                : t(k._5)}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">{t(k.TAGS)}</span>
        </div>
      ) : null}
    </div>
  )
}

const ShippingInfoTab = () => {
  const t = useSafeTranslations()

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">{t(k.FAST_DELIVERY)}</span>
            <p className="max-w-sm">{t(k.YOUR_PACKAGE_WILL_ARRIVE_IN)}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">{t(k.SIMPLE_EXCHANGES)}</span>
            <p className="max-w-sm">{t(k.IS_THE_FIT_NOT_QUITE_RIGHT_NO)}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">{t(k.EASY_RETURNS)}</span>
            <p className="max-w-sm">{t(k.JUST_RETURN_YOUR_PRODUCT_AND_W)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
