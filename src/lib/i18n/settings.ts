export const fallbackLng = "en"
export const languages = [fallbackLng, "fr", "zh"]
export const localePrefix = "always"
export const LOCALE_COOKIE = "NEXT_LOCALE"

export const intlConfig = {
  locales: languages,
  defaultLocale: fallbackLng,
  localeDetection: true,
}
