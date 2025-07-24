import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WeekWorkoutsHorizontalProps {
  workouts: any[];
  onWorkoutPress?: (workoutId: string) => void;
  onViewPlanPress?: () => void;
  title?: string;
}

export default function WeekWorkoutsHorizontal({ workouts, onWorkoutPress, onViewPlanPress, title = "This Week" }: WeekWorkoutsHorizontalProps) {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onViewPlanPress}>
          <Text style={styles.viewPlanButton}>View training plan</Text>
        </TouchableOpacity>
      </View>
      
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
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
});