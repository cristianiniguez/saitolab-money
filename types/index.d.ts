import { financialAccount } from '@/db/schema'

declare global {
  type FinancialAccount = typeof financialAccount.$inferSelect
  type FinancialAccountInsert = typeof financialAccount.$inferInsert
}
