import { Button } from '@chakra-ui/react'
import styled from 'styled-components'

export const FormStyle = styled.form`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  row-gap: 30px;
`

export const SubmitButton = styled(Button)`
  position: sticky;
  bottom: 0;
`
