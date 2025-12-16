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
import { signIn } from '@/server/users'
// lib
import { cn } from '@/lib/utils'

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values)
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Login failed')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <GoogleButton>Login with Google</GoogleButton>
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>

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
                  {form.formState.isSubmitting ? <Spinner /> : 'Login'}
                </Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup'>Sign up</Link>
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
