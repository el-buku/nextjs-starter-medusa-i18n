import k from "@lib/i18n/translations/keys"
import { Container, Text } from "@medusajs/ui"
import { useHits, useSearchBox } from "react-instantsearch-hooks-web"

import InteractiveLink from "@modules/common/components/interactive-link"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

const ShowAll = () => {
  const { hits } = useHits()
  const { query } = useSearchBox()
  const t = useSafeTranslations()
  const width = typeof window !== "undefined" ? window.innerWidth : 0

  if (query === "") return null
  if (hits.length > 0 && hits.length <= 6) return null

  if (hits.length === 0) {
    return (
      <Container className="flex gap-2 justify-center h-fit py-2">
        <Text>{t(k.NO_RESULTS_FOUND)}</Text>
      </Container>
    )
  }

  return (
    <Container className="flex sm:flex-col small:flex-row gap-2 justify-center items-center h-fit py-4 small:py-2">
      <Text>
        {t(k.SHOWING_THE_FIRST)} {width > 640 ? 6 : 3} {t(k.RESULTS)}
      </Text>
      <InteractiveLink href={`/results/${query}`}>
        {t(k.VIEW_ALL)}
      </InteractiveLink>
    </Container>
  )
}

export default ShowAll
