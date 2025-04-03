CREATE POLICY "Enable public access" ON "public"."messages"
AS PERMISSIVE FOR ALL
TO public
USING (true)
WITH CHECK (true)
