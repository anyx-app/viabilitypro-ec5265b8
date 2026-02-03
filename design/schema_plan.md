# ViabilityPro Schema Plan

## Overview
This schema is designed to store user startup ideas and the generated analysis reports for ViabilityPro. It leverages Supabase Auth for user management and uses JSONB columns for flexible data storage of AI-generated insights.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table to store application-specific user data.

- **id**: UUID (Primary Key, Foreign Key -> auth.users.id)
- **full_name**: TEXT
- **avatar_url**: TEXT
- **created_at**: TIMESTAMPTZ (Default: now())
- **updated_at**: TIMESTAMPTZ (Default: now())

### 2. projects
Stores the core input for a startup idea to be validated.

- **id**: UUID (Primary Key, Default: gen_random_uuid())
- **user_id**: UUID (Foreign Key -> profiles.id)
- **name**: TEXT (Required, Name of the idea)
- **description**: TEXT (Required, Detailed explanation of the concept)
- **target_market**: TEXT (Required, Description of the intended audience)
- **status**: TEXT (Enum: 'draft', 'analyzing', 'completed'. Default: 'draft')
- **created_at**: TIMESTAMPTZ (Default: now())
- **updated_at**: TIMESTAMPTZ (Default: now())

### 3. analyses
Stores the results of the automated validation process. One project can have multiple analyses over time (versions).

- **id**: UUID (Primary Key, Default: gen_random_uuid())
- **project_id**: UUID (Foreign Key -> projects.id, ON DELETE CASCADE)
- **validation_score**: INTEGER (0-100 score representing viability)
- **market_size_data**: JSONB (Stores TAM, SAM, SOM estimates)
- **competitors_data**: JSONB (Array of competitor objects with names, strengths, weaknesses)
- **trends_data**: JSONB (Array of relevant market trends)
- **swot_data**: JSONB (Structured Strengths, Weaknesses, Opportunities, Threats)
- **summary**: TEXT (High-level executive summary of the findings)
- **created_at**: TIMESTAMPTZ (Default: now())

## Relationships
- `profiles.id` --(1:N)--> `projects.user_id`
- `projects.id` --(1:N)--> `analyses.project_id`

## RLS Policies (Security)
- **profiles**: 
  - SELECT: Users can read their own profile.
  - UPDATE: Users can update their own profile.
- **projects**: 
  - ALL: Users can perform all actions on their own projects (`auth.uid() = user_id`).
- **analyses**: 
  - SELECT: Users can read analyses linked to their own projects (via join on project).
  - INSERT: Service role only (or triggered by user action if logic permits).
