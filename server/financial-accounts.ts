'use server'

import { and, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { financialAccount } from '@/db/schema'
import { requireUserId } from '@/lib/auth'

type CreateFinancialAccountPayload = Pick<
  FinancialAccountInsert,
  'name' | 'type'
>

export const readFinancialAccounts = async () => {
  const userId = await requireUserId()

  return db
    .select()
    .from(financialAccount)
    .where(eq(financialAccount.userId, userId))
}

export const readFinancialAccountById = async (id: string) => {
  const userId = await requireUserId()

  const result = await db
    .select()
    .from(financialAccount)
    .where(
      and(eq(financialAccount.id, id), eq(financialAccount.userId, userId))
    )
    .limit(1)

  return result[0]
}

export const createFinancialAccount = async (
  payload: CreateFinancialAccountPayload
) => {
  const userId = await requireUserId()

  await db.insert(financialAccount).values({ ...payload, userId })
}
