import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { auth } from '~~/server/lib/auth';
import cloudinary from '~~/server/lib/cloudinary';
import { eq } from 'drizzle-orm';
import formidable from 'formidable';
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const id = Number(event.context.params?.id);
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid Cake ID' });
  }

  // ✅ Parse multipart form
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });
  const [fields, files] = await form.parse(event.node.req);

  const getField = (f: string | string[] | undefined): string | null =>
    f ? (Array.isArray(f) ? f[0] : f) : null;

  // Extract fields
  const cake_name = getField(fields.cake_name);
  const cake_description = getField(fields.cake_description);
  const cake_price = getField(fields.cake_price);
  const cake_category = getField(fields.cake_category);
  const cake_flavor = getField(fields.cake_flavor);
  const cake_size = getField(fields.cake_size);
  const cake_topping = getField(fields.cake_topping);
  const cake_type = getField(fields.cake_type);
  const good_for = getField(fields.good_for);
  const existing_image = getField(fields.existing_image);

  // ✅ Get current cake to know the old image URL
  const [currentCake] = await db.select().from(cakes).where(eq(cakes.id, id));
  if (!currentCake) {
    throw createError({ statusCode: 404, statusMessage: 'Cake not found' });
  }

  // ✅ Handle optional image upload
  let cloudinaryUrl: string | null = null;
  const file = files.cake_image?.[0];
  if (file) {
    // Upload new image
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'cake_craft/cakes',
      use_filename: true,
      unique_filename: false,
      resource_type: 'image',
    });
    cloudinaryUrl = upload.secure_url;
    fs.unlink(file.filepath, () => {
      console.warn('Deleted temp file:', file.filepath);
    });

    // Delete old Cloudinary image if it exists
    if (currentCake.cake_image?.includes('res.cloudinary.com')) {
      const match = currentCake.cake_image.match(/cake_craft\/cakes\/([^/.]+)\.[a-z]+$/i);
      if (match?.[1]) {
        const publicId = `cake_craft/cakes/${match[1]}`;
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }
  }

  // ✅ Prepare update object
  const updateData: Record<string, any> = {};
  if (cake_name !== null)
    updateData.cake_name = cake_name;
  if (cake_description !== null)
    updateData.cake_description = cake_description;
  if (cake_price !== null)
    updateData.cake_price = cake_price;
  if (cake_category !== null)
    updateData.cake_category = cake_category;
  if (cake_flavor !== null)
    updateData.cake_flavor = cake_flavor;
  if (cake_size !== null)
    updateData.cake_size = cake_size;
  if (cake_topping !== null)
    updateData.cake_topping = cake_topping;
  if (cake_type !== null)
    updateData.cake_type = cake_type;
  if (good_for !== null)
    updateData.good_for = good_for;

  // Decide which image to save
  if (cloudinaryUrl) {
    updateData.cake_image = cloudinaryUrl;
  }
  else if (existing_image) {
    updateData.cake_image = existing_image;
  }

  updateData.updatedAt = new Date();

  // ✅ Update DB
  const updated = await db
    .update(cakes)
    .set(updateData)
    .where(eq(cakes.id, id));

  return {
    success: true,
    data: updated,
    message: 'Cake updated successfully',
  };
});
