-- Create enum for video levels
CREATE TYPE video_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create videos table
CREATE TABLE videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vimeo_id VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER, -- Duration in seconds
    level video_level NOT NULL DEFAULT 'beginner',
    category VARCHAR(100) NOT NULL,
    thumbnail_url TEXT,
    embed_url TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on vimeo_id for faster lookups
CREATE INDEX idx_videos_vimeo_id ON videos(vimeo_id);

-- Create index on category and level for filtering
CREATE INDEX idx_videos_category_level ON videos(category, level);

-- Create index on published status
CREATE INDEX idx_videos_published ON videos(is_published) WHERE is_published = true;

-- Add RLS (Row Level Security)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published videos
CREATE POLICY "Anyone can view published videos" ON videos
    FOR SELECT USING (is_published = true);

-- Policy: Only authenticated users can see all videos (for admin purposes)
CREATE POLICY "Authenticated users can view all videos" ON videos
    FOR SELECT USING (auth.role() = 'authenticated');

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();