import db from '~~/server/db';
import { cakes } from '~~/server/db/schema/cake-schema';
import { authClient } from '~~/server/lib/auth-client';
import formidable from 'formidable';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {
  const form = formidable({
    multiples: false,
    uploadDir: join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
  });

  const [fields, files] = await form.parse(event.node.req);

  // helper to safely extract first value
  const getField = (f: string | string[] | undefined): string | null => {
    if (!f)
      return null;
    return Array.isArray(f) ? f[0] : f;
  };

  // destructure & normalize
  const cake_name = getField(fields.cake_name)!;
  const user_id = getField(fields.user_id)!;
  const cake_description = getField(fields.cake_description);
  const cake_price = getField(fields.cake_price)!;
  const cake_category = getField(fields.cake_category)!;
  const cake_flavor = getField(fields.cake_flavor)!;
  const cake_size = getField(fields.cake_size)!;
  const cake_topping = getField(fields.cake_topping)!;
  const cake_type = getField(fields.cake_type)!;
  const good_for = getField(fields.good_for)!;

  // handle file
  let filePath: string | null = null;
  const file = files.cake_image?.[0];
  if (file) {
    filePath = `${file.newFilename}`;
  }

  // insert into DB (fields now are plain strings, not arrays)
  const [createdCake] = await db
    .insert(cakes)
    .values({
      user_id,
      cake_name,
      cake_description: cake_description ?? '',
      cake_price,
      cake_category,
      cake_flavor,
      cake_size,
      cake_topping,
      cake_type,
      good_for,
      cake_image: filePath ?? '',
    })
    .$returningId();

  return {
    success: true,
    data: createdCake,
    message: 'Cake created successfully',
  };
});
