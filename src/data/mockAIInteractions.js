// Mock data matching Supabase 'ai_interactions' table schema
// Represents AI-generated coaching insights and messages

export const mockAIInteractions = [
  // Weekly insights and coaching messages
  {
    id: 'ai_1',
    user_id: 'user_1',
    interaction_type: 'weekly_insight',
    request_data: {
      week_number: 1,
      completed_workouts: 5,
      total_workouts: 6,
      missed_workouts: ['workout_1_7']
    },
    response_data: {
      message: "Great start to your training! You completed 5 out of 6 planned workouts this week. Missing Sunday's long run isn't ideal, but your consistency on the other sessions shows commitment.",
      insights: [
        "Your swim technique focus is paying off - times are consistent",
        "Bike power numbers look stable in Zone 2",
        "Consider making up the missed long run with an extra easy run this week"
      ],
      tone: 'encouraging',
      priority: 'medium'
    },
    created_at: '2024-01-14T20:00:00Z'
  },
  {
    id: 'ai_2',
    user_id: 'user_1',
    interaction_type: 'daily_motivation',
    request_data: {
      workout_id: 'workout_2_1',
      user_energy_level: 'medium',
      recent_performance: 'good'
    },
    response_data: {
      message: "Ready for some speed work in the pool today! Your technique has been solid - time to add some pace.",
      motivation: "Those 50m intervals will prepare you for race day surges. Focus on maintaining form as speed increases.",
      tone: 'motivational',
      priority: 'low'
    },
    created_at: '2024-01-15T06:00:00Z'
  },
  {
    id: 'ai_3',
    user_id: 'user_1',
    interaction_type: 'performance_analysis',
    request_data: {
      completed_workout_id: 'completed_2_3',
      power_data: { average: 195, planned: 185 },
      heart_rate_data: { average: 155, max: 172 }
    },
    response_data: {
      message: "Your bike intervals were strong, but you pushed about 5% harder than planned. While your fitness is clearly improving, be careful not to accumulate too much fatigue.",
      analysis: [
        "Power was 5% above target - shows good fitness gains",
        "Heart rate peaked higher than expected - watch recovery",
        "Consider dialing back intensity slightly on next tempo session"
      ],
      recommendation: "Great work, but trust the plan - those easy days are just as important as the hard ones!",
      tone: 'analytical',
      priority: 'medium'
    },
    created_at: '2024-01-17T10:30:00Z'
  },
  {
    id: 'ai_4',
    user_id: 'user_1',
    interaction_type: 'upcoming_workout',
    request_data: {
      workout_id: 'workout_2_7',
      workout_type: 'brick',
      user_experience: 'first_brick'
    },
    response_data: {
      message: "Your first brick workout is today! This is where triathlon gets real - running off the bike feels completely different.",
      preparation: [
        "Set up your transition area like race day",
        "Practice quick shoe changes",
        "Don't worry if your legs feel like concrete at first"
      ],
      expectation: "The first 5 minutes of the run will feel terrible - this is completely normal! Your body will adapt.",
      tone: 'preparatory',
      priority: 'high'
    },
    created_at: '2024-01-21T06:00:00Z'
  },
  {
    id: 'ai_5',
    user_id: 'user_1',
    interaction_type: 'weekly_summary',
    request_data: {
      week_number: 2,
      completed_workouts: 6,
      total_workouts: 7,
      key_sessions: ['tempo_bike', 'brick_workout']
    },
    response_data: {
      message: "Excellent week! You're building fitness steadily and adapting well to increased intensity. Your brick workout preparation shows you're thinking like a triathlete.",
      highlights: [
        "6 of 7 workouts completed - fantastic consistency",
        "Tempo bike session showed strong power development",
        "Ready for your first brick workout - this is a big step!"
      ],
      next_week_focus: "Week 3 introduces race pace work. We'll practice the intensities you'll use on race day.",
      tone: 'encouraging',
      priority: 'low'
    },
    created_at: '2024-01-21T21:00:00Z'
  },
  {
    id: 'ai_6',
    user_id: 'user_1',
    interaction_type: 'race_preparation',
    request_data: {
      weeks_to_race: 10,
      current_fitness: 'improving',
      goal_assessment: 'on_track'
    },
    response_data: {
      message: "You're 10 weeks out from race day and building fitness nicely. Your base phase work is creating a strong foundation for the intensity to come.",
      race_readiness: [
        "Aerobic fitness: Building well ✓",
        "Technique: Focus area for continued improvement",
        "Mental preparation: Starting to think like a triathlete ✓"
      ],
      milestone: "Completing your first brick workout is a huge mental milestone - you're becoming a triathlete!",
      tone: 'motivational',
      priority: 'medium'
    },
    created_at: '2024-01-21T22:00:00Z'
  },
  {
    id: 'ai_7',
    user_id: 'user_1',
    interaction_type: 'training_adjustment',
    request_data: {
      missed_workout: 'workout_1_7',
      reason: 'schedule_conflict',
      upcoming_availability: 'normal'
    },
    response_data: {
      message: "No worries about missing Sunday's long run. Life happens, and one missed session won't derail your training.",
      adjustment: "Consider adding 15 minutes to this week's long run to make up some volume, but don't stress about it.",
      philosophy: "Consistency over perfection - your 85% completion rate is excellent for sustainable training.",
      tone: 'reassuring',
      priority: 'low'
    },
    created_at: '2024-01-16T08:00:00Z'
  },
  {
    id: 'ai_8',
    user_id: 'user_1',
    interaction_type: 'nutrition_reminder',
    request_data: {
      workout_type: 'long_bike',
      duration: '105_minutes',
      weather: 'cool'
    },
    response_data: {
      message: "Today's long ride is perfect for practicing race nutrition. Your body needs fuel for efforts over 90 minutes.",
      nutrition_plan: [
        "Start fueling 20 minutes into the ride",
        "Aim for 30-40g carbs per hour after that",
        "Practice with the same nutrition you'll use on race day"
      ],
      hydration: "Cool weather means you might not feel thirsty, but keep drinking every 15-20 minutes.",
      tone: 'educational',
      priority: 'medium'
    },
    created_at: '2024-01-20T07:00:00Z'
  }
];

// Helper functions matching Supabase query patterns
export const getAIInteractionsByUserId = (userId) => 
  mockAIInteractions.filter(interaction => interaction.user_id === userId);

export const getLatestInsight = (userId) => {
  const userInteractions = getAIInteractionsByUserId(userId);
  return userInteractions
    .filter(interaction => 
      ['weekly_insight', 'performance_analysis', 'race_preparation'].includes(interaction.interaction_type)
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
};

export const getDailyMotivation = (userId, date = new Date()) => {
  const dateStr = date.toISOString().split('T')[0];
  return mockAIInteractions.find(interaction => 
    interaction.user_id === userId &&
    interaction.interaction_type === 'daily_motivation' &&
    interaction.created_at.startsWith(dateStr)
  );
};

export const getCoachingInsights = (userId, type = null) => {
  const userInteractions = getAIInteractionsByUserId(userId);
  
  if (type) {
    return userInteractions.filter(interaction => interaction.interaction_type === type);
  }
  
  return userInteractions.filter(interaction => 
    ['weekly_insight', 'performance_analysis', 'training_adjustment', 'race_preparation'].includes(interaction.interaction_type)
  ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getUpcomingWorkoutGuidance = (userId, workoutId) => {
  return mockAIInteractions.find(interaction => 
    interaction.user_id === userId &&
    interaction.interaction_type === 'upcoming_workout' &&
    interaction.request_data.workout_id === workoutId
  );
};