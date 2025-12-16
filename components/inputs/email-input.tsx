import { Input } from '../ui/input'
import { CustomInput, InputWrapper } from './input-wrapper'

export const EmailInput: CustomInput = props => (
  <InputWrapper {...props}>
    {field => <Input {...field} type='email' />}
  </InputWrapper>
)
