import DashboardContent from '@/components/dashboard-content'
import CreateFinancialAccountDialog from '@/components/dialogs/create-financial-account-dialog'
import { readFinancialAccounts } from '@/server/financial-accounts'

const DashboardPage = async () => {
  const financialAccounts = await readFinancialAccounts()

  return (
    <DashboardContent>
      <CreateFinancialAccountDialog />
      {financialAccounts.map(account => (
        <p key={account.id}>{account.name}</p>
      ))}
    </DashboardContent>
  )
}

export default DashboardPage
