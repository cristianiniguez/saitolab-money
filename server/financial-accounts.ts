'use server'

import { db } from '@/db/drizzle'
import { financialAccount, FinancialAccountInsert } from '@/db/schema'
import { getUserId } from '@/lib/auth'

type CreateFinancialAccountPayload = Pick<FinancialAccountInsert, 'name' | 'type'>

export const createFinancialAccount = async (
  payload: CreateFinancialAccountPayload
) => {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')

  await db.insert(financialAccount).values({ ...payload, userId })
}
