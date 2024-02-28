import { getI18NConfigCallback } from "@lib/i18n/config-callback"
import { LOCALE_COOKIE, fallbackLng, languages } from "@lib/i18n/settings"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { cookies } from "next/headers"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale: localeParam },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = languages.includes(localeParam)
    ? localeParam
    : cookies().get(LOCALE_COOKIE)?.value || fallbackLng
  unstable_setRequestLocale(locale)
  const { messages } = await getI18NConfigCallback({
    locale,
  })
  return (
    <html lang={locale} data-mode="light">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body>
          <main className="relative">{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
