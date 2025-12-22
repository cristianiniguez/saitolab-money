'use client'

import Link from 'next/link'
import { ChevronRight, DollarSign } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'

type NavMainProps = {
  financialAccounts: FinancialAccountSelect[]
}

export function NavMain({ financialAccounts }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>SaitoLab Money</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className='group/collapsible'>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Financial Accounts'>
                <DollarSign />
                <span>Financial Accounts</span>
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {financialAccounts.map(account => (
                  <SidebarMenuSubItem key={account.id}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={`/dashboard/financial-accounts/${account.id}`}
                      >
                        <span>{account.name}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
