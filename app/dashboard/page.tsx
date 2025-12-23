import Link from 'next/link'
import DashboardContent from '@/components/dashboard-content'
import { Button } from '@/components/ui/button'

const DashboardPage = async () => {
  return (
    <DashboardContent pageKey='dashboard'>
      <Button>
        <Link href='/dashboard/financial-accounts'>
          View Financial Accounts
        </Link>
      </Button>
    </DashboardContent>
  )
}

export default DashboardPage
