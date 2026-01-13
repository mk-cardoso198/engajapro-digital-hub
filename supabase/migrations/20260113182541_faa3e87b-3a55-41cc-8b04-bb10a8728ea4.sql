-- Add row field to clients table (1 = top row, 2 = bottom row)
ALTER TABLE public.clients 
ADD COLUMN row_position integer NOT NULL DEFAULT 1;

-- Add constraint to ensure only valid values
ALTER TABLE public.clients 
ADD CONSTRAINT clients_row_position_check CHECK (row_position IN (1, 2));

-- Add comment for clarity
COMMENT ON COLUMN public.clients.row_position IS '1 = top row, 2 = bottom row';