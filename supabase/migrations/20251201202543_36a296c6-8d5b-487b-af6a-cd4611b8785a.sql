-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Public can view active clients
CREATE POLICY "Anyone can view active clients"
ON public.clients
FOR SELECT
USING (active = true OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert clients
CREATE POLICY "Admins can insert clients"
ON public.clients
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update clients
CREATE POLICY "Admins can update clients"
ON public.clients
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete clients
CREATE POLICY "Admins can delete clients"
ON public.clients
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for client logos
INSERT INTO storage.buckets (id, name, public) VALUES ('client-logos', 'client-logos', true);

-- Storage policies for client logos
CREATE POLICY "Public can view client logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'client-logos');

CREATE POLICY "Admins can upload client logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'client-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update client logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'client-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete client logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'client-logos' AND has_role(auth.uid(), 'admin'::app_role));