import { FC, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@chakra-ui/react'
import { FormTypes } from './types'
import { FormStyle } from './styles'

const Form: FC<FormTypes> = ({
  validation,
  mode = 'onChange',
  text,
  loading,
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
        <Button type="submit" color="secondary" size="lg" disabled={loading || !isValid}>
          {loading ? 'Loading...' : text}
        </Button>
      </FormStyle>
    </FormProvider>
  )
}

export default Form
