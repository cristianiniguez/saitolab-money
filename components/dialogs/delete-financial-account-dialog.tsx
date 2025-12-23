'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { deleteFinancialAccount } from '@/server/financial-accounts'
import { TrashIcon } from 'lucide-react'

const DeleteFinancialAccountDialog = ({
  financialAccount
}: {
  financialAccount: FinancialAccount
}) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await deleteFinancialAccount(financialAccount.id)
      toast.success('Financial account deleted successfully')
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete financial account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label={`Delete ${financialAccount.name}`}
          variant='ghost'
          size='icon-sm'
        >
          <TrashIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Financial Account</DialogTitle>
          <DialogDescription>Delete {financialAccount.name}</DialogDescription>
        </DialogHeader>
        Are you sure you want to delete {financialAccount.name}?
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button disabled={isSubmitting} onClick={handleSubmit} variant='destructive'>
            {isSubmitting ? <Spinner /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteFinancialAccountDialog
