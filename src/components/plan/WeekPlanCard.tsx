import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WeekWorkoutIcons from '../dashboard/WeekWorkoutIcons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';
import PhaseBadge from '../ui/PhaseBadge';

interface WeekPlanCardProps {
  weekNumber: number;
  phase: string;
  description: string;
  workouts: any[];
  isCurrentWeek?: boolean;
  weekStartDate?: Date;
  currentWeekNumber?: number;
  onWorkoutPress?: (workoutId: string) => void;
}

export default function WeekPlanCard({
  weekNumber,
  phase,
  description,
  workouts,
  isCurrentWeek = false,
  weekStartDate,
  currentWeekNumber = 8,
  onWorkoutPress,
}: WeekPlanCardProps) {
  const navigation = useNavigation<any>();

  const handleWeekPress = () => {
    navigation.navigate('WeekDetail', {
      weekNumber,
      phase,
      description,
      workouts
    });
  };

  // Calculate week date range
  const getWeekDateRange = () => {
    if (!weekStartDate) {
      const baseDate = new Date(2024, 0, 8); // Jan 8, 2024
      const startDate = new Date(baseDate);
      startDate.setDate(baseDate.getDate() + (weekNumber - 1) * 7);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      return { startDate, endDate };
    }
    
    const startDate = new Date(weekStartDate);
    const endDate = new Date(weekStartDate);
    endDate.setDate(startDate.getDate() + 6);
    return { startDate, endDate };
  };

  const formatDateRange = () => {
    const { startDate, endDate } = getWeekDateRange();
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'short' })} ${startDate.getDate()} - ${endDate.getDate()}`;
    } else {
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  };


  // Determine week status
  const getWeekStatus = () => {
    if (weekNumber < currentWeekNumber) {
      return 'completed';
    } else if (weekNumber === currentWeekNumber) {
      return 'current';
    } else {
      return 'scheduled';
    }
  };

  const weekStatus = getWeekStatus();

  // Get status badge info
  const getStatusBadgeInfo = () => {
    switch (weekStatus) {
      case 'completed':
        return {
          text: 'COMPLETED',
          backgroundColor: colors.status.completed,
          textColor: colors.white
        };
      case 'scheduled':
        return {
          text: 'SCHEDULED',
          backgroundColor: colors.neutral.secondary,
          textColor: colors.white
        };
      default:
        return null;
    }
  };

  const statusBadgeInfo = getStatusBadgeInfo();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCurrentWeek && styles.currentWeekContainer
      ]}
      onPress={handleWeekPress}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.weekTitle}>Week {weekNumber}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.dateRange}>{formatDateRange()}</Text>
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.statusBadgeGroup}>
            {isCurrentWeek && (
              <PhaseBadge phase={phase} />
            )}
            {statusBadgeInfo && (
              <View style={[styles.statusBadge, { backgroundColor: statusBadgeInfo.backgroundColor }]}>
                <Text style={[styles.statusBadgeText, { color: statusBadgeInfo.textColor }]}>
                  {statusBadgeInfo.text}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        {description}
      </Text>

      {/* Workout Icons */}
      <View style={styles.workoutIconsContainer}>
        <WeekWorkoutIcons 
          workouts={workouts}
          onWorkoutPress={onWorkoutPress}
        />
      </View>

      {/* Tap to View Details */}
      <View style={styles.tapHint}>
        <Text style={styles.tapHintText}>Tap to view week details</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    ...shadows.base,
  },

  currentWeekContainer: {
    ...shadows.lg,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing[4],
    paddingBottom: spacing[3],
  },

  titleContainer: {
    flex: 1,
  },

  dateRange: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  weekTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  badgeContainer: {
    alignItems: 'flex-end',
    gap: spacing[1],
  },

  statusBadgeGroup: {
    alignItems: 'flex-end',
    gap: spacing[1] / 2,
  },


  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-end',
  },

  statusBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },

  description: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.normal,
    color: colors.neutral.text,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.sm,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },

  workoutIconsContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },

  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
    gap: spacing[1],
  },

  tapHintText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
  },
});