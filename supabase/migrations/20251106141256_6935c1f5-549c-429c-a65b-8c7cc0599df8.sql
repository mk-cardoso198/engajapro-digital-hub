-- Add display_order column to projects table
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;