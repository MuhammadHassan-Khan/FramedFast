-- Run this in Supabase SQL Editor (requires service_role)
-- Replace 'YourPassword123!' with a strong password
-- Then run the second INSERT separately after getting the user ID

-- 1. Create the auth user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'framedfast.site@gmail.com',
  crypt('YourPassword123!', gen_salt('bf')),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- 2. Find the user id and add to team table
-- First, run this to get the user ID:
-- SELECT id FROM auth.users WHERE email = 'framedfast.site@gmail.com';
--
-- Then copy the ID and run:
-- INSERT INTO team (name, email, role, commission_rate, is_active, supabase_user_id)
-- VALUES ('Admin', 'framedfast.site@gmail.com', 'admin', 0, true, 'COPY_THE_UUID_HERE');
