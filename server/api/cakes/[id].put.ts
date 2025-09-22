import db from '~~/server/db';
import { cakes, cakesUpdateSchema } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth';
import { eq } from 'drizzle-orm';
import { readMultipartFormData } from 'h3';
import fs from 'node:fs';
import path from 'node:path';

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

  const parsedBody: Record<string, any> = {};
  let uploadedImage: string | null = null;
  let existingImage: string | null = null;

  for (const field of form) {
    if (field.filename) {
      // ✅ New image uploaded
      const fileName = `${Date.now()}-${field.filename}`;
      const uploadPath = path.join(process.cwd(), 'public/uploads', fileName);
      fs.writeFileSync(uploadPath, field.data);
      uploadedImage = fileName;
    }
    else if (field.name) {
      const value = field.data.toString();
      if (field.name === 'existing_image') {
        existingImage = value; // fallback if no new file
      }
      else if (field.name !== 'cake_image') {
        parsedBody[field.name] = value;
      }
    }
  }

  console.warn('susi🔑', uploadedImage, existingImage);

  // 🔑 Determine which image to keep
  if (uploadedImage) {
    parsedBody.cake_image = uploadedImage;
  }
  else if (existingImage) {
    parsedBody.cake_image = existingImage;
  }

  // ✅ Validate (all optional in update schema)
  const safeData = cakesUpdateSchema.parse(parsedBody);

  const updated = await db
    .update(cakes)
    .set({
      ...safeData,
      updatedAt: new Date(),
    })
    .where(eq(cakes.id, id));

  return {
    success: true,
    cake: updated,
    message: 'Cake updated successfully',
  };
});
