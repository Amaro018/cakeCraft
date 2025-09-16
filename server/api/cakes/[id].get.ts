import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth'; // your better-auth config
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event); // ✅ server-side session check

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  // Only return the logged-in user's cakes
  return await db
    .select()
    .from(cakes)
    .where(eq(cakes.user_id, session.user.id));
});
