"use client"
import k from "@lib/i18n/translations/keys"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

const Review = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    cart.payment_session
  const t = useSafeTranslations()

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          {t(k.REVIEW)}
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {t(k.BY_CLICKING_THE_PLACE_ORDER_BU)}
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} />
        </>
      )}
    </div>
  )
}

export default Review
