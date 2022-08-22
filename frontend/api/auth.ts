import axios from 'plugins/axios'
import { SignInTypes, SignUpTypes, TokensTypes } from 'state/auth/types'

export const AuthApi = () => ({
  async signIn(payload: SignInTypes): Promise<TokensTypes> {
    const response: TokensTypes = await axios.post('auth/sign-in', payload)
    return response
  },
  async signUp(payload: SignUpTypes): Promise<TokensTypes> {
    const response: TokensTypes = await axios.post('auth/sign-up', payload)
    return response
  },
  async refreshTokens(refreshToken: string): Promise<TokensTypes> {
    const response: TokensTypes = await axios.post('auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    return response
  },
})
