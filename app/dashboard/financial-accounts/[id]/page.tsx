import { redirect } from 'next/navigation'
import DashboardContent from '@/components/dashboard-content'
import { readFinancialAccountById } from '@/server/financial-accounts'

type FinancialAccountPageProps = {
  params: Promise<{ id: string }>
}

const FinancialAccountPage = async ({ params }: FinancialAccountPageProps) => {
  const { id } = await params
  const financialAccount = await readFinancialAccountById(id)

  if (!financialAccount) return redirect('/dashboard/financial-accounts')

  return <DashboardContent pageKey='financial-account' pageTitle={financialAccount.name}>{financialAccount.name}</DashboardContent>
}

export default FinancialAccountPage
