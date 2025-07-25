import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import WeekWorkoutIcons from './WeekWorkoutIcons';
import WeekWorkoutList from './WeekWorkoutList';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

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
  weekPhase = 'Build Phase',
  onWorkoutPress,
  onViewPlanPress
}: WeekOverviewCombinedProps) {

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
      <WeekWorkoutIcons 
        workouts={workouts}
        onWorkoutPress={onWorkoutPress}
      />

      {/* Detailed Workout List */}
      <WeekWorkoutList 
        workouts={workouts}
        onWorkoutPress={onWorkoutPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    ...shadows.base,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  phase: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
    marginTop: spacing[1] / 2,
  },

  viewPlanButton: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
});