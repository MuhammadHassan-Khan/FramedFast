DROP POLICY IF EXISTS "team_select_bookings" ON bookings;
DROP POLICY IF EXISTS "team_update_bookings" ON bookings;
DROP POLICY IF EXISTS "team_all_customers" ON customers;
DROP POLICY IF EXISTS "team_all_team" ON team;
DROP POLICY IF EXISTS "team_all_orders" ON orders;
DROP POLICY IF EXISTS "team_all_transactions" ON transactions;
DROP POLICY IF EXISTS "team_all_leads" ON leads;
DROP POLICY IF EXISTS "team_all_booking_availability" ON booking_availability;

CREATE FUNCTION public.is_active_team_member()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.team
    WHERE supabase_user_id = auth.uid()
    AND is_active = true
  );
$$;

CREATE POLICY "team_select_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (public.is_active_team_member());

CREATE POLICY "team_update_bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_customers"
  ON customers FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_team"
  ON team FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_orders"
  ON orders FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_leads"
  ON leads FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());

CREATE POLICY "team_all_booking_availability"
  ON booking_availability FOR ALL
  TO authenticated
  USING (public.is_active_team_member())
  WITH CHECK (public.is_active_team_member());
