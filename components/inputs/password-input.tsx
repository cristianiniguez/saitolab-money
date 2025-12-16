import { Input } from '../ui/input'
import { CustomInput, InputWrapper } from './input-wrapper'

export const PasswordInput: CustomInput = props => (
  <InputWrapper {...props}>
    {field => <Input {...field} type='password' />}
  </InputWrapper>
)
