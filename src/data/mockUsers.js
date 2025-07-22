// Mock data matching Supabase 'users' table schema
export const mockUsers = [
  {
    id: 'user_1',
    email: 'alex.runner@email.com',
    strava_athlete_id: '12345678',
    strava_tokens: {
      access_token: 'mock_access_token_123',
      refresh_token: 'mock_refresh_token_456',
      expires_at: Date.now() + (6 * 60 * 60 * 1000), // 6 hours from now
    },
    created_at: '2024-01-15T08:00:00Z',
    // Additional profile data (could be in separate profile table)
    profile: {
      firstName: 'Alex',
      lastName: 'Morgan',
      timezone: 'America/Los_Angeles',
      units: 'metric', // metric or imperial
      experience_level: 'intermediate',
    }
  }
];

// Helper function to get current user (for development)
export const getCurrentUser = () => mockUsers[0];

// Helper function to get user by ID (matches Supabase pattern)
export const getUserById = (id) => mockUsers.find(user => user.id === id);