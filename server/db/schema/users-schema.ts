import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

// SQLite-compatible users table
const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('createdAt').$defaultFn(() => Date.now()),
});

// Zod insert schema
const userInsertSchema = createInsertSchema(users, {
  name: schema => schema.min(3),
  email: schema => schema.min(3),
  password: schema => schema.min(8, { message: 'minimum of 8 chars' }),
}).omit({
  id: true,
  createdAt: true,
});

export { userInsertSchema, users };
