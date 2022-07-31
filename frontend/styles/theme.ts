import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { breakpoints } from './breakpoints'
import { Colors } from './types'

export const colors: Colors = {
  text: '#FFFFFF',
  primary: '#33394F',
  secondary: '#FC728B',
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: colors.primary,
        color: 'white',
      },
    },
  },
  breakpoints,
  fonts: {
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif `,
  },
  colors,
})

export default customTheme
