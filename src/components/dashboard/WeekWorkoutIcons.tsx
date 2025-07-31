import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../styles/tokens';

interface WeekWorkoutIconsProps {
  workouts: any[];
  onWorkoutPress?: (workoutId: string) => void;
}

export default function WeekWorkoutIcons({
  workouts,
  onWorkoutPress
}: WeekWorkoutIconsProps) {
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
      case 'swim': return colors.disciplines.swim;
      case 'bike': return colors.disciplines.bike;
      case 'run': return colors.disciplines.run;
      case 'brick': return colors.disciplines.brick;
      case 'rest': return colors.status.rest;
      default: return colors.status.rest;
    }
  };

  return (
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
                size={14} 
                color={
                  isToday 
                    ? colors.white 
                    : isCompleted 
                      ? getDisciplineColor(workout.discipline) 
                      : colors.system.gray
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
  );
}

const styles = StyleSheet.create({
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[1],
  },

  dayContainer: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 50,
    minWidth: 36,
  },

  dayName: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.system.gray,
    marginBottom: spacing[2],
    textTransform: 'uppercase',
  },

  dayIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.system.gray6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },

  dayIconToday: {
    backgroundColor: colors.primary,
  },

  dayDate: {
    fontSize: typography.sizes.xs,
    color: colors.system.gray,
    fontWeight: typography.weights.medium,
  },

  dayDateToday: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});