"use client"

import { ChangeEvent } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import k, { TranslationDef } from "@lib/i18n/translations/keys"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
}

const sortOptions = [
  {
    value: "created_at",
    label: k.LATEST_ARRIVALS,
  },
  {
    value: "price_asc",
    label: k.PRICE_LOW_HIGH,
  },
  {
    value: "price_desc",
    label: k.PRICE_HIGH_LOW,
  },
]

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSortBy = e.target.value as SortOptions
    setQueryParams("sortBy", newSortBy)
  }
  const t = useSafeTranslations()
  return (
    <FilterRadioGroup
      title={t(k.SORT_BY)}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
    />
  )
}

export default SortProducts
