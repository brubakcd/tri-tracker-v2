// Mock Data Exports
// All mock data matching Supabase schema structure

// User data
export { 
  mockUsers, 
  getCurrentUser, 
  getUserById 
} from './mockUsers';

// Race and training plan data
export { 
  mockRaces, 
  getRacesByUserId, 
  getCurrentRace, 
  getRaceById 
} from './mockRaces';

export { 
  mockTrainingPlans, 
  getTrainingPlanByRaceId, 
  getTrainingPlanById, 
  getCurrentPhase 
} from './mockTrainingPlans';

// Workout data
export { 
  mockWorkouts, 
  getWorkoutsByPlanId, 
  getWorkoutsByWeek, 
  getWorkoutById, 
  getTodaysWorkout, 
  getUpcomingWorkouts 
} from './mockWorkouts';

// Completed workout data (Strava-like)
export { 
  mockCompletedWorkouts, 
  getCompletedWorkoutsByUserId, 
  getCompletedWorkoutByWorkoutId, 
  getCompletedWorkoutsInDateRange, 
  isWorkoutCompleted, 
  getWorkoutStats 
} from './mockCompletedWorkouts';

// AI coaching data
export { 
  mockAIInteractions, 
  getAIInteractionsByUserId, 
  getLatestInsight, 
  getDailyMotivation, 
  getCoachingInsights, 
  getUpcomingWorkoutGuidance 
} from './mockAIInteractions';

import { getWorkoutsByPlanId } from './mockWorkouts';
import { isWorkoutCompleted } from './mockCompletedWorkouts';

// Weekly progress helper
export const getWeeklyProgress = (planId) => {
  const workouts = getWorkoutsByPlanId(planId);
  const currentWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.scheduled_date);
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
    
    return workoutDate >= weekStart && workoutDate <= weekEnd;
  });
  
  const completedWorkouts = currentWeekWorkouts.filter(w => isWorkoutCompleted(w.id));
  const totalMinutes = completedWorkouts.reduce((sum, w) => {
    const duration = parseInt(w.workout_data.duration) || 0;
    return sum + duration;
  }, 0);
  
  return {
    workoutsCompleted: completedWorkouts.length,
    workoutsRemaining: currentWeekWorkouts.length - completedWorkouts.length,
    totalMinutes,
    totalWorkouts: currentWeekWorkouts.length
  };
};

// Convenience functions for common data operations
export const getMockDataSummary = () => {
  return {
    users: mockUsers.length,
    races: mockRaces.length,
    training_plans: mockTrainingPlans.length,
    workouts: mockWorkouts.length,
    completed_workouts: mockCompletedWorkouts.length,
    ai_interactions: mockAIInteractions.length,
    data_range: {
      start_date: '2024-01-08', // First workout
      end_date: '2024-01-28',   // Last planned workout
      weeks_covered: 3
    }
  };
};