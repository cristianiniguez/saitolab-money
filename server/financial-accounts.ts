'use server'

import { and, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { financialAccount } from '@/db/schema'
import { requireUserId } from '@/lib/auth'

type CreateUpdateFinancialAccountPayload = Pick<
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
  payload: CreateUpdateFinancialAccountPayload
) => {
  const userId = await requireUserId()

  await db.insert(financialAccount).values({ ...payload, userId })
}

export const updateFinancialAccount = async (
  id: string,
  payload: CreateUpdateFinancialAccountPayload
) => {
  const userId = await requireUserId()

  await db
    .update(financialAccount)
    .set(payload)
    .where(
      and(eq(financialAccount.id, id), eq(financialAccount.userId, userId))
    )
}

export const deleteFinancialAccount = async (id: string) => {
  const userId = await requireUserId()

  await db
    .delete(financialAccount)
    .where(
      and(eq(financialAccount.id, id), eq(financialAccount.userId, userId))
    )
}
