'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
// components
import { TextInput } from '../inputs/text-input'
import { EmailInput } from '../inputs/email-input'
import { PasswordInput } from '../inputs/password-input'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from '../ui/field'
import { Spinner } from '../ui/spinner'
import { GoogleButton } from '../google-button'
// server
import { signUp } from '@/server/users'
// lib
import { cn } from '@/lib/utils'

const formSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8)
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUp({ ...values, name: values.username })
      toast.success('Signup successful')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Signup failed')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <GoogleButton>Signup with Google</GoogleButton>
              </Field>

              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>

              <TextInput
                control={form.control}
                label='Username'
                name='username'
              />

              <EmailInput control={form.control} label='Email' name='email' />

              <PasswordInput
                control={form.control}
                label='Password'
                name='password'
              />

              <Field>
                <Button disabled={form.formState.isSubmitting} type='submit'>
                  {form.formState.isSubmitting ? <Spinner /> : 'Signup'}
                </Button>
                <FieldDescription className='text-center'>
                  Already have an account? <Link href='/login'>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
