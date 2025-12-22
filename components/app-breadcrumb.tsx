'use client'

import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'
import clsx from 'clsx'

const pageKeysHierarchy = {
  dashboard: ['financial-accounts'],
  'financial-accounts': ['financial-account']
}

const getParentPageKey = (pageKey: string) => {
  return Object.entries(pageKeysHierarchy).find(([, values]) =>
    values.includes(pageKey)
  )?.[0]
}

const getBreadcrumbPageKeys = (pageKey: string): string[] => {
  const parentPageKey = getParentPageKey(pageKey)
  return parentPageKey
    ? [...getBreadcrumbPageKeys(parentPageKey), pageKey]
    : [pageKey]
}

const mapPageKeyToMeta: Record<string, { title: string; href?: string }> = {
  dashboard: { title: 'Dashboard', href: '/dashboard' },
  'financial-accounts': {
    title: 'Financial Accounts',
    href: '/dashboard/financial-accounts'
  },
  'financial-account': { title: 'Financial Account' }
}

const AppBreadcrumb = ({ pageKey }: { pageKey: string }) => {
  const pageKeys = getBreadcrumbPageKeys(pageKey)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pageKeys.map((pk, index) => {
          const isLast = index === pageKeys.length - 1
          const { title = pk, href } = mapPageKeyToMeta[pk] || {}

          return (
            <Fragment key={pk}>
              <BreadcrumbItem
                className={clsx(isLast ? 'block' : 'hidden', 'md:block')}
              >
                {!isLast && href ? (
                  <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className='hidden md:block' />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default AppBreadcrumb
