import db from '~~/server/db';
import { cakes, cakesUpdateSchema } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth';
import { eq } from 'drizzle-orm';
import { readMultipartFormData } from 'h3';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const id = Number(event.context.params?.id);
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' });
  }

  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received' });
  }

  // Parse form
  const parsedBody: Record<string, any> = {};

  for (const field of form) {
    if (field.type === 'file' && field.data && field.filename) {
    // 🟢 Handle image upload
      const fileName = `${Date.now()}-${field.filename}`;
      const uploadPath = path.join(process.cwd(), 'public/uploads', fileName);
      fs.writeFileSync(uploadPath, field.data);
      parsedBody.cake_image = fileName;
    }
    else if (field.name) {
    // 🚫 Skip cake_image if it's coming as text
      if (field.name === 'cake_image')
        continue;
      parsedBody[field.name] = field.data.toString();
    }
  }

  // ✅ Validate with update schema (all optional)
  const safeData = cakesUpdateSchema.parse(parsedBody);

  // ✅ Update DB safely
  const updated = await db
    .update(cakes)
    .set({
      ...safeData,
      updatedAt: new Date(), // ensure proper timestamp
    })
    .where(eq(cakes.id, id));

  return {
    success: true,
    cake: updated,
    message: 'Cake updated successfully',
  };
});
