import { financialAccount } from '@/db/schema'

declare global {
  type FinancialAccountSelect = typeof financialAccount.$inferSelect
  type FinancialAccountInsert = typeof financialAccount.$inferInsert
}
