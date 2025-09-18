import db from '~~/server/db';
import { user } from '~~/server/db/schema/auth-schema';

export default defineEventHandler(async () => {
  const result = await db.select().from(user);
  const userCount = result.length;
  return {
    message: 'Fetch user count Successfully',
    data: userCount,
  };
});
