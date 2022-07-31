import React from 'react'
import styled from 'styled-components'
import { Container } from './Container'

const Component = styled.footer`
  padding: 15px 0;
`

const Footer = () => (
  <Component>
    <Container as="div">Footer</Container>
  </Component>
)

export default Footer
