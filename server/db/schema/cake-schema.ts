import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

const cakes = sqliteTable('cakes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: text('user_id').notNull(),
  cake_name: text('cake_name').notNull(),
  cake_description: text('cake_description'),
  cake_price: text('cake_price').notNull(),
  cake_category: text('cake_category').notNull(),
  cake_flavor: text('cake_flavor').notNull(),
  cake_size: text('cake_size').notNull(),
  cake_topping: text('cake_topping').notNull(),
  cake_type: text('cake_type').notNull(),
  good_for: text('good_for').notNull(),
  cake_image: text('cake_image').notNull(),
  createdAt: integer('createdAt').$defaultFn(() => Date.now()), // store as Unix timestamp (ms)
  updatedAt: integer('updatedAt').$defaultFn(() => Date.now()), // update with logic if needed
});

// ✅ Insert schema
const cakesInsertSchema = createInsertSchema(cakes, {
  cake_name: schema => schema.min(3),
  cake_description: schema => schema.min(3),
  cake_image: schema => schema.min(1),
  cake_price: schema => schema.min(1),
  cake_category: schema => schema.min(1),
  cake_flavor: schema => schema.min(1),
  cake_size: schema => schema.min(1),
  cake_topping: schema => schema.min(1),
  cake_type: schema => schema.min(1),
  good_for: schema => schema.min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ✅ Update schema (all optional)
const cakesUpdateSchema = cakesInsertSchema.partial();

export { cakes, cakesInsertSchema, cakesUpdateSchema };
