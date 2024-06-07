import { sql } from "drizzle-orm";
import { pgTable, pgEnum, serial, text, varchar, timestamp, boolean, integer, uuid, smallint, real } from "drizzle-orm/pg-core";


export const accountTypeEnum = pgEnum('account_type', ['not_provided', 'student', 'educator']);
export const ageGroupEnum = pgEnum('age_group', ['teen', 'young_adult', 'adult', 'elder']);
export const experienceLevelEnum = pgEnum('experience_level', ['beginner', 'advanced', 'skilled']);
export const difficultyLevelEnum = pgEnum('difficulty_level', ['easy', 'advanced', 'challenging']);
export const activityTypeEnum = pgEnum('activity_type', ['signed_in', 'lesson_completed']);

export const accessCodes = pgTable('access_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 6 }).unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  firstAccessedAt: timestamp('first_accessed_at', { withTimezone: true }),
  active: boolean('active').default(true).notNull(),
  team: text('team').default("").notNull(),
  expiresAfter: integer('expires_after').default(30).notNull(),
});

export const userData = pgTable("user_data", {
  userId: uuid("user_id").primaryKey(),
  registeredAccessCode: varchar("registered_access_code", { length: 6 }),
  displayName: text("display_name"),
  ageGroup: ageGroupEnum("age_group"),
  experienceLevel: experienceLevelEnum("experience_level").default("beginner").notNull(),
  accountType: accountTypeEnum("account_type").default("student").notNull(),
});

export const chapters = pgTable("chapters", {
  chapterId: text("chapter_id").primaryKey(),
  active: boolean("active").default(true).notNull(),
  locale: varchar("locale", { length: 2 }).notNull(),
  title: text("title").default("").notNull(),
  description: text("description").default("").notNull(),
  difficulty: difficultyLevelEnum("difficulty").default("easy").notNull(),
  iconPath: text("icon_path"),
  thumbnailPath: text("thumbnail_path"),
  lessons: text("lessons").array().notNull().default(sql`'{}'::text[]`),
  position: smallint("position").notNull(),
});

export const lessons = pgTable("lessons", {
  lessonId: text("lesson_id").primaryKey(),
  active: boolean("active").default(true),
  chapter: text("chapter").references(() => chapters.chapterId).notNull(),
  title: text("title").default("").notNull(),
  readTime: smallint("read_time").notNull(),
  position: smallint("position").notNull(),
  linkedLessons: text("linked_lessons").array(),
});

export const progressRecords = pgTable("progress_records", {
  id: serial('id').primaryKey(),
  user: uuid("user").references(() => userData.userId).notNull(),
  lesson: text("lesson").references(() => lessons.lessonId).notNull(),
  progress: real("progress").default(0.0).notNull(),
});

export const activityRecords = pgTable('activity_records', {
  id: serial('id').primaryKey(),
  user: uuid('user').references(() => userData.userId).notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  activityType: activityTypeEnum('activity_type').notNull(),
  lesson: text('lesson').references(() => lessons.lessonId),
});