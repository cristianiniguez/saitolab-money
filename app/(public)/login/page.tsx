import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'
import { GoogleButton } from '@/components/google-button'

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>Welcome back</CardTitle>
        <CardDescription>Login with your Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <GoogleButton>Login with Google</GoogleButton>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
