-- ====================================================================
-- AKURE HANDICONNECT - SUPABASE DATABASE SCHEMA
-- Execute this SQL in Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. Artisans Table
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INTEGER DEFAULT 0,
    completed_jobs INTEGER DEFAULT 0,
    badge TEXT DEFAULT 'Verified Pro',
    is_verified BOOLEAN DEFAULT TRUE,
    experience_years INTEGER DEFAULT 5,
    starting_rate INTEGER DEFAULT 5000,
    phone TEXT UNIQUE NOT NULL,
    whatsapp TEXT NOT NULL,
    districts JSONB DEFAULT '["Alagbaka (GRA & Extension)", "Ijapo Estate"]'::jsonb,
    avatar TEXT,
    bio TEXT,
    response_time TEXT DEFAULT '< 15 minutes',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tasks Table (Client Job Postings in Akure)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    district TEXT NOT NULL,
    budget_min INTEGER DEFAULT 5000 NOT NULL,
    budget_max INTEGER DEFAULT 25000 NOT NULL,
    description TEXT NOT NULL,
    client_phone TEXT,
    status TEXT DEFAULT 'Open' NOT NULL, -- 'Open', 'In Progress', 'Completed'
    offers_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Quotes Table (Artisan Offers on Tasks)
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
    artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE NOT NULL,
    artisan_name TEXT NOT NULL,
    business_name TEXT,
    price INTEGER NOT NULL,
    eta TEXT DEFAULT '30 mins',
    note TEXT,
    status TEXT DEFAULT 'Pending' NOT NULL, -- 'Pending', 'Accepted', 'Rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. User Profiles Table (Client & Artisan Phone Logins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'client' NOT NULL, -- 'client', 'artisan', 'admin'
    district TEXT DEFAULT 'Alagbaka (GRA & Extension)',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables for public read access
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for landing page & directory search
CREATE POLICY "Allow public read on artisans" ON public.artisans FOR SELECT USING (true);
CREATE POLICY "Allow public insert on artisans" ON public.artisans FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert on tasks" ON public.tasks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Allow public insert on quotes" ON public.quotes FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on profiles" ON public.profiles FOR ALL USING (true);

-- Seed Initial Akure Artisans
INSERT INTO public.artisans (name, business_name, category, category_name, rating, reviews_count, completed_jobs, badge, is_verified, experience_years, starting_rate, phone, whatsapp, districts, avatar, bio, response_time)
VALUES 
  ('Engr. Gbenga Adebayo', 'Gbenga Tech & Electricals', 'electrical', 'Electrical & Inverter Systems', 4.90, 56, 112, 'Gold Verified Pro', true, 9, 5000, '+2348031234567', '2348031234567', '["Alagbaka (GRA & Extension)", "Ijapo Estate", "Oba-Ile & Airport Road", "FUTA / South Gate / North Gate"]'::jsonb, 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80', 'Certified electrical engineer specializing in residential house wiring, circuit breaker troubleshooting, automatic generator changeover switches, and Solar/Inverter system installation in Akure.', '< 15 minutes'),
  ('Sunday "Sumec" Ojo', 'Ojo Generator Specialist', 'generator', 'Generator Repair & Servicing', 4.80, 43, 89, 'Fast Responder', true, 12, 4000, '+2348059876543', '2348059876543', '["Fanibi & Ondo Road", "Oke-Aro & Stadium Road", "Alagbaka (GRA & Extension)", "Arakale & Commercial Hub"]'::jsonb, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Master generator mechanic across Akure. Repairs all petrol & diesel generators (Tiger, Sumec Firman, Elepaq, Lutian, Mikano, Perkins). Carburetor cleaning, coil rewinding, oil service, and automatic starter repairs.', '< 20 minutes'),
  ('Kelvin "Cooling" Amadi', 'Arctic Freeze AC & Refrigeration', 'ac', 'AC Servicing & Refrigeration', 4.90, 62, 130, 'Gold Verified Pro', true, 7, 6000, '+2348123456789', '2348123456789', '["Alagbaka (GRA & Extension)", "Ijapo Estate", "Oba-Ile & Airport Road", "Oda Road & Housing Estate"]'::jsonb, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', 'Expert AC technician certified in split unit installation, gas top-ups (R22/R410), compressor replacements, leak fixing, and deep coil chemical cleaning. Servicing homes, churches, and offices in Akure.', '< 10 minutes')
ON CONFLICT (phone) DO NOTHING;
