import k from "@lib/i18n/translations/keys"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getCustomer, getRegion } from "@lib/data"

import { headers } from "next/headers"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses() {
  const nextHeaders = headers()
  const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }
  const t = useSafeTranslations()
  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t(k.SHIPPING_ADDRESSES)}</h1>
        <p className="text-base-regular">
          {t(k.VIEW_AND_UPDATE_YOUR_SHIPPING)}
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
