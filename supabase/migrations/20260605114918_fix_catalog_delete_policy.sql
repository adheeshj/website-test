/*
# Fix delete policy on catalog_items

1. Changes
- Drop the incorrectly-created "authenticated_delete_catalog" policy (created as FOR ALL)
- Re-create it as FOR DELETE only
*/

DROP POLICY IF EXISTS "authenticated_delete_catalog" ON catalog_items;
CREATE POLICY "authenticated_delete_catalog" ON catalog_items FOR DELETE
  TO authenticated USING (true);
