import { FormHTMLAttributes } from 'react'
import { FieldValues, Mode, SubmitHandler } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'
import Lazy from 'yup/lib/Lazy'

export interface FormFieldProps {
  name: string
  type: string
  label?: string
}

export interface FormTypes extends FormHTMLAttributes<HTMLFormElement> {
  validation: AnyObjectSchema | Lazy<any, unknown>
  onSubmit: SubmitHandler<FieldValues>
  text?: string
  disabled?: boolean
  mode?: Mode
}
