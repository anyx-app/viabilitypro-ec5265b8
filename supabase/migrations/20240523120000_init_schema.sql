SET search_path TO proj_a37e8fd4;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
-- Stores user profile data. id matches auth.users.id implicitly (no FK allowed to auth schema).
CREATE TABLE profiles (
    id UUID PRIMARY KEY, 
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- PROJECTS
-- Stores the startup ideas.
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    target_market TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own projects" ON projects
    USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- ANALYSES
-- Stores validation results.
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    validation_score INTEGER,
    market_size_data JSONB,
    competitors_data JSONB,
    trends_data JSONB,
    swot_data JSONB,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view analyses of own projects" ON analyses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = analyses.project_id
            AND projects.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );
