import DashboardContent from '@/components/dashboard-content'
import CreateFinancialAccountDialog from '@/components/dialogs/create-financial-account-dialog'
import FinancialAccountsTable from '@/components/tables/financial-accounts-table'
import { readFinancialAccounts } from '@/server/financial-accounts'

const FinancialAccountsPage = async () => {
  const financialAccounts = await readFinancialAccounts()

  return (
    <DashboardContent pageKey='financial-accounts'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>All My Financial Accounts</h1>
        <div className='flex items-center gap-2'>
          <CreateFinancialAccountDialog />
        </div>
      </div>

      <FinancialAccountsTable financialAccounts={financialAccounts} />
    </DashboardContent>
  )
}

export default FinancialAccountsPage
