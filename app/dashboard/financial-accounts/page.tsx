import DashboardContent from '@/components/dashboard-content'
import FinancialAccountsTable from '@/components/tables/financial-accounts-table'
import { readFinancialAccounts } from '@/server/financial-accounts'

const FinancialAccountsPage = async () => {
  const financialAccounts = await readFinancialAccounts()
  return (
    <DashboardContent pageKey='financial-accounts'>
      <FinancialAccountsTable financialAccounts={financialAccounts} />
    </DashboardContent>
  )
}

export default FinancialAccountsPage
