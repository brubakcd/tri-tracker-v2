import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
  totalWeeks?: number;
  weekPhase?: string;
  onWorkoutPress?: (workoutId: string) => void;
  hideWeekPhaseSection?: boolean;
}

export default function WeekOverview({ 
  workouts, 
  currentWeek = 8,
  totalWeeks = 16,
  weekPhase = 'Base Building',
  onWorkoutPress,
  hideWeekPhaseSection = false
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

  const handleWorkoutPress = (workoutId: string) => {
    if (onWorkoutPress) {
      onWorkoutPress(workoutId);
    }
  };

  return (
    <Card style={styles.container} variant="elevated">
      {!hideWeekPhaseSection && (
        <>
          <View style={styles.weekPhaseContainer}>
            <View style={styles.weekPhaseItem}>
              <Text style={styles.weekPhaseValue}>Week {currentWeek}</Text>
              <Text style={styles.weekPhaseLabel}>OF {totalWeeks}</Text>
            </View>
            <View style={styles.weekPhaseDivider} />
            <View style={styles.weekPhaseItem}>
              <Text style={styles.weekPhaseValue}>{weekPhase}</Text>
              <Text style={styles.weekPhaseLabel}>CURRENT PHASE</Text>
            </View>
          </View>

          <View style={styles.separator} />
        </>
      )}

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
  
  weekPhaseContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  weekPhaseItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekPhaseValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },

  weekPhaseLabel: {
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  weekPhaseDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D1D1D6',
  },

  separator: {
    height: 1,
    backgroundColor: '#D1D1D6',
    marginTop: spacing[4],
    marginBottom: 0,
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