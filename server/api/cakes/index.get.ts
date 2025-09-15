// import db from '~~/server/db';
// import { cakes } from '~~/server/db/schema/cake-schema';

// export default defineEventHandler(async () => {
//   const allCakes = await db.select().from(cakes);
//   return allCakes;
// });

import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const allCakes = await db.select().from(cakes);

  return {
    message: 'Fetch cakes Successfully',
    data: allCakes,
  };
});
