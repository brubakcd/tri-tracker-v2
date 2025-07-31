import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

interface QuickActionsProps {
  todaysWorkout?: {
    discipline: string;
    title: string;
    duration: string;
  } | null;
  weekStats: {
    completed: number;
    total: number;
    hoursRemaining: number;
  };
  onTodaysWorkoutPress?: () => void;
  onCurrentWeekPress?: () => void;
  onPlanOverviewPress?: () => void;
  onManagePlanPress?: () => void;
}

export default function QuickActions({
  todaysWorkout,
  weekStats,
  onTodaysWorkoutPress,
  onCurrentWeekPress,
  onPlanOverviewPress,
  onManagePlanPress,
}: QuickActionsProps) {
  const getDisciplineIcon = (discipline: string) => {
    switch (discipline?.toLowerCase()) {
      case 'swim':
        return 'water';
      case 'bike':
        return 'bicycle';
      case 'run':
        return 'footsteps';
      case 'brick':
        return 'layers';
      default:
        return 'today';
    }
  };

  const getDisciplineColor = (discipline: string) => {
    switch (discipline?.toLowerCase()) {
      case 'swim':
        return colors.disciplines.swim;
      case 'bike':
        return colors.disciplines.bike;
      case 'run':
        return colors.disciplines.run;
      default:
        return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionsCard}>
        {/* Today's Workout */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={onTodaysWorkoutPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={todaysWorkout ? getDisciplineIcon(todaysWorkout.discipline) : 'today'} 
              size={24} 
              color={todaysWorkout ? getDisciplineColor(todaysWorkout.discipline) : colors.neutral.secondary} 
            />
          </View>
          <Text style={styles.actionText}>Today's{'\n'}Workout</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Calendar */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={onCurrentWeekPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" size={24} color={colors.system.blue} />
          </View>
          <Text style={styles.actionText}>Calendar{'\n'}View</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Plan Overview */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={onPlanOverviewPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="map-outline" size={24} color={colors.system.purple} />
          </View>
          <Text style={styles.actionText}>Plan{'\n'}Overview</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Manage Plan */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={onManagePlanPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="clipboard-outline" size={24} color={colors.system.orange} />
          </View>
          <Text style={styles.actionText}>Manage{'\n'}Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[3],
  },

  actionsCard: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[2],
    ...shadows.sm,
  },

  actionItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[2],
  },

  iconContainer: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },

  actionText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    textAlign: 'center',
    lineHeight: 14,
    height: 28,
    textAlignVertical: 'center',
  },

  divider: {
    width: 1,
    backgroundColor: colors.neutral.separator,
    marginVertical: spacing[2],
  },
});