
-- Create tournament registrations table
CREATE TABLE IF NOT EXISTS public.tournament_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id TEXT NOT NULL,
    user_id UUID NOT NULL,
    game_username TEXT NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    payment_status TEXT DEFAULT 'completed',
    payment_amount INTEGER,
    payment_currency TEXT DEFAULT 'inr',
    payment_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own registrations
CREATE POLICY "Users can view their own tournament registrations" 
ON public.tournament_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own registrations
CREATE POLICY "Users can register for tournaments" 
ON public.tournament_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for admins to view all registrations
CREATE POLICY "Admins can view all tournament registrations" 
ON public.tournament_registrations 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- Add functions for updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.tournament_registrations
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
