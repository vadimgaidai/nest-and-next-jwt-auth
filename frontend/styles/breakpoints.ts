import { Breakpoints, MediaQueries } from './types'

export const breakpointMap: { [key: string]: number } = {
  sm: 500,
  md: 900,
  lg: 1400,
  xl: 1920,
}

export const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
)

export const mediaQueries: MediaQueries = {
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
}
