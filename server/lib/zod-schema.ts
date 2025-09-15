import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

const cakeSchema = z.object({
  user_id: z.string(),
  cake_name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  cake_description: z.string(),
  cake_price: z.number(),
  cake_category: z.string(),
  cake_flavor: z.string(),
  cake_size: z.string(),
  cake_topping: z.string(),
  cake_type: z.string(),
  good_for: z.string(),
  cake_image: z.file().nullable(),
});

export { cakeSchema, loginSchema };

export type Cake = z.infer<typeof cakeSchema>;
