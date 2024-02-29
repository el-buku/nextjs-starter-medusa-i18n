"use client"

import Addresses from "@modules/checkout/components/addresses"
import Shipping from "@modules/checkout/components/shipping"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import {
  useCreatePaymentSessions,
  useGetCustomer,
  useGetShippingMethods,
} from "@lib/data/hooks"
import { CartWithCheckoutStep } from "types/global"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { Suspense } from "react"

import { useEffect, useState } from "react"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Customer } from "@medusajs/medusa"

export default function CheckoutForm({
  cartId,
  cart,
}: {
  cartId: string
  cart: CartWithCheckoutStep
}) {
  if (!cartId) {
    return null
  }

  const { availableShippingMethods, loading: loadingShipping } =
    useGetShippingMethods(cart.region_id)

  const { customer, loading: loadingCustomer } = useGetCustomer()

  cart.checkout_step = getCheckoutStep(cart)

  if (loadingShipping || loadingCustomer) {
    return <>...</>
  }
  if (!availableShippingMethods) return null

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Suspense fallback={<></>}>
            <Addresses cart={cart} customer={customer} />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<></>}>
            <Shipping
              cart={cart}
              availableShippingMethods={availableShippingMethods}
            />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<></>}>
            <Payment cart={cart} />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<></>}>
            <Review cart={cart} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
