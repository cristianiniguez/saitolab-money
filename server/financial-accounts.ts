'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { financialAccount, FinancialAccountInsert } from '@/db/schema'
import { getUserId } from '@/lib/auth'

type CreateFinancialAccountPayload = Pick<FinancialAccountInsert, 'name' | 'type'>

export const readFinancialAccounts = async () => {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')

  return db.select().from(financialAccount).where(eq(financialAccount.userId, userId))
}

export const createFinancialAccount = async (
  payload: CreateFinancialAccountPayload
) => {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')

  await db.insert(financialAccount).values({ ...payload, userId })
}
