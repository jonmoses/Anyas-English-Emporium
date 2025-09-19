-- Create user video progress table
CREATE TABLE user_video_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    progress FLOAT DEFAULT 0 CHECK (progress >= 0 AND progress <= 1), -- 0 to 1 (0% to 100%)
    completed_at TIMESTAMP WITH TIME ZONE,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure one progress record per user per video
    UNIQUE(user_id, video_id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_video_progress_user_id ON user_video_progress(user_id);
CREATE INDEX idx_user_video_progress_video_id ON user_video_progress(video_id);
CREATE INDEX idx_user_video_progress_completed ON user_video_progress(completed_at) WHERE completed_at IS NOT NULL;

-- Add RLS (Row Level Security)
ALTER TABLE user_video_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own progress
CREATE POLICY "Users can view own video progress" ON user_video_progress
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can create own video progress" ON user_video_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own video progress" ON user_video_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_video_progress_updated_at
    BEFORE UPDATE ON user_video_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to set completed_at when progress reaches 1.0
CREATE OR REPLACE FUNCTION set_completed_at()
RETURNS TRIGGER AS $$
BEGIN
    -- If progress reaches 1.0 and completed_at is null, set it
    IF NEW.progress >= 1.0 AND NEW.completed_at IS NULL THEN
        NEW.completed_at = NOW();
    END IF;

    -- If progress is less than 1.0, clear completed_at
    IF NEW.progress < 1.0 THEN
        NEW.completed_at = NULL;
    END IF;

    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_set_completed_at
    BEFORE INSERT OR UPDATE ON user_video_progress
    FOR EACH ROW
    EXECUTE FUNCTION set_completed_at();