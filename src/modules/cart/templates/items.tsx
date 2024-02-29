import { useSafeTranslations } from "@lib/i18n/use-safe-translations"
import { LineItem, Region } from "@medusajs/medusa"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import k from "@lib/i18n/translations/keys"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  const t = useSafeTranslations()
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">{t(k.CART)}</Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="!pl-0">{t(k.ITEMS)}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t(k.QUANTITY)}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {t(k.PRICE)}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {t(k.TOTAL)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items && region
            ? items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1
                })
                .map((item) => {
                  return <Item key={item.id} item={item} region={region} />
                })
            : Array.from(Array(5).keys()).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
