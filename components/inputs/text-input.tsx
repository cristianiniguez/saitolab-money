import { Input } from '../ui/input'
import { CustomInput, InputWrapper } from './input-wrapper'

export const TextInput: CustomInput = props => (
  <InputWrapper {...props}>
    {field => <Input {...field} type='text' />}
  </InputWrapper>
)
