import { pgTable, pgEnum, serial, text, varchar, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";

export const accessCodes = pgTable('access_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 6 }).unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  firstAccessedAt: timestamp('first_accessed_at', { withTimezone: true }),
  active: boolean('active').notNull(),
  team: text('team').default("").notNull(),
  expiresAfter: integer('expires_after').default(30).notNull(),
});

export const accountTypeEnum = pgEnum('account_type', ['not_provided', 'student', 'educator']);
export const ageGroupEnum = pgEnum('age_group', ['teen', 'young_adult', 'adult', 'elder']);
export const experienceLevelEnum = pgEnum('experience_level', ['beginner', 'advanced', 'skilled']);

export const userData = pgTable("user_data", {
  userId: uuid("user_id").primaryKey(),
  registeredAccessCode: varchar("registered_access_code", { length: 6 }),
  displayName: text("display_name"),
  ageGroup: ageGroupEnum("age_group"),
  experienceLevel: experienceLevelEnum("experience_level").default("beginner").notNull(),
  accountType: accountTypeEnum("account_type").default("student").notNull(),
})