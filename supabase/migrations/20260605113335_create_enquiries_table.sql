/*
# Create enquiries table (single-tenant, no auth)

1. New Tables
- `enquiries`
  - `id` (uuid, primary key, auto-generated)
  - `customer_name` (text, not null) — name of the customer making the enquiry
  - `phone` (text, not null) — customer phone number
  - `product_id` (text, not null) — ID of the product being enquired about
  - `product_name` (text, not null) — name of the product (denormalized for email context)
  - `message` (text, not null) — enquiry message from customer
  - `created_at` (timestamptz, default now()) — when the enquiry was submitted

2. Security
- Enable RLS on `enquiries`.
- Allow anon + authenticated INSERT so the public enquiry form can submit without sign-in.
- Allow authenticated SELECT/UPDATE/DELETE for store admin access.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_enquiries" ON enquiries;
CREATE POLICY "authenticated_select_enquiries" ON enquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_enquiries" ON enquiries;
CREATE POLICY "authenticated_update_enquiries" ON enquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_enquiries" ON enquiries;
CREATE POLICY "authenticated_delete_enquiries" ON enquiries FOR DELETE
  TO authenticated USING (true);
