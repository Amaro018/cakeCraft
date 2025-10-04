import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

// SQLite-compatible baker table
const baker = sqliteTable('baker', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // SQLite uses 'integer' for autoincrement
  user_id: text('user_id').notNull(),
  baker_name: text('baker_name').notNull(),
  baker_description: text('baker_description'),
  baker_address: text('baker_address').notNull(),
  baker_messenger_link: text('baker_messenger_link').notNull(),
  createdAt: integer('created_at').$defaultFn(() => Date.now()), // store timestamp as unix epoch (ms)
});

// If you want ISO string timestamps, use text('created_at').$defaultFn(() => new Date().toISOString())

const bakerInsertSchema = createInsertSchema(baker, {
  baker_name: schema => schema.min(1),
  baker_address: schema => schema.min(1),
  baker_messenger_link: schema => schema.min(1),
  baker_description: schema => schema.min(1),
}).omit({
  id: true,
  createdAt: true,
});

export { baker, bakerInsertSchema };
