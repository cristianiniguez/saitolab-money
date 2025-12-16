'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
// components
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
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

              <Controller
                name='username'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                    <Input
                      {...field}
                      id='username'
                      aria-invalid={fieldState.invalid}
                      type='text'
                      required
                    />
                  </Field>
                )}
              />

              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                    <Input
                      {...field}
                      id='email'
                      aria-invalid={fieldState.invalid}
                      type='email'
                      placeholder='m@example.com'
                      required
                    />
                  </Field>
                )}
              />

              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <a
                        href='#'
                        className='ml-auto text-sm underline-offset-4 hover:underline'
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      {...field}
                      id='password'
                      aria-invalid={fieldState.invalid}
                      type='password'
                      required
                    />
                  </Field>
                )}
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
