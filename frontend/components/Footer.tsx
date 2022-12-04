import { FC } from 'react'
import { Link } from '@chakra-ui/react'
import styled from 'styled-components'
import { Container } from './Container'

const ContainerStyle = styled(Container)`
  padding: 15px 0;
  text-align: center;
`

const Footer: FC = () => (
  <ContainerStyle as="footer">
    <Link href="https://github.com/vadimgaidai" target="_blank" rel="noreferrer">
      @github
    </Link>
  </ContainerStyle>
)

export default Footer
