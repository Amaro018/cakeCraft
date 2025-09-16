import db from '~~/server/db';
import { baker, bakerInsertSchema } from '~~/server/db/schema/baker-schema';
import { auth } from '~~/server/lib/auth';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await auth.api.getSession(event);

  const parsedBody = bakerInsertSchema.parse(body);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const updatedBaker = await db.update(baker).set(parsedBody).where(eq(baker.user_id, session.user.id));

  return {
    success: updatedBaker,
    message: 'Baker updated successfully',
  };
});
