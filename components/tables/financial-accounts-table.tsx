'use client'

import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { DataTable } from '../ui/data-table'
import { BitcoinIcon, CoinsIcon, EyeIcon, LandmarkIcon } from 'lucide-react'
import UpdateFinancialAccountDialog from '../dialogs/update-financial-account-dialog'
import DeleteFinancialAccountDialog from '../dialogs/delete-financial-account-dialog'

const mapFinancialAccountTypeToMeta = {
  bank: { icon: LandmarkIcon, label: 'Bank' },
  cash: { icon: CoinsIcon, label: 'Cash' },
  crypto: { icon: BitcoinIcon, label: 'Crypto' }
}

const FinancialAccountType = ({ type }: { type: FinancialAccount['type'] }) => {
  const { icon: Icon, label } = mapFinancialAccountTypeToMeta[type]
  return (
    <div className='flex items-center gap-2'>
      <Icon />
      {label}
    </div>
  )
}

const FinancialAccountActions = ({
  financialAccount
}: {
  financialAccount: FinancialAccount
}) => {
  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        aria-label={`View ${financialAccount.name}`}
        asChild
        variant='ghost'
        size='icon-sm'
      >
        <Link href={`/dashboard/financial-accounts/${financialAccount.id}`}>
          <EyeIcon />
        </Link>
      </Button>
      <UpdateFinancialAccountDialog financialAccount={financialAccount} />
      <DeleteFinancialAccountDialog financialAccount={financialAccount} />
    </div>
  )
}

const columns: ColumnDef<FinancialAccount>[] = [
  { accessorKey: 'name', header: 'Name', id: 'name' },
  {
    accessorKey: 'type',
    header: 'Type',
    id: 'type',
    cell: ({ cell }) => {
      const type = cell.getValue<FinancialAccount['type']>()
      return <FinancialAccountType type={type} />
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <FinancialAccountActions financialAccount={row.original} />
    )
  }
]

const FinancialAccountsTable = ({
  financialAccounts
}: {
  financialAccounts: FinancialAccount[]
}) => {
  return <DataTable columns={columns} data={financialAccounts} />
}

export default FinancialAccountsTable
