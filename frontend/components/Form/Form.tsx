import { FC, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormTypes } from './types'
import { FormStyle, SubmitButton } from './styles'

const Form: FC<FormTypes> = ({
  validation,
  mode = 'onChange',
  text,
  children,
  disabled,
  onSubmit,
}) => {
  const methods = useForm({
    mode,
    resolver: yupResolver(validation),
  })

  const isValid = useMemo(() => {
    if (disabled) {
      return disabled
    }
    return methods.formState.isValid || methods.formState.isSubmitting
  }, [disabled, methods.formState.isSubmitting, methods.formState.isValid])

  return (
    <FormProvider {...methods}>
      <FormStyle onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <SubmitButton disabled={!isValid} type="submit">
          {text}
        </SubmitButton>
      </FormStyle>
    </FormProvider>
  )
}

export default Form
