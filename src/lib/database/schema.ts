import { pgTable, serial, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const accessCodes = pgTable('access_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 6 }).unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  firstAccessedAt: timestamp('first_accessed_at', { withTimezone: true }),
  active: boolean('active').notNull(),
  team: text('team').default("").notNull(),
  expiresAfter: integer('expires_after').default(30).notNull(),
});