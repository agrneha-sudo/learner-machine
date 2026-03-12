-- ============================================================
-- Run this in your Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- Products table
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  tagline       text default '',
  description   text default '',
  price         decimal(10,2) not null default 0,
  original_price decimal(10,2),
  currency      text default 'INR',
  category      text check (category in ('ebook', 'course', 'training', 'bundle')) default 'ebook',
  cover_gradient text default 'from-violet-600 to-indigo-700',
  cover_emoji   text default '📚',
  features      jsonb default '[]',
  featured      boolean default false,
  badge         text,
  language      text default 'Hindi & English',
  pages         integer,
  duration      text,
  file_path     text,
  cover_image_path text,
  published     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Orders table
create table if not exists orders (
  id                   uuid primary key default gen_random_uuid(),
  product_id           uuid references products(id) on delete set null,
  product_title        text not null,
  customer_email       text not null,
  customer_name        text,
  amount               decimal(10,2) not null,
  currency             text default 'INR',
  razorpay_order_id    text unique,
  razorpay_payment_id  text,
  status               text default 'pending' check (status in ('pending', 'paid', 'failed')),
  download_token       uuid unique default gen_random_uuid(),
  download_count       integer default 0,
  created_at           timestamptz default now()
);

-- Migration: add download protection columns to existing orders table
-- Run this if the table already exists:
-- alter table orders add column if not exists download_token uuid unique default gen_random_uuid();
-- alter table orders add column if not exists download_count integer default 0;

-- Note: razorpay_order_id and razorpay_payment_id columns are reused as generic
-- gateway_order_id / gateway_payment_id for Cashfree and Instamojo orders.
-- No schema change needed — the column names are legacy but the data is correct.

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- Storage bucket for product files (PDFs, ZIPs, etc.)
insert into storage.buckets (id, name, public)
values ('product-files', 'product-files', false)
on conflict (id) do nothing;

-- ============================================================
-- Sample data (optional — you can add products via admin panel)
-- ============================================================
insert into products (slug, title, tagline, description, price, original_price, currency, category, cover_gradient, cover_emoji, features, featured, badge, language, pages, published)
values
  (
    'ai-prompts-mastery-ebook',
    'AI Prompts Mastery',
    '200+ Proven Prompts to 10x Your Productivity',
    'Master AI tools like ChatGPT, Claude, and Gemini with 200+ battle-tested prompts for business, content creation, and side hustles.',
    799, 1999, 'INR', 'ebook',
    'from-violet-600 via-purple-600 to-indigo-700', '🤖',
    '["200+ categorised AI prompts","Business & marketing prompts","Content creation templates","Side hustle prompt playbook","Hindi + English examples","Lifetime updates included"]',
    true, 'Bestseller', 'Hindi & English', 120, true
  ),
  (
    'side-hustle-blueprint-course',
    'Side Hustle Blueprint',
    'Build Your First ₹50,000/month Online Income',
    'A step-by-step video course showing you exactly how to launch and scale a profitable side hustle using AI tools, even if you are starting from zero.',
    3999, 7999, 'INR', 'course',
    'from-orange-500 via-red-500 to-pink-600', '🚀',
    '["8 hours of video content","5 proven side hustle models","Live case studies & examples","Private community access","Worksheets & templates","30-day money-back guarantee"]',
    true, 'Most Popular', 'Hindi & English', null, true
  ),
  (
    'business-automation-training',
    'Business Automation with AI',
    'Automate 80% of Your Work in 30 Days',
    'Learn to automate your business operations using free and low-cost AI tools. Reclaim your time and scale faster.',
    1999, 3999, 'INR', 'training',
    'from-emerald-500 via-teal-500 to-cyan-600', '⚙️',
    '["4-week live training program","Automation tool walkthroughs","Email & social media automation","AI writing & scheduling setup","Q&A sessions included","Certificate of completion"]',
    true, 'New', 'Hindi & English', null, true
  )
on conflict (slug) do nothing;
