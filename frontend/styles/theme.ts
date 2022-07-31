import { extendTheme, ThemeConfig } from '@chakra-ui/react'

export const colors = {
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
        bg: '#33394F',
        color: 'white',
      },
    },
  },
  fonts: {
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif `,
  },
  colors,
})

export default customTheme
