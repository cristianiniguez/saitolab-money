'use client'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail
} from '@/components/ui/sidebar'

type AppSidebarProps = {
  financialAccounts: FinancialAccountSelect[]
}

export function AppSidebar({ financialAccounts }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <NavMain financialAccounts={financialAccounts} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
