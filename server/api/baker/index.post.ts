import db from '~~/server/db';
import { baker, bakerInsertSchema } from '~~/server/db/schema/baker-schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = bakerInsertSchema.parse(body);
  const newBaker = await db.insert(baker).values(parsedBody).$returningId();
  return { message: 'Baker created Successfully', data: newBaker };
});
