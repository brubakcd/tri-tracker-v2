// Mock data matching Supabase 'completed_workouts' table schema
// Represents Strava activities matched to planned workouts

export const mockCompletedWorkouts = [
  // Week 1 completed workouts (5 of 6 non-rest workouts completed)
  {
    id: 'completed_1_1',
    workout_id: 'workout_1_1', // Monday swim
    user_id: 'user_1',
    strava_activity_id: 'strava_123456',
    completed_at: '2024-01-08T09:15:00Z',
    activity_data: {
      // Actual vs planned comparison
      planned: {
        duration: '45 min',
        distance: '1200m',
        discipline: 'swim'
      },
      actual: {
        duration: '47 min',
        distance: '1250m',
        discipline: 'swim',
        average_pace: '2:15/100m',
        average_heart_rate: 142,
        max_heart_rate: 158,
        calories: 385
      },
      analysis: {
        duration_variance: '+2 min',
        distance_variance: '+50m',
        effort_match: 'good', // good, high, low
        completion_status: 'completed'
      },
      notes: 'Felt good in the water, technique felt smooth'
    },
    created_at: '2024-01-08T09:15:00Z'
  },
  {
    id: 'completed_1_2',
    workout_id: 'workout_1_2', // Tuesday run
    user_id: 'user_1',
    strava_activity_id: 'strava_123457',
    completed_at: '2024-01-09T07:30:00Z',
    activity_data: {
      planned: {
        duration: '40 min',
        distance: '6 km',
        discipline: 'run'
      },
      actual: {
        duration: '38 min',
        distance: '6.2 km',
        discipline: 'run',
        average_pace: '6:08/km',
        average_heart_rate: 138,
        max_heart_rate: 152,
        calories: 412,
        cadence: 176
      },
      analysis: {
        duration_variance: '-2 min',
        distance_variance: '+0.2 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Perfect easy pace, felt relaxed throughout'
    },
    created_at: '2024-01-09T07:30:00Z'
  },
  {
    id: 'completed_1_3',
    workout_id: 'workout_1_3', // Wednesday bike
    user_id: 'user_1',
    strava_activity_id: 'strava_123458',
    completed_at: '2024-01-10T06:45:00Z',
    activity_data: {
      planned: {
        duration: '75 min',
        distance: '30 km',
        discipline: 'bike'
      },
      actual: {
        duration: '73 min',
        distance: '29.8 km',
        discipline: 'bike',
        average_speed: '24.5 km/h',
        average_power: 185,
        normalized_power: 192,
        average_heart_rate: 145,
        max_heart_rate: 162,
        calories: 634,
        average_cadence: 91
      },
      analysis: {
        duration_variance: '-2 min',
        distance_variance: '-0.2 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Steady ride, power felt consistent'
    },
    created_at: '2024-01-10T06:45:00Z'
  },
  {
    id: 'completed_1_4',
    workout_id: 'workout_1_4', // Thursday run
    user_id: 'user_1',
    strava_activity_id: 'strava_123459',
    completed_at: '2024-01-11T17:20:00Z',
    activity_data: {
      planned: {
        duration: '25 min',
        distance: '3.5 km',
        discipline: 'run'
      },
      actual: {
        duration: '26 min',
        distance: '3.6 km',
        discipline: 'run',
        average_pace: '7:13/km',
        average_heart_rate: 128,
        max_heart_rate: 140,
        calories: 238,
        cadence: 172
      },
      analysis: {
        duration_variance: '+1 min',
        distance_variance: '+0.1 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Nice recovery run, legs felt fresh'
    },
    created_at: '2024-01-11T17:20:00Z'
  },
  // Skipped Friday rest day (correctly)
  {
    id: 'completed_1_6',
    workout_id: 'workout_1_6', // Saturday bike
    user_id: 'user_1',
    strava_activity_id: 'strava_123460',
    completed_at: '2024-01-13T08:00:00Z',
    activity_data: {
      planned: {
        duration: '90 min',
        distance: '35 km',
        discipline: 'bike'
      },
      actual: {
        duration: '88 min',
        distance: '34.2 km',
        discipline: 'bike',
        average_speed: '23.3 km/h',
        average_power: 178,
        normalized_power: 183,
        average_heart_rate: 148,
        max_heart_rate: 165,
        calories: 758,
        average_cadence: 89
      },
      analysis: {
        duration_variance: '-2 min',
        distance_variance: '-0.8 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Good long ride, practiced nutrition every 20 min'
    },
    created_at: '2024-01-13T08:00:00Z'
  },
  // Missed Sunday long run (workout_1_7) - shows realistic missed workout

  // Week 2 completed workouts (6 of 7 completed - missed one)
  {
    id: 'completed_2_1',
    workout_id: 'workout_2_1', // Monday swim
    user_id: 'user_1',
    strava_activity_id: 'strava_123461',
    completed_at: '2024-01-15T18:30:00Z',
    activity_data: {
      planned: {
        duration: '50 min',
        distance: '1400m',
        discipline: 'swim'
      },
      actual: {
        duration: '52 min',
        distance: '1420m',
        discipline: 'swim',
        average_pace: '2:12/100m',
        average_heart_rate: 148,
        max_heart_rate: 168,
        calories: 425
      },
      analysis: {
        duration_variance: '+2 min',
        distance_variance: '+20m',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Intervals felt strong, good technique focus'
    },
    created_at: '2024-01-15T18:30:00Z'
  },
  {
    id: 'completed_2_2',
    workout_id: 'workout_2_2', // Tuesday run
    user_id: 'user_1',
    strava_activity_id: 'strava_123462',
    completed_at: '2024-01-16T06:15:00Z',
    activity_data: {
      planned: {
        duration: '45 min',
        distance: '7 km',
        discipline: 'run'
      },
      actual: {
        duration: '44 min',
        distance: '7.1 km',
        discipline: 'run',
        average_pace: '6:12/km',
        average_heart_rate: 142,
        max_heart_rate: 162,
        calories: 485,
        cadence: 178
      },
      analysis: {
        duration_variance: '-1 min',
        distance_variance: '+0.1 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Strides felt good, nice form work'
    },
    created_at: '2024-01-16T06:15:00Z'
  },
  {
    id: 'completed_2_3',
    workout_id: 'workout_2_3', // Wednesday bike
    user_id: 'user_1',
    strava_activity_id: 'strava_123463',
    completed_at: '2024-01-17T07:00:00Z',
    activity_data: {
      planned: {
        duration: '80 min',
        distance: '32 km',
        discipline: 'bike'
      },
      actual: {
        duration: '82 min',
        distance: '33.1 km',
        discipline: 'bike',
        average_speed: '24.2 km/h',
        average_power: 195,
        normalized_power: 208,
        average_heart_rate: 155,
        max_heart_rate: 172,
        calories: 721,
        average_cadence: 94
      },
      analysis: {
        duration_variance: '+2 min',
        distance_variance: '+1.1 km',
        effort_match: 'high', // Pushed a bit harder than planned
        completion_status: 'completed'
      },
      notes: 'Tempo intervals felt strong, maybe pushed a bit hard'
    },
    created_at: '2024-01-17T07:00:00Z'
  },
  {
    id: 'completed_2_4',
    workout_id: 'workout_2_4', // Thursday run
    user_id: 'user_1',
    strava_activity_id: 'strava_123464',
    completed_at: '2024-01-18T16:45:00Z',
    activity_data: {
      planned: {
        duration: '30 min',
        distance: '4.5 km',
        discipline: 'run'
      },
      actual: {
        duration: '28 min',
        distance: '4.2 km',
        discipline: 'run',
        average_pace: '6:40/km',
        average_heart_rate: 132,
        max_heart_rate: 145,
        calories: 295,
        cadence: 174
      },
      analysis: {
        duration_variance: '-2 min',
        distance_variance: '-0.3 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Easy recovery run, legs still felt heavy from bike'
    },
    created_at: '2024-01-18T16:45:00Z'
  },
  {
    id: 'completed_2_5',
    workout_id: 'workout_2_5', // Friday swim
    user_id: 'user_1',
    strava_activity_id: 'strava_123465',
    completed_at: '2024-01-19T12:15:00Z',
    activity_data: {
      planned: {
        duration: '40 min',
        distance: '1200m',
        discipline: 'swim'
      },
      actual: {
        duration: '39 min',
        distance: '1180m',
        discipline: 'swim',
        average_pace: '1:58/100m',
        average_heart_rate: 145,
        max_heart_rate: 160,
        calories: 398
      },
      analysis: {
        duration_variance: '-1 min',
        distance_variance: '-20m',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Steady pace, good rhythm on the 300s'
    },
    created_at: '2024-01-19T12:15:00Z'
  },
  {
    id: 'completed_2_6',
    workout_id: 'workout_2_6', // Saturday bike
    user_id: 'user_1',
    strava_activity_id: 'strava_123466',
    completed_at: '2024-01-20T09:30:00Z',
    activity_data: {
      planned: {
        duration: '105 min',
        distance: '42 km',
        discipline: 'bike'
      },
      actual: {
        duration: '107 min',
        distance: '41.8 km',
        discipline: 'bike',
        average_speed: '23.4 km/h',
        average_power: 188,
        normalized_power: 196,
        average_heart_rate: 152,
        max_heart_rate: 171,
        calories: 912,
        average_cadence: 90
      },
      analysis: {
        duration_variance: '+2 min',
        distance_variance: '-0.2 km',
        effort_match: 'good',
        completion_status: 'completed'
      },
      notes: 'Progressive build felt good, last section was challenging'
    },
    created_at: '2024-01-20T09:30:00Z'
  }
  // Today's brick workout (workout_2_7) not yet completed - shows as scheduled
];

// Helper functions matching Supabase query patterns
export const getCompletedWorkoutsByUserId = (userId) => 
  mockCompletedWorkouts.filter(completed => completed.user_id === userId);

export const getCompletedWorkoutByWorkoutId = (workoutId) => 
  mockCompletedWorkouts.find(completed => completed.workout_id === workoutId);

export const getCompletedWorkoutsInDateRange = (userId, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockCompletedWorkouts.filter(completed => 
    completed.user_id === userId &&
    new Date(completed.completed_at) >= start &&
    new Date(completed.completed_at) <= end
  );
};

// Helper to check if workout is completed
export const isWorkoutCompleted = (workoutId) => 
  mockCompletedWorkouts.some(completed => completed.workout_id === workoutId);

// Helper to get workout completion stats
export const getWorkoutStats = (userId, weekNumber = null) => {
  const userCompletedWorkouts = getCompletedWorkoutsByUserId(userId);
  
  // If week specified, filter by week (this would need workout data joined)
  // For now, return overall stats
  
  const totalCompleted = userCompletedWorkouts.length;
  const disciplines = userCompletedWorkouts.reduce((acc, completed) => {
    const discipline = completed.activity_data.actual.discipline;
    acc[discipline] = (acc[discipline] || 0) + 1;
    return acc;
  }, {});
  
  return {
    totalCompleted,
    byDiscipline: disciplines,
    completionRate: '85%' // Mock calculation
  };
};