import { getCompletedWorkoutsByUserId } from './mockCompletedWorkouts';
import { getWorkoutsByPlanId } from './mockWorkouts';

// Calculate weekly training volume trends
export const getWeeklyVolumeTrends = (userId, weeks = 4) => {
  const completedWorkouts = getCompletedWorkoutsByUserId(userId);
  const weeklyData = [];
  
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const weekWorkouts = completedWorkouts.filter(w => {
      const workoutDate = new Date(w.completed_at);
      return workoutDate >= weekStart && workoutDate <= weekEnd;
    });
    
    const totalMinutes = weekWorkouts.reduce((sum, w) => {
      const duration = parseInt(w.activity_data.actual.duration) || 0;
      return sum + duration;
    }, 0);
    
    weeklyData.push({
      label: i === 0 ? 'This' : i === 1 ? 'Last' : `${i}w`,
      value: totalMinutes,
      unit: 'min'
    });
  }
  
  // Calculate trend
  const thisWeek = weeklyData[weeklyData.length - 1].value;
  const lastWeek = weeklyData[weeklyData.length - 2].value;
  const change = thisWeek - lastWeek;
  const changePercent = lastWeek > 0 ? Math.round((change / lastWeek) * 100) : 0;
  
  return {
    data: weeklyData,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
    changeText: change > 0 ? `+${changePercent}%` : `${changePercent}%`
  };
};

// Get personal records from completed workouts
export const getPersonalRecords = (userId) => {
  const completedWorkouts = getCompletedWorkoutsByUserId(userId);
  const records = [];
  
  // Find fastest swim pace
  const swimWorkouts = completedWorkouts.filter(w => 
    w.activity_data.actual.discipline === 'swim' && w.activity_data.actual.average_pace
  );
  if (swimWorkouts.length > 0) {
    const fastest = swimWorkouts.sort((a, b) => 
      a.activity_data.actual.average_pace.localeCompare(b.activity_data.actual.average_pace)
    )[0];
    records.push({
      discipline: 'swim',
      metric: 'Fastest 100m Pace',
      value: fastest.activity_data.actual.average_pace,
      date: new Date(fastest.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      improvement: '3s'
    });
  }
  
  // Find fastest run pace
  const runWorkouts = completedWorkouts.filter(w => 
    w.activity_data.actual.discipline === 'run' && w.activity_data.actual.average_pace
  );
  if (runWorkouts.length > 0) {
    const fastest = runWorkouts.sort((a, b) => 
      a.activity_data.actual.average_pace.localeCompare(b.activity_data.actual.average_pace)
    )[0];
    records.push({
      discipline: 'run',
      metric: 'Fastest Pace',
      value: fastest.activity_data.actual.average_pace,
      date: new Date(fastest.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      improvement: '5s/km'
    });
  }
  
  // Find highest bike power
  const bikeWorkouts = completedWorkouts.filter(w => 
    w.activity_data.actual.discipline === 'bike' && w.activity_data.actual.average_power
  );
  if (bikeWorkouts.length > 0) {
    const strongest = bikeWorkouts.sort((a, b) => 
      b.activity_data.actual.average_power - a.activity_data.actual.average_power
    )[0];
    records.push({
      discipline: 'bike',
      metric: 'Highest Avg Power',
      value: `${strongest.activity_data.actual.average_power}W`,
      date: new Date(strongest.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      improvement: '12W'
    });
  }
  
  return records;
};

// Calculate training consistency
export const getConsistencyData = (userId, planId) => {
  const completedWorkouts = getCompletedWorkoutsByUserId(userId);
  const plannedWorkouts = getWorkoutsByPlanId(planId);
  
  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    checkDate.setHours(0, 0, 0, 0);
    
    const dayWorkouts = completedWorkouts.filter(w => {
      const workoutDate = new Date(w.completed_at);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate.getTime() === checkDate.getTime();
    });
    
    if (dayWorkouts.length > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Calculate weekly completion
  const weeklyCompletion = [];
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - checkDate.getDay() + i);
    checkDate.setHours(0, 0, 0, 0);
    
    const planned = plannedWorkouts.filter(w => {
      const workoutDate = new Date(w.scheduled_date);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate.getTime() === checkDate.getTime() && w.discipline !== 'rest';
    });
    
    const completed = completedWorkouts.filter(w => {
      const workoutDate = new Date(w.completed_at);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate.getTime() === checkDate.getTime();
    });
    
    weeklyCompletion.push(planned.length > 0 && completed.length >= planned.length ? 1 : 0);
  }
  
  return {
    currentStreak,
    longestStreak: 8, // Mock data
    weeklyCompletion
  };
};

// Get heart rate zone distribution
export const getHeartRateZones = (userId) => {
  const completedWorkouts = getCompletedWorkoutsByUserId(userId);
  const recentWorkouts = completedWorkouts.slice(0, 5);
  
  const avgHeartRate = recentWorkouts.reduce((sum, w) => 
    sum + (w.activity_data.actual.average_heart_rate || 0), 0
  ) / recentWorkouts.length;
  
  return {
    data: [
      { label: 'Z1', value: 15 },
      { label: 'Z2', value: 35 },
      { label: 'Z3', value: 30 },
      { label: 'Z4', value: 15 },
      { label: 'Z5', value: 5 }
    ],
    trend: 'stable',
    changeText: 'Well balanced',
    avgHeartRate: Math.round(avgHeartRate)
  };
};

// Get training load progression
export const getTrainingLoad = (userId) => {
  const volumeTrends = getWeeklyVolumeTrends(userId, 6);
  return {
    data: volumeTrends.data,
    trend: volumeTrends.trend,
    changeText: volumeTrends.changeText
  };
};