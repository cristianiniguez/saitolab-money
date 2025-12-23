'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import FinancialAccountForm from '../forms/financial-account-form'
import { createFinancialAccount } from '@/server/financial-accounts'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

const CreateFinancialAccountDialog = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit: React.ComponentPropsWithoutRef<
    typeof FinancialAccountForm
  >['onSubmit'] = async values => {
    try {
      await createFinancialAccount(values)
      toast.success('Financial account created successfully')
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to create financial account')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <PlusIcon />
          <span className='hidden lg:inline'>Create Financial Account</span>
        </Button>
      </DialogTrigger>

      <FinancialAccountForm
        title='Create Financial Account'
        description='Create a new financial account'
        onSubmit={handleSubmit}
      />
    </Dialog>
  )
}

export default CreateFinancialAccountDialog
