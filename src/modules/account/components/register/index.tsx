"use client"
import k from "@lib/i18n/translations/keys"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)
  const t = useSafeTranslations()

  return (
    <div className="max-w-sm flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">
        {t(k.BECOME_A_MEDUSA_STORE_MEMBER)}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {t(k.CREATE_YOUR_MEDUSA_STORE_MEMBE)}
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t(k.FIRST_NAME)}
            name="first_name"
            required
            autoComplete="given-name"
          />

          <Input
            label={t(k.LAST_NAME)}
            name="last_name"
            required
            autoComplete="family-name"
          />

          <Input
            label={t(k.EMAIL)}
            name="email"
            required
            type="email"
            autoComplete="email"
          />

          <Input
            label={t(k.PHONE)}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <Input
            label={t(k.PASS)}
            name="password"
            required
            type="password"
            autoComplete="new-password"
          />
        </div>
        <ErrorMessage error={message} />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          {t(k.BY_CREATING_AN_ACCOUNT_YOU_AG)}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            {t(k.PRIVACY_POLICY)}
          </LocalizedClientLink>{" "}
          {t(k.AND)}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            {t(k.TERMS_OF_USE)}
          </LocalizedClientLink>
          {t(k._)}
        </span>
        <SubmitButton className="w-full mt-6">{t(k.JOIN)}</SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {t(k.ALREADY_A_MEMBER)}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {t(k.SIGN_IN)}
        </button>
        {t(k._)}
      </span>
    </div>
  )
}

export default Register
