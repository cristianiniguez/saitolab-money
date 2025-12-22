import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { SelectInput } from '@/components/inputs/select-input'
import { TextInput } from '@/components/inputs/text-input'

const formSchema = z.object({
  name: z.string().min(3),
  type: z.enum(['bank', 'cash', 'crypto'])
})

type FinancialAccountFormProps = {
  title: string
  description: string
  onSubmit: (values: z.infer<typeof formSchema>) => void
}

const FinancialAccountForm = ({
  title,
  description,
  onSubmit
}: FinancialAccountFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: undefined
    }
  })

  return (
    <DialogContent>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <TextInput control={form.control} label='Name' name='name' />
          <SelectInput
            control={form.control}
            label='Type'
            name='type'
            options={[
              { label: 'Bank', value: 'bank' },
              { label: 'Cash', value: 'cash' },
              { label: 'Crypto', value: 'crypto' }
            ]}
          />
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button disabled={form.formState.isSubmitting} type='submit'>
            {form.formState.isSubmitting ? <Spinner /> : 'Save changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default FinancialAccountForm
