/*
# Create catalog_items table (single-tenant, public read, authenticated write)

1. New Tables
- `catalog_items`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — product display name
  - `category` (text, not null) — product category tag
  - `price` (integer, not null) — price in INR
  - `image` (text, not null) — URL to product image
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `catalog_items`.
- Allow anon + authenticated SELECT so the public catalog is readable.
- Allow authenticated INSERT/UPDATE/DELETE for admin management.
*/

CREATE TABLE IF NOT EXISTS catalog_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price integer NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE catalog_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_catalog" ON catalog_items;
CREATE POLICY "public_select_catalog" ON catalog_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_catalog" ON catalog_items;
CREATE POLICY "authenticated_insert_catalog" ON catalog_items FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_catalog" ON catalog_items;
CREATE POLICY "authenticated_update_catalog" ON catalog_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_catalog" ON catalog_items;
CREATE POLICY "authenticated_delete_catalog" ON catalog_items
  TO authenticated USING (true);
