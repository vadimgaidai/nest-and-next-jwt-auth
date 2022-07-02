// 1. Import the extendTheme function
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
export const colors = {
  text: baseTheme.colors.black,
  active: baseTheme.colors.purple[300],
}

const customTheme = extendTheme({ colors })

export default customTheme
