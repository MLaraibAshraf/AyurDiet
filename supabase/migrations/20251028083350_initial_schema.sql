/*
  # Initial Schema for AyurDiet Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `role` (enum: client, dietitian, admin)
      - `join_date` (timestamptz)
      - `phone` (text, optional)
      - `avatar_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `dietitian_profiles`
      - `id` (uuid, references profiles)
      - `practice_name` (text)
      - `specialization` (text)
      - `bio` (text)
      - `qualifications` (text[])
      - `experience_years` (integer)
      - `consultation_fee` (numeric)
      - `rating` (numeric)
      - `total_reviews` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `client_profiles`
      - `id` (uuid, references profiles)
      - `dosha_type` (text)
      - `health_goals` (text[])
      - `allergies` (text[])
      - `dietary_restrictions` (text[])
      - `age` (integer)
      - `height` (numeric)
      - `current_weight` (numeric)
      - `target_weight` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `diet_plans`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `dietitian_id` (uuid, references profiles)
      - `name` (text)
      - `description` (text)
      - `duration_days` (integer)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (enum: active, completed, paused)
      - `progress_percentage` (integer)
      - `meals` (jsonb)
      - `recommendations` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `appointments`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `dietitian_id` (uuid, references profiles)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `type` (text)
      - `status` (enum: confirmed, pending, cancelled, completed)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `food_logs`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `meal_type` (text)
      - `food_items` (text)
      - `meal_time` (timestamptz)
      - `rating` (integer)
      - `notes` (text)
      - `created_at` (timestamptz)
      
    - `health_metrics`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `weight` (numeric)
      - `energy_level` (integer)
      - `sleep_hours` (numeric)
      - `symptoms` (text[])
      - `recorded_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Policies for profile access (users can read/update their own)
    - Policies for client-dietitian relationships
    - Admin access policies
*/

-- Create enum types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('client', 'dietitian', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE plan_status AS ENUM ('active', 'completed', 'paused');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('confirmed', 'pending', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  join_date timestamptz DEFAULT now(),
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dietitian profiles table
CREATE TABLE IF NOT EXISTS dietitian_profiles (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  practice_name text,
  specialization text,
  bio text,
  qualifications text[],
  experience_years integer DEFAULT 0,
  consultation_fee numeric DEFAULT 0,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client profiles table
CREATE TABLE IF NOT EXISTS client_profiles (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  dosha_type text,
  health_goals text[],
  allergies text[],
  dietary_restrictions text[],
  age integer,
  height numeric,
  current_weight numeric,
  target_weight numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Diet plans table
CREATE TABLE IF NOT EXISTS diet_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dietitian_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  duration_days integer NOT NULL DEFAULT 30,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  status plan_status DEFAULT 'active',
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  meals jsonb DEFAULT '{}',
  recommendations jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dietitian_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  type text NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Food logs table
CREATE TABLE IF NOT EXISTS food_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meal_type text NOT NULL,
  food_items text NOT NULL,
  meal_time timestamptz NOT NULL DEFAULT now(),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Health metrics table
CREATE TABLE IF NOT EXISTS health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  weight numeric,
  energy_level integer CHECK (energy_level >= 0 AND energy_level <= 10),
  sleep_hours numeric,
  symptoms text[],
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dietitian_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Dietitian profiles policies
CREATE POLICY "Anyone can view dietitian profiles"
  ON dietitian_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Dietitians can update own profile"
  ON dietitian_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Dietitians can insert own profile"
  ON dietitian_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Client profiles policies
CREATE POLICY "Users can view own client profile"
  ON client_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM diet_plans dp WHERE dp.client_id = client_profiles.id AND dp.dietitian_id = auth.uid()
  ));

CREATE POLICY "Clients can update own profile"
  ON client_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Clients can insert own profile"
  ON client_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Diet plans policies
CREATE POLICY "Users can view own diet plans"
  ON diet_plans FOR SELECT
  TO authenticated
  USING (client_id = auth.uid() OR dietitian_id = auth.uid());

CREATE POLICY "Dietitians can create diet plans"
  ON diet_plans FOR INSERT
  TO authenticated
  WITH CHECK (dietitian_id = auth.uid());

CREATE POLICY "Dietitians can update their diet plans"
  ON diet_plans FOR UPDATE
  TO authenticated
  USING (dietitian_id = auth.uid())
  WITH CHECK (dietitian_id = auth.uid());

CREATE POLICY "Users can delete own diet plans"
  ON diet_plans FOR DELETE
  TO authenticated
  USING (dietitian_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (client_id = auth.uid() OR dietitian_id = auth.uid());

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid() OR dietitian_id = auth.uid());

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid() OR dietitian_id = auth.uid())
  WITH CHECK (client_id = auth.uid() OR dietitian_id = auth.uid());

CREATE POLICY "Users can delete own appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (client_id = auth.uid() OR dietitian_id = auth.uid());

-- Food logs policies
CREATE POLICY "Clients can view own food logs"
  ON food_logs FOR SELECT
  TO authenticated
  USING (client_id = auth.uid() OR EXISTS (
    SELECT 1 FROM diet_plans dp WHERE dp.client_id = food_logs.client_id AND dp.dietitian_id = auth.uid()
  ));

CREATE POLICY "Clients can create food logs"
  ON food_logs FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own food logs"
  ON food_logs FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own food logs"
  ON food_logs FOR DELETE
  TO authenticated
  USING (client_id = auth.uid());

-- Health metrics policies
CREATE POLICY "Clients can view own health metrics"
  ON health_metrics FOR SELECT
  TO authenticated
  USING (client_id = auth.uid() OR EXISTS (
    SELECT 1 FROM diet_plans dp WHERE dp.client_id = health_metrics.client_id AND dp.dietitian_id = auth.uid()
  ));

CREATE POLICY "Clients can create health metrics"
  ON health_metrics FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own health metrics"
  ON health_metrics FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own health metrics"
  ON health_metrics FOR DELETE
  TO authenticated
  USING (client_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_diet_plans_client ON diet_plans(client_id);
CREATE INDEX IF NOT EXISTS idx_diet_plans_dietitian ON diet_plans(dietitian_id);
CREATE INDEX IF NOT EXISTS idx_diet_plans_status ON diet_plans(status);
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_dietitian ON appointments(dietitian_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_food_logs_client ON food_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_client ON health_metrics(client_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_dietitian_profiles_updated_at ON dietitian_profiles;
CREATE TRIGGER update_dietitian_profiles_updated_at BEFORE UPDATE ON dietitian_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_profiles_updated_at ON client_profiles;
CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_diet_plans_updated_at ON diet_plans;
CREATE TRIGGER update_diet_plans_updated_at BEFORE UPDATE ON diet_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();