import { FC } from 'react'
import { Component } from './styles'
import { ContainerTypes } from './types'

const Container: FC<ContainerTypes> = ({ children, as, ...props }: ContainerTypes) => (
  <Component as={as} {...props}>
    {children}
  </Component>
)

Container.defaultProps = {
  as: 'main',
}

export default Container
