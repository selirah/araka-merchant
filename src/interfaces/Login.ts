export interface Login {
  EmailAddress: string
  Password: string
}

export interface ForgottenPassword {
  EmailAddress: string
  CallbackURL?: string
}

export interface ResetPassword {
  Password: string
  ProcessId?: string
  Confirm?: string
}
