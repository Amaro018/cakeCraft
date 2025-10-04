import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema'; // Adapted for sqlite-core
import { auth } from '~~/server/lib/auth';
import cloudinary from '~~/server/lib/cloudinary';
import formidable from 'formidable';
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true, // keep original extension
  });

  const [fields, files] = await form.parse(event.node.req);

  const getField = (f: string | string[] | undefined): string | null =>
    f ? (Array.isArray(f) ? f[0] : f) : null;

  const cake_name = getField(fields.cake_name)!;
  const cake_description = getField(fields.cake_description);
  const cake_price = getField(fields.cake_price)!;
  const cake_category = getField(fields.cake_category)!;
  const cake_flavor = getField(fields.cake_flavor)!;
  const cake_size = getField(fields.cake_size)!;
  const cake_topping = getField(fields.cake_topping)!;
  const cake_type = getField(fields.cake_type)!;
  const good_for = getField(fields.good_for)!;

  // ✅ Upload to Cloudinary
  let cloudinaryUrl: string | null = null;
  const file = files.cake_image?.[0];
  if (file) {
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'cake_craft/cakes', // optional folder in Cloudinary
      use_filename: true,
      unique_filename: false,
      resource_type: 'image',
    });
    cloudinaryUrl = upload.secure_url;

    // (Optional) Clean up temp file
    fs.unlink(file.filepath, () => {});
  }

  // ✅ Insert into DB (SQLite with drizzle-orm)
  const result = await db
    .insert(cakes)
    .values({
      user_id: session.user.id,
      cake_name,
      cake_description: cake_description ?? '',
      cake_price,
      cake_category,
      cake_flavor,
      cake_size,
      cake_topping,
      cake_type,
      good_for,
      cake_image: cloudinaryUrl ?? '', // store Cloudinary URL
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .run();

  return {
    success: true,
    data: result,
    message: 'Cake created successfully',
  };
});
