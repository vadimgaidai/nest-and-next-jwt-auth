import { FC } from 'react'
import { Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { FormFieldProps } from './types'

export const FormField: FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext()

  return (
    <label htmlFor={name}>
      {label && <Text>{label}</Text>}
      <Input {...register(name)} type={type} isInvalid={!!formState.errors[name]} />
      <span>{formState.errors[name]?.message ? String(formState.errors[name]?.message) : ''}</span>
    </label>
  )
}
