'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import FinancialAccountForm from '../forms/financial-account-form'

const CreateFinancialAccountDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Create Financial Account</Button>
      </DialogTrigger>

      <FinancialAccountForm title='Create Financial Account' description='Create a new financial account' />
    </Dialog>
  )
}

export default CreateFinancialAccountDialog
