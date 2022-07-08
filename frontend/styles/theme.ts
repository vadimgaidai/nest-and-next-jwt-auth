// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
export const colors = {
  text: '#FFFFFF',
  input: '#33394F',
  primary: '#FC728B',
  background: '#202433',
}

const customTheme = extendTheme({ colors })

export default customTheme
