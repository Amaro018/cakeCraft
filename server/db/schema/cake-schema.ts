import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { createInsertSchema } from 'drizzle-zod';

import { user } from './auth-schema';

const cakes = mysqlTable('cakes', {
  id: int('id').autoincrement().primaryKey(),
  user_id: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  cake_name: varchar('cake_name', { length: 255 }).notNull(),
  cake_description: varchar('cake_description', { length: 255 }),
  cake_price: varchar('cake_price', { length: 255 }).notNull(),
  cake_quantity: varchar('cake_quantity', { length: 255 }).notNull(),
  cake_category: varchar('cake_category', { length: 255 }).notNull(),
  cake_flavour: varchar('cake_flavour', { length: 255 }).notNull(),
  cake_size: varchar('cake_size', { length: 255 }).notNull(),
  cake_topping: varchar('cake_topping', { length: 255 }).notNull(),
  cake_type: varchar('cake_type', { length: 255 }).notNull(),
  cake_weight: varchar('cake_weight', { length: 255 }).notNull(),
  cake_image: varchar('cake_image', { length: 255 }).notNull(), // store URL/path
  createdAt: timestamp('createdAt').defaultNow(),

});

const cakesInsertSchema = createInsertSchema(cakes, {
  cake_name: schema => schema.min(3),
  cake_description: schema => schema.min(3),
  cake_image: schema => schema.min(1),
}).omit({
  id: true,
  createdAt: true,
});

export { cakes, cakesInsertSchema };
