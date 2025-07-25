import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WeekWorkoutIcons from '../dashboard/WeekWorkoutIcons';
import WeekWorkoutList from '../dashboard/WeekWorkoutList';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface WeekPlanProps {
  weekNumber: number;
  phase: string;
  description: string;
  workouts: any[];
  isCurrentWeek?: boolean;
  weekStartDate?: Date;
  currentWeekNumber?: number;
  onWorkoutPress?: (workoutId: string) => void;
  onLayout?: (event: any) => void;
}

export default function WeekPlan({
  weekNumber,
  phase,
  description,
  workouts,
  isCurrentWeek = false,
  weekStartDate,
  currentWeekNumber = 8,
  onWorkoutPress,
  onLayout
}: WeekPlanProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation<any>();

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

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
      // Fallback calculation if no start date provided
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
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    
    if (startDate.getMonth() === endDate.getMonth()) {
      // Same month: "Jan 8 - 14"
      return `${startDate.toLocaleDateString('en-US', { month: 'short' })} ${startDate.getDate()} - ${endDate.getDate()}`;
    } else {
      // Different months: "Jan 30 - Feb 5"
      return `${startDate.toLocaleDateString('en-US', formatOptions)} - ${endDate.toLocaleDateString('en-US', formatOptions)}`;
    }
  };

  // Get phase color
  const getPhaseColor = (phaseName: string) => {
    switch (phaseName.toLowerCase()) {
      case 'base building':
        return colors.system.blue;
      case 'build phase':
        return colors.system.orange;
      case 'peak & taper':
        return colors.system.purple;
      default:
        return colors.system.gray;
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
      onLayout={onLayout}
      onPress={handleWeekPress}
      activeOpacity={0.9}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.dateRange}>{formatDateRange()}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.weekTitle}>Week {weekNumber}</Text>
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.statusBadgeGroup}>
            {isCurrentWeek && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>CURRENT</Text>
              </View>
            )}
            {statusBadgeInfo && (
              <View style={[styles.statusBadge, { backgroundColor: statusBadgeInfo.backgroundColor }]}>
                <Text style={[styles.statusBadgeText, { color: statusBadgeInfo.textColor }]}>
                  {statusBadgeInfo.text}
                </Text>
              </View>
            )}
          </View>
          <View style={[styles.phaseBadge, { backgroundColor: getPhaseColor(phase) + '20' }]}>
            <Text style={[styles.phaseText, { color: getPhaseColor(phase) }]}>{phase}</Text>
          </View>
        </View>
      </View>

      {/* Description - Always show full text */}
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

      {/* Expand/Collapse Button for Workout Details */}
      <TouchableOpacity 
        style={styles.expandButton}
        onPress={(e) => {
          e.stopPropagation();
          toggleExpanded();
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.expandButtonText}>
          {isExpanded ? 'Hide Workout Details' : 'Show Workout Details'}
        </Text>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.neutral.text} 
        />
      </TouchableOpacity>

      {/* Expanded Content - Workout Details */}
      {isExpanded && (
        <WeekWorkoutList 
          workouts={workouts}
          onWorkoutPress={onWorkoutPress}
        />
      )}
    </TouchableOpacity>
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

  currentWeekContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.lg,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
    minHeight: 60, // Ensure consistent header height
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
    marginBottom: spacing[2],
    minHeight: 24, // Match badge height for alignment
  },

  weekTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  badgeContainer: {
    alignItems: 'flex-end',
    gap: spacing[1],
    justifyContent: 'flex-start',
  },

  statusBadgeGroup: {
    alignItems: 'flex-end',
    gap: spacing[1] / 2, // Tighter spacing between status badges
  },

  currentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-end',
    minHeight: 20, // Match xl font size (20px) height
    justifyContent: 'center',
  },

  currentBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: 0.5,
  },

  phaseBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 1,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-end',
    marginTop: spacing[1],
    minHeight: 16, // Match description text line height
    justifyContent: 'center',
  },

  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-end',
    minHeight: 20, // Match xl font size (20px) height
    justifyContent: 'center',
  },

  statusBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },

  phaseText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  description: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.normal,
    color: colors.neutral.text,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.sm,
    marginBottom: spacing[4],
  },

  workoutIconsContainer: {
    marginBottom: spacing[4],
  },

  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
    gap: spacing[2],
  },

  expandButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
});