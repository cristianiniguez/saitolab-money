import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'

type CustomInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = {
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control']
  label: React.ReactNode
  name: TName
}

export type CustomInput<ExtraProps extends Record<string, unknown> = Record<never, never>> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>(
  props: CustomInputProps<TFieldValues, TName, TTransformedValues> & ExtraProps
) => React.ReactNode

type InputWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = CustomInputProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    field: ControllerRenderProps<TFieldValues, TName> & {
      'aria-invalid': boolean
      id: string
    }
  ) => React.ReactNode
}

export function InputWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  children,
  control,
  label,
  name
}: InputWrapperProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {children({ ...field, 'aria-invalid': fieldState.invalid, id: name })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
