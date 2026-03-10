-- Run this in Supabase Dashboard → SQL Editor
-- Adds cover_image_path column to products table

alter table products add column if not exists cover_image_path text;
