import { CustomInput, InputWrapper } from './input-wrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { LucideIcon } from 'lucide-react'

type SelectInputOption = {
  icon?: LucideIcon
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
                <div className='flex items-center gap-2'>
                  {opt.icon && <opt.icon />}
                  {opt.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </InputWrapper>
  )
}
