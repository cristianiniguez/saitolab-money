// drizzle/migrate.ts (This is the file Vercel needs to run)
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

// 1. Get the DB URL from Vercel ENV VAR
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function runMigrations() {
  console.log('Running Drizzle ORM migrate function on production DB...')
  // 2. Run the migration against the live DB using the serverless driver
  await migrate(db, { migrationsFolder: './db/migrations' })
  console.log('Migrations complete!')
}

runMigrations().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
