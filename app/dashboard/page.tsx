import DashboardContent from '@/components/dashboard-content'
import CreateFinancialAccountDialog from '@/components/dialogs/create-financial-account-dialog'

const DashboardPage = async () => {
  return (
    <DashboardContent pageKey='dashboard'>
      <CreateFinancialAccountDialog />
    </DashboardContent>
  )
}

export default DashboardPage
