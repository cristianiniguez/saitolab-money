import React from 'react'
import DashboardHeader from './dashboard-header'

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
    </>
  )
}

export default DashboardContent
