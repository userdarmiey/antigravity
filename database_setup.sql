-- COMPLETE DATABASE RESET FOR FIT & FAB
-- WARNING: This will delete existing orders. Run this in Supabase SQL Editor.

-- 0. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Clean up existing tables to ensure fresh schema
drop table if exists tracking_updates cascade;
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists newsletter_subs cascade;
drop table if exists wallets cascade;

-- 2. Create the orders table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  tracking_code text unique not null,
  customer_name text,
  email text,
  phone text,
  address text,
  delivery_method text default 'delivery',
  order_notes text,
  total numeric,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- 3. Create the order_items table
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id text,
  name text,
  price numeric,
  quantity integer
);

-- 4. Create tracking updates table
create table tracking_updates (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  status text,
  message text,
  created_at timestamp with time zone default now()
);

-- 5. Create Newsletter Subscribers table
CREATE TABLE public.newsletter_subs (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Wallets table
CREATE TABLE public.wallets (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    balance NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Security (Optional for Backend, but good practice)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Allow reading tracking updates for anyone with a tracking code
CREATE POLICY "Enable read access for all users" ON public.tracking_updates FOR SELECT USING (true);
CREATE POLICY "Enable read access for orders" ON public.orders FOR SELECT USING (true);

-- 8. Trigger to create wallet on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.wallets (user_id, balance)
  VALUES (new.id, 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if trigger exists before creating
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
