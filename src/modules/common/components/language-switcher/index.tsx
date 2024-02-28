"use client";
import { usePathname, useRouter } from "@lib/i18n/navigation";
import { languages } from "@lib/i18n/settings";
import { useLocale } from "next-intl";
import { ChangeEventHandler } from "react";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newLocale = e.target.value;
    router.push(pathname, { locale: newLocale });
  };

  return (
    <>
      <select value={locale} onChange={handleLanguageChange}>
        {languages.map((language) =>
        <option key={language} value={language}>
            {language.toUpperCase()}
          </option>
        )}
      </select>
    </>);

};

export default LanguageSwitcher;