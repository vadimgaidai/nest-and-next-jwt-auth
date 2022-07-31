import styled from 'styled-components'

export const Component = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto 0;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 24px;
    padding-right: 24px;
  }
`
