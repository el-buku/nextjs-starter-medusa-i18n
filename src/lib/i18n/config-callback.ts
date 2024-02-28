import { getRequestConfig } from "next-intl/server"

import { fallbackLng, languages } from "./settings"

export const getI18NConfigCallback: Parameters<
  typeof getRequestConfig
>[0] = async ({ locale }) => {
  if (!languages.includes(locale)) {
    locale = fallbackLng
  }

  return {
    messages: (await import(`./translations/locales/${locale}.ts`)).default,
  }
}
