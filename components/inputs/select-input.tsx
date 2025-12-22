import { CustomInput, InputWrapper } from './input-wrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

type SelectInputOption = {
  label: React.ReactNode
  value: string
}

export const SelectInput: CustomInput<{ options: SelectInputOption[] }> = ({
  options,
  ...props
}) => {
  return (
    <InputWrapper {...props}>
      {({ onBlur, onChange, ...field }) => (
        <Select {...field} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field['aria-invalid']}
            id={field.id}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </InputWrapper>
  )
}
