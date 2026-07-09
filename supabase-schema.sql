-- =============================================================================
-- FrameFast — Supabase Database Schema
-- Run this entire script in Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================================================

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. BOOKINGS — public form submissions (landing page)
-- =============================================================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  package TEXT NOT NULL,
  products_count INTEGER,
  source TEXT,
  selected_date DATE,
  selected_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);

-- Prevent double-booking: only one non-cancelled booking per time slot
CREATE UNIQUE INDEX idx_bookings_slot_unique
  ON bookings(selected_date, selected_time)
  WHERE status != 'cancelled';

-- =============================================================================
-- 2. CUSTOMERS
-- =============================================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT,
  email TEXT UNIQUE,
  whatsapp TEXT,
  source TEXT,
  lifetime_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','lead')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);

-- =============================================================================
-- 3. TEAM — sales agents (linked to Supabase Auth users)
-- =============================================================================
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('admin','agent','manager')),
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  supabase_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_team_email ON team(email);

-- =============================================================================
-- 4. ORDERS
-- =============================================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  product TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','successful','failed','refunded')),
  agent_id UUID REFERENCES team(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_agent ON orders(agent_id);

-- =============================================================================
-- 5. TRANSACTIONS — payment records
-- =============================================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'successful' CHECK (status IN ('successful','pending','failed','refunded')),
  gateway_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transactions_order ON transactions(order_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- =============================================================================
-- 6. LEADS
-- =============================================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT,
  email TEXT,
  whatsapp TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'cold' CHECK (status IN ('hot','warm','cold')),
  qualified BOOLEAN NOT NULL DEFAULT false,
  converted_to_customer BOOLEAN NOT NULL DEFAULT false,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES team(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);

-- =============================================================================
-- 7. BOOKING AVAILABILITY — admin-controlled open/closed days
-- =============================================================================
CREATE TABLE booking_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  is_open BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_booking_availability_date ON booking_availability(date);

-- =============================================================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER team_updated_at BEFORE UPDATE ON team FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

-- Bookings: anon can insert; only authenticated users can view/update
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_bookings"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated_select_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Customers: authenticated only
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_customers"
  ON customers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Team: authenticated only
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_team"
  ON team FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders: authenticated only
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Transactions: authenticated only
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Leads: authenticated only
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all_leads"
  ON leads FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
