import k from "@lib/i18n/translations/keys"
import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)
  const t = useSafeTranslations()

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">{t(k.WELCOME_BACK)}</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        {t(k.SIGN_IN_TO_ACCESS_AN_ENHANCED)}
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <ErrorMessage error={message} />
        <SubmitButton className="w-full mt-6">{t(k.SIGN_IN)}</SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {t(k.NOT_A_MEMBER)}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          {t(k.JOIN_US)}
        </button>
        {t(k._)}
      </span>
    </div>
  )
}

export default Login
