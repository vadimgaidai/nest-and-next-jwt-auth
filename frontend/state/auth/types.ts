export interface SignInTypes {
  email: string
  password: string
}

export interface SignUpTypes {
  email: string
  password: string
  name?: string
}

export interface TokensTypes {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface AuthStateTypes {}
