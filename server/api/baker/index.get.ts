import db from '~~/server/db';
import { baker } from '~~/server/db/schema/baker-schema';
import { auth } from '~~/server/lib/auth';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  let result;
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
  else {
    result = await db
      .select()
      .from(baker)
      .where(eq(baker.user_id, session.user.id));
  }
  // const userId = event.context.params?.userId;
  // if (!userId) {
  //   throw createError({ statusCode: 400, statusMessage: 'User ID required' });
  // }

  // const result = await db.select().from(baker).where(eq(baker.user_id, userId)).limit(1);

  // if (!result.length) {
  //   throw createError({ statusCode: 404, statusMessage: 'Baker not found' });
  // }

  return { message: 'Baker fetched Successfully', data: result };
});
