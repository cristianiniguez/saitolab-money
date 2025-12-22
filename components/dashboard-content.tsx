import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import AppBreadcrumb from './app-breadcrumb'

type DashboardContentProps = {
  children: React.ReactNode
  pageKey: string
}

const DashboardContent = ({ children, pageKey }: DashboardContentProps) => (
  <>
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <AppBreadcrumb pageKey={pageKey} />
      </div>
    </header>

    <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</main>
  </>
)

export default DashboardContent
