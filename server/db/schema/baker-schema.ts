import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { createInsertSchema } from 'drizzle-zod';

const baker = mysqlTable('baker', {
  id: int().autoincrement().primaryKey(),
  user_id: varchar({ length: 36 }).notNull(),
  baker_name: varchar({ length: 255 }).notNull(),
  baker_description: varchar({ length: 255 }),
  baker_address: varchar({ length: 255 }).notNull(),
  baker_messenger_link: varchar({ length: 255 }).notNull(),

  createdAt: timestamp().defaultNow(),
});

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
