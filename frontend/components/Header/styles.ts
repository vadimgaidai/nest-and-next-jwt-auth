import { Text, List as ChakraList } from '@chakra-ui/react'
import styled from 'styled-components'

export const Content = styled.header`
  padding: 15px 0;
`
export const List = styled(ChakraList)`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  column-gap: 15px;
`

export const LinkText = styled(Text)`
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`
