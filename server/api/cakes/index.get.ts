// import db from '~~/server/db';
// import { cakes } from '~~/server/db/schema/cake-schema';

// export default defineEventHandler(async () => {
//   const allCakes = await db.select().from(cakes);
//   return allCakes;
// });

// import db from '~~/server/db';
// import { cakes } from '~~/server/db/schema/cake-schema';
// import { eq } from 'drizzle-orm';

// export default defineEventHandler(async () => {
//   const allCakes = await db.select().from(cakes);

//   return {
//     message: 'Fetch cakes Successfully',
//     data: allCakes,
//   };
// });

// server/api/cakes/index.ts
import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth'; // your better-auth config
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event); // ✅ server-side session check

  let result;
  if (!session?.user) {
    result = await db
      .select()
      .from(cakes);
  }
  else {
    result = await db
      .select()
      .from(cakes)
      .where(eq(cakes.user_id, session.user.id));
  }

  return {
    message: 'Fetch cakes Successfully',
    data: result,
  };
});
