'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import FinancialAccountForm from '../forms/financial-account-form'
import { updateFinancialAccount } from '@/server/financial-accounts'
import { toast } from 'sonner'
import { PencilIcon } from 'lucide-react'

const UpdateFinancialAccountDialog = ({
  financialAccount
}: {
  financialAccount: FinancialAccount
}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit: React.ComponentPropsWithoutRef<
    typeof FinancialAccountForm
  >['onSubmit'] = async values => {
    try {
      await updateFinancialAccount(financialAccount.id, values)
      toast.success('Financial account updated successfully')
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update financial account')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label={`Edit ${financialAccount.name}`}
          variant='ghost'
          size='icon-sm'
        >
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <FinancialAccountForm
        financialAccount={financialAccount}
        title='Update Financial Account'
        description={`Update ${financialAccount.name}`}
        onSubmit={handleSubmit}
      />
    </Dialog>
  )
}

export default UpdateFinancialAccountDialog
