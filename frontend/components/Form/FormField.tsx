import { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { FormFieldProps } from './types'
import { InputStyle, Label, Error } from './styles'

export const FormField: FC<FormFieldProps> = ({ name, label, type, placeholder }) => {
  const { register, formState } = useFormContext()

  return (
    <Label htmlFor={name}>
      {label && <Text fontWeight="600">{label}</Text>}
      <InputStyle
        {...register(name)}
        size="lg"
        placeholder={placeholder}
        type={type}
        isInvalid={!!formState.errors[name]}
      />
      <Error>
        {formState.errors[name]?.message ? String(formState.errors[name]?.message) : ''}
      </Error>
    </Label>
  )
}
