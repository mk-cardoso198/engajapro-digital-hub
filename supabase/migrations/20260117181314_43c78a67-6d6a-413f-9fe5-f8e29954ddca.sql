-- Increase file size limit for project images bucket (used by Projects gallery uploads)
-- 20 MB = 20 * 1024 * 1024 = 20971520 bytes
UPDATE storage.buckets
SET file_size_limit = 20971520
WHERE id = 'project-images';