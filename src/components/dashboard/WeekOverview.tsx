import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BodyTextLarge, CaptionText } from '../ui/Typography';
import WorkoutMiniItem from '../workout/WorkoutMiniItem';
import Card from '../ui/Card';
import { spacing } from '../../styles/tokens';

interface WeekOverviewProps {
  workouts: Array<{
    id: string;
    discipline: 'swim' | 'bike' | 'run' | 'brick' | 'rest';
    scheduled_date: string;
    workout_data: {
      title: string;
      description?: string;
      duration: string;
      distance?: string;
      intensity?: string;
    };
  }>;
  currentWeek?: number;
  weekPhase?: string;
  completedCount?: number;
  onWorkoutPress?: (workoutId: string) => void;
}

export default function WeekOverview({ 
  workouts, 
  currentWeek = 8,
  weekPhase = 'Base Building',
  completedCount = 0,
  onWorkoutPress
}: WeekOverviewProps) {
  
  // Sort workouts by date
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
  );

  // Get day info for each workout
  const getWorkoutWithDayInfo = (workout: typeof workouts[0]) => {
    const date = new Date(workout.scheduled_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    const isToday = date.getTime() === today.getTime();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNumber = date.getDate();
    
    return { workout, dayName, dayNumber, isToday };
  };

  const workoutsWithDayInfo = sortedWorkouts.map(getWorkoutWithDayInfo);
  const totalWorkouts = workouts.length;
  const progressText = `${completedCount} of ${totalWorkouts} workouts complete`;

  const handleWorkoutPress = (workoutId: string) => {
    if (onWorkoutPress) {
      onWorkoutPress(workoutId);
    }
  };

  return (
    <Card style={styles.container} variant="elevated">
      <View style={styles.header}>
        <BodyTextLarge style={styles.title}>
          Week {currentWeek} • {weekPhase}
        </BodyTextLarge>
        <CaptionText style={styles.progress}>
          {progressText}
        </CaptionText>
      </View>

      <View style={styles.workoutList}>
        {workoutsWithDayInfo.map(({ workout, dayName, dayNumber, isToday }, index) => (
          <View key={workout.id}>
            <WorkoutMiniItem
              workout={workout}
              dayName={dayName}
              dayNumber={dayNumber}
              isToday={isToday}
              onPress={() => handleWorkoutPress(workout.id)}
            />
            {/* Remove bottom border from last item */}
            {index === workoutsWithDayInfo.length - 1 && (
              <View style={styles.lastItemOverride} />
            )}
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 6,
  },
  
  header: {
    marginBottom: spacing[4],
  },
  
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: spacing[1],
  },
  
  progress: {
    fontSize: 14,
    color: '#6D6D80',
  },
  
  workoutList: {
    marginHorizontal: -spacing[6], // Extend to edges of card
    paddingHorizontal: spacing[6], // Add padding back
  },
  
  lastItemOverride: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'white',
  },
});