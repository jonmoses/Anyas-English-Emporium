-- Sample video data for testing
-- Note: Replace these with actual Vimeo video IDs when you have real content

INSERT INTO videos (vimeo_id, title, description, duration, level, category, thumbnail_url, embed_url, is_published) VALUES
  -- Beginner Grammar Videos
  ('123456789', 'Introduction to English Grammar', 'Learn the basic building blocks of English grammar. Perfect for beginners starting their English learning journey.', 900, 'beginner', 'grammar', 'https://i.vimeocdn.com/video/placeholder1.jpg', 'https://player.vimeo.com/video/123456789', true),

  ('234567890', 'Present Simple Tense', 'Master the present simple tense with clear explanations and practical examples.', 720, 'beginner', 'grammar', 'https://i.vimeocdn.com/video/placeholder2.jpg', 'https://player.vimeo.com/video/234567890', true),

  -- Intermediate Videos
  ('345678901', 'Common English Phrases for Conversation', 'Boost your conversational skills with these essential English phrases used in daily communication.', 1200, 'intermediate', 'conversation', 'https://i.vimeocdn.com/video/placeholder3.jpg', 'https://player.vimeo.com/video/345678901', true),

  ('456789012', 'Building Your Vocabulary', 'Effective techniques and strategies to expand your English vocabulary quickly and efficiently.', 1080, 'intermediate', 'vocabulary', 'https://i.vimeocdn.com/video/placeholder4.jpg', 'https://player.vimeo.com/video/456789012', true),

  -- Pronunciation Videos
  ('567890123', 'English Pronunciation Fundamentals', 'Master the basic sounds of English and improve your pronunciation with guided practice.', 1500, 'beginner', 'pronunciation', 'https://i.vimeocdn.com/video/placeholder5.jpg', 'https://player.vimeo.com/video/567890123', true),

  -- Advanced Videos
  ('678901234', 'Business English Essentials', 'Professional English communication skills for the workplace and business meetings.', 1800, 'advanced', 'business', 'https://i.vimeocdn.com/video/placeholder6.jpg', 'https://player.vimeo.com/video/678901234', true),

  ('789012345', 'Advanced Grammar Concepts', 'Complex grammatical structures and advanced English grammar rules explained clearly.', 2100, 'advanced', 'grammar', 'https://i.vimeocdn.com/video/placeholder7.jpg', 'https://player.vimeo.com/video/789012345', true),

  -- Additional Categories
  ('890123456', 'English Listening Practice', 'Improve your listening skills with various accents and speaking speeds.', 960, 'intermediate', 'listening', 'https://i.vimeocdn.com/video/placeholder8.jpg', 'https://player.vimeo.com/video/890123456', true),

  ('901234567', 'Academic English Writing', 'Learn to write academic essays and formal documents in English.', 1320, 'advanced', 'writing', 'https://i.vimeocdn.com/video/placeholder9.jpg', 'https://player.vimeo.com/video/901234567', true),

  ('012345678', 'English Idioms and Expressions', 'Understand and use common English idioms and expressions in context.', 840, 'intermediate', 'vocabulary', 'https://i.vimeocdn.com/video/placeholder10.jpg', 'https://player.vimeo.com/video/012345678', true);

-- Note: To use this with real Vimeo videos:
-- 1. Upload your videos to Vimeo
-- 2. Replace the vimeo_id values with actual Vimeo video IDs
-- 3. Replace thumbnail_url values with actual Vimeo thumbnail URLs
-- 4. Update embed_url values with the correct Vimeo embed URLs
-- 5. Update duration values with actual video durations in seconds
-- 6. Customize titles, descriptions, levels, and categories as needed