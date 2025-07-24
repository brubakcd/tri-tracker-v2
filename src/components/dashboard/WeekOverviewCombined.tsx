import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutMiniItem from '../workout/WorkoutMiniItem';

interface WeekOverviewCombinedProps {
  workouts: any[];
  currentWeek?: number;
  totalWeeks?: number;
  weekPhase?: string;
  onWorkoutPress?: (workoutId: string) => void;
  onViewPlanPress?: () => void;
}

export default function WeekOverviewCombined({
  workouts,
  currentWeek = 8,
  totalWeeks = 16,
  weekPhase = 'Build Phase',
  onWorkoutPress,
  onViewPlanPress
}: WeekOverviewCombinedProps) {
  const today = new Date();

  const getDisciplineIcon = (discipline: string): keyof typeof Ionicons.glyphMap => {
    switch (discipline) {
      case 'swim': return 'water';
      case 'bike': return 'bicycle';
      case 'run': return 'walk';
      case 'brick': return 'fitness';
      case 'rest': return 'moon';
      default: return 'fitness';
    }
  };

  const getDisciplineColor = (discipline: string): string => {
    switch (discipline) {
      case 'swim': return '#0EA5E9';
      case 'bike': return '#FB923C';
      case 'run': return '#4ADE80';
      case 'brick': return '#8B5CF6';
      case 'rest': return '#9CA3AF';
      default: return '#9CA3AF';
    }
  };

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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Week {currentWeek}</Text>
          <Text style={styles.phase}>{weekPhase}</Text>
        </View>
        <TouchableOpacity onPress={onViewPlanPress}>
          <Text style={styles.viewPlanButton}>View training plan</Text>
        </TouchableOpacity>
      </View>
      
      {/* Horizontal Week View */}
      <View style={styles.weekGrid}>
        {workouts.map((workout: any, index: number) => {
          const workoutDate = new Date(workout.scheduled_date);
          const isToday = workoutDate.toDateString() === today.toDateString();
          const isCompleted = workout.status === 'completed';
          
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.dayContainer}
              onPress={() => onWorkoutPress && onWorkoutPress(workout.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.dayName}>
                {workoutDate.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)}
              </Text>
              <View style={[
                styles.dayIcon,
                isToday && styles.dayIconToday,
                isCompleted && { 
                  backgroundColor: getDisciplineColor(workout.discipline) + '20',
                  borderColor: getDisciplineColor(workout.discipline),
                  borderWidth: 1
                }
              ]}>
                <Ionicons 
                  name={getDisciplineIcon(workout.discipline)} 
                  size={16} 
                  color={
                    isToday 
                      ? '#FFFFFF' 
                      : isCompleted 
                        ? getDisciplineColor(workout.discipline) 
                        : '#9CA3AF'
                  } 
                />
              </View>
              <Text style={[
                styles.dayDate,
                isToday && styles.dayDateToday
              ]}>
                {workoutDate.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },

  phase: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 2,
  },

  viewPlanButton: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },

  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },

  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },

  dayName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
  },

  dayIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  dayIconToday: {
    backgroundColor: '#007AFF',
  },

  dayDate: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },

  dayDateToday: {
    color: '#007AFF',
    fontWeight: '600',
  },

  separator: {
    height: 1,
    backgroundColor: '#D1D1D6',
    marginBottom: 16,
  },

  workoutList: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
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