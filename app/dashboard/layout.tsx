import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { readFinancialAccounts } from '@/server/financial-accounts'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const financialAccounts = await readFinancialAccounts()

  return (
    <SidebarProvider>
      <AppSidebar financialAccounts={financialAccounts} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
