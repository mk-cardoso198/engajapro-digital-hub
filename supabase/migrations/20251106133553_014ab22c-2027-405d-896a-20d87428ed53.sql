-- Create storage buckets for project and service images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('service-images', 'service-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']);

-- RLS Policies for project-images bucket
CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- RLS Policies for service-images bucket
CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'service-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'service-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'service-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public can view service images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'service-images');

-- Add new columns to projects table
ALTER TABLE public.projects
ADD COLUMN cover_image TEXT,
ADD COLUMN gallery_images TEXT[] DEFAULT '{}',
ADD COLUMN project_url TEXT,
ADD COLUMN tags TEXT[] DEFAULT '{}',
ADD COLUMN client_name TEXT,
ADD COLUMN completion_date DATE,
ADD COLUMN highlight_color TEXT DEFAULT '#3b82f6';

-- Add new columns to services table and rename description
ALTER TABLE public.services
ADD COLUMN icon_image TEXT,
ADD COLUMN short_description TEXT,
ADD COLUMN long_description TEXT;

-- Migrate existing description to long_description
UPDATE public.services SET long_description = description WHERE long_description IS NULL;

-- Make short_description from first 50 chars of description
UPDATE public.services SET short_description = LEFT(description, 50) WHERE short_description IS NULL;

-- Now we can drop the old description column
ALTER TABLE public.services DROP COLUMN description;