import k from "@lib/i18n/translations/keys"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"
import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = { variant: ProductVariant }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  const t = useSafeTranslations()

  return (
    <Text className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis">
      {t(k.VARIANT)} {variant.title}
    </Text>
  )
}

export default LineItemOptions
