-- Run this in Supabase Dashboard → SQL Editor
-- Adds price, PDF upload, and CTA fields to content_blocks

alter table content_blocks add column if not exists price decimal(10,2);
alter table content_blocks add column if not exists original_price decimal(10,2);
alter table content_blocks add column if not exists pdf_path text;
alter table content_blocks add column if not exists cta_label text default 'Buy Now';
alter table content_blocks add column if not exists cta_url text;
