import { Input } from '@chakra-ui/react'
import styled from 'styled-components'

export const FormStyle = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  width: 100%;
  row-gap: 30px;
`

export const Label = styled.label`
  position: relative;
  display: grid;
  row-gap: 8px;
`

export const InputStyle = styled(Input)`
  width: 100%;
  height: auto !important;
  padding: 15px !important;
  color: white;
  background: ${({ theme }) => theme.colors.primary} !important;
  border-radius: 8px !important;
`

export const Error = styled.span`
  position: absolute;
  bottom: -24px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
`
