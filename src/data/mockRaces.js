// Mock data matching Supabase 'races' table schema
export const mockRaces = [
  {
    id: 'race_1',
    user_id: 'user_1',
    name: 'Olympic Distance Triathlon',
    race_date: '2024-06-15T07:00:00Z', // 12 weeks from now for realistic training
    race_type: 'olympic', // sprint, olympic, half_ironman, ironman
    fitness_level: 'intermediate', // beginner, intermediate, advanced
    weekly_hours: 8, // Available training hours per week
    created_at: '2024-01-15T08:30:00Z',
    // Additional race details
    location: 'San Francisco Bay Area',
    distances: {
      swim: '1.5km',
      bike: '40km', 
      run: '10km'
    },
    goal_time: '2:45:00', // Target finish time
    priority: 'A', // A, B, or C priority race
  }
];

// Helper functions matching Supabase query patterns
export const getRacesByUserId = (userId) => 
  mockRaces.filter(race => race.user_id === userId);

export const getCurrentRace = (userId) => 
  mockRaces.find(race => race.user_id === userId && new Date(race.race_date) > new Date());

export const getRaceById = (id) => 
  mockRaces.find(race => race.id === id);