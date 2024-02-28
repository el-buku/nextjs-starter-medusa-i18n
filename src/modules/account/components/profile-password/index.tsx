"use client"
import k from "@lib/i18n/translations/keys"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { updateCustomerPassword } from "@modules/account/actions"
import { useFormState } from "react-dom"
import { useSafeTranslations } from "@lib/i18n/use-safe-translations"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const t = useSafeTranslations()

  const [state, formAction] = useFormState(updateCustomerPassword, {
    customer,
    success: false,
    error: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={<span>{t(k.THE_PASSWORD_IS_NOT_SHOWN_FOR)}</span>}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Old password"
            name="old_password"
            required
            type="password"
          />

          <Input
            label="New password"
            type="password"
            name="new_password"
            required
          />

          <Input
            label="Confirm password"
            type="password"
            name="confirm_password"
            required
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
