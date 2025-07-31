import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/tokens';
import WeekWorkoutIcons from '../dashboard/WeekWorkoutIcons';
import WeekWorkoutList from '../dashboard/WeekWorkoutList';
import PhaseBadge from '../ui/PhaseBadge';

interface WeekDetailCardProps {
  weekNumber: number;
  totalWeeks: number;
  phase: string;
  description: string;
  workouts: any[];
  onWorkoutPress?: (workoutId: string) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export default function WeekDetailCard({
  weekNumber,
  totalWeeks,
  phase,
  description,
  workouts,
  onWorkoutPress,
  onPreviousWeek,
  onNextWeek,
}: WeekDetailCardProps) {
  
  const canGoPrevious = weekNumber > 1;
  const canGoNext = weekNumber < totalWeeks;

  return (
    <View style={styles.container}>
      {/* Week Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.weekTitleContainer}>
          <TouchableOpacity
            style={[styles.navButton, !canGoPrevious && styles.navButtonDisabled]}
            onPress={onPreviousWeek}
            disabled={!canGoPrevious}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={canGoPrevious ? colors.neutral.text : colors.neutral.secondary}
            />
          </TouchableOpacity>

          <Text style={styles.weekTitle}>Week {weekNumber}</Text>

          <TouchableOpacity
            style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
            onPress={onNextWeek}
            disabled={!canGoNext}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={canGoNext ? colors.neutral.text : colors.neutral.secondary}
            />
          </TouchableOpacity>
        </View>
        
        <PhaseBadge 
          phase={phase} 
          style={styles.phaseBadge}
        />
      </View>

      {/* Week Focus Section */}
      <View style={styles.focusSection}>
        <View style={styles.focusHeader}>
          <View style={styles.focusTitleRow}>
            <Ionicons name="bulb-outline" size={14} color={`${colors.white}BF`} />
            <Text style={styles.focusTitle}>WEEK FOCUS</Text>
          </View>
        </View>
        <Text style={styles.focusText}>{description}</Text>
      </View>

      {/* Workouts Section */}
      <View style={styles.workoutsSection}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    ...shadows.base,
    overflow: 'hidden',
  },

  headerSection: {
    padding: spacing[5],
    paddingBottom: spacing[2],
  },

  weekTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },

  weekTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    flex: 1,
    textAlign: 'center',
  },

  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.system.gray6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navButtonDisabled: {
    opacity: 0.3,
  },

  phaseBadge: {
    marginBottom: spacing[2],
    alignSelf: 'center',
  },

  focusSection: {
    backgroundColor: colors.neutral.text,
    marginHorizontal: spacing[5],
    marginBottom: spacing[4],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },

  focusHeader: {
    marginBottom: spacing[2],
  },

  focusTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  focusTitle: {
    fontSize: 11,
    color: `${colors.white}BF`,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
    marginLeft: spacing[1] + spacing[1]/2,
    textTransform: 'uppercase',
  },

  focusText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    lineHeight: 20,
  },

  workoutsSection: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[5],
  },
});