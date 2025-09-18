import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth';
import { and, eq } from 'drizzle-orm';
import { readMultipartFormData } from 'h3';
import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  // ✅ Require session
  await auth.api.getSession(event);

  // ✅ Parse ID from route params
  const id = Number(event.context.params?.id);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ID',
      message: 'Cake ID is required in the request URL.',
    });
  }

  // ✅ Parse multipart form (instead of readBody)
  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No form data received',
    });
  }

  // Convert fields into object
  const parsedBody: Record<string, any> = {};
  let fileName: string | null = null;

  for (const field of form) {
    if (field.type === 'file' && field.data && field.filename) {
      // ✅ Handle image upload
      fileName = `${Date.now()}-${field.filename}`;
      const uploadPath = path.join(process.cwd(), 'public/uploads', fileName);
      fs.writeFileSync(uploadPath, field.data);
      parsedBody.cake_image = fileName;
    }
    else if (field.name) {
      parsedBody[field.name] = field.data.toString();
    }
  }

  // ✅ Update DB
  const updatedCake = await db
    .update(cakes)
    .set(parsedBody)
    .where(eq(cakes.id, id));

  return {
    success: true,
    cake: updatedCake[0],
    message: 'Cake updated successfully',
  };
});
