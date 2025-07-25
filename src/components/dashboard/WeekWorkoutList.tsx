import React from 'react';
import { View, StyleSheet } from 'react-native';
import WorkoutMiniItem from '../workout/WorkoutMiniItem';
import { colors, spacing } from '../../styles/tokens';

interface WeekWorkoutListProps {
  workouts: any[];
  onWorkoutPress?: (workoutId: string) => void;
}

export default function WeekWorkoutList({
  workouts,
  onWorkoutPress
}: WeekWorkoutListProps) {
  // Sort workouts by date for the detailed list
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
  );

  const getWorkoutWithDayInfo = (workout: any) => {
    const date = new Date(workout.scheduled_date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    const isToday = date.getTime() === todayDate.getTime();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNumber = date.getDate();
    
    return { workout, dayName, dayNumber, isToday };
  };

  const workoutsWithDayInfo = sortedWorkouts.map(getWorkoutWithDayInfo);

  return (
    <View style={styles.container}>
      {/* Separator */}
      <View style={styles.separator} />
      
      {/* Detailed Workout List */}
      <View style={styles.workoutList}>
        {workoutsWithDayInfo.map(({ workout, dayName, dayNumber, isToday }, index) => (
          <View key={workout.id}>
            <WorkoutMiniItem
              workout={workout}
              dayName={dayName}
              dayNumber={dayNumber}
              isToday={isToday}
              onPress={() => onWorkoutPress && onWorkoutPress(workout.id)}
            />
            {index === workoutsWithDayInfo.length - 1 && (
              <View style={styles.lastItemOverride} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[4],
  },

  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    // marginBottom: spacing[0],
  },

  workoutList: {
    marginHorizontal: -spacing[5],
    paddingHorizontal: spacing[5],
  },

  lastItemOverride: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.white,
  },
});