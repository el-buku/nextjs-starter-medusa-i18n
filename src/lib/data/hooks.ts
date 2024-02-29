"use client"

import { CartWithCheckoutStep } from "types/global"
import {
  createPaymentSessions,
  listShippingMethods,
  getCustomer,
} from "./queries"
import { useEffect, useState } from "react"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Customer } from "@medusajs/medusa"

export const useCreatePaymentSessions = (cartId: string) => {
  const [cart, setCart] = useState<CartWithCheckoutStep | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createPaymentSessions(cartId).then((c) => {
      setCart(c as CartWithCheckoutStep)
      setLoading(false)
    })
  }, [cartId])

  return { cart, loading }
}

export const useGetShippingMethods = (regionId: string) => {
  const [availableShippingMethods, setAvailableShippingMethods] = useState<
    PricedShippingOption[] | null
  >(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listShippingMethods(regionId).then(
      (methods: PricedShippingOption[] | undefined) => {
        methods &&
          setAvailableShippingMethods(methods?.filter((m) => !m.is_return))
        setLoading(false)
      }
    )
  }, [regionId])

  return { availableShippingMethods, loading }
}
export const useGetCustomer = (): {
  customer: Omit<Customer, "password_hash"> | null
  loading: boolean
} => {
  const [customer, setCustomer] = useState<Omit<
    Customer,
    "password_hash"
  > | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCustomer().then((c) => {
      setCustomer(c)
      setLoading(false)
    })
  }, [])

  return { customer, loading }
}
