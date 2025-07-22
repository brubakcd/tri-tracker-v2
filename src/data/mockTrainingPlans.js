// Mock data matching Supabase 'training_plans' table schema
export const mockTrainingPlans = [
  {
    id: 'plan_1',
    race_id: 'race_1',
    weeks_to_race: 12,
    generated_at: '2024-01-15T09:00:00Z',
    plan_data: {
      name: '12-Week Olympic Distance Training Plan',
      description: 'Structured plan building towards your Olympic distance triathlon',
      total_weeks: 12,
      current_week: 2, // We'll mock being in week 2
      phases: [
        {
          name: 'Base Building',
          description: 'Building aerobic fitness and technique',
          weeks: [1, 2, 3, 4],
          focus: 'Volume and technique development',
          weekly_structure: {
            swim_sessions: 2,
            bike_sessions: 2,
            run_sessions: 3,
            rest_days: 1
          }
        },
        {
          name: 'Build Phase',
          description: 'Adding intensity and race-specific work',
          weeks: [5, 6, 7, 8, 9],
          focus: 'Threshold and VO2 max development',
          weekly_structure: {
            swim_sessions: 3,
            bike_sessions: 3,
            run_sessions: 3,
            rest_days: 1
          }
        },
        {
          name: 'Peak & Taper',
          description: 'Race preparation and recovery',
          weeks: [10, 11, 12],
          focus: 'Race pace practice and recovery',
          weekly_structure: {
            swim_sessions: 2,
            bike_sessions: 2,
            run_sessions: 2,
            rest_days: 2
          }
        }
      ],
      weekly_targets: {
        1: { hours: 6.5, volume: 'moderate' },
        2: { hours: 7.0, volume: 'moderate' },
        3: { hours: 7.5, volume: 'moderate' },
        4: { hours: 6.0, volume: 'recovery' },
        5: { hours: 8.0, volume: 'high' },
        6: { hours: 8.5, volume: 'high' },
        7: { hours: 9.0, volume: 'high' },
        8: { hours: 7.0, volume: 'recovery' },
        9: { hours: 8.5, volume: 'high' },
        10: { hours: 7.0, volume: 'moderate' },
        11: { hours: 5.5, volume: 'taper' },
        12: { hours: 4.0, volume: 'race_week' }
      }
    },
    created_at: '2024-01-15T09:00:00Z'
  }
];

// Helper functions matching Supabase query patterns
export const getTrainingPlanByRaceId = (raceId) => 
  mockTrainingPlans.find(plan => plan.race_id === raceId);

export const getTrainingPlanById = (id) => 
  mockTrainingPlans.find(plan => plan.id === id);

// Helper to get current phase
export const getCurrentPhase = (planId) => {
  const plan = getTrainingPlanById(planId);
  if (!plan) return null;
  
  const currentWeek = plan.plan_data.current_week;
  return plan.plan_data.phases.find(phase => 
    phase.weeks.includes(currentWeek)
  );
};