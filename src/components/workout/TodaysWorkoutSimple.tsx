import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTodaysWorkout } from '../../data';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

interface TodaysWorkoutSimpleProps {
  onPress?: () => void;
}

export default function TodaysWorkoutSimple({ onPress }: TodaysWorkoutSimpleProps) {
  const todaysWorkout = getTodaysWorkout('plan_1');
  
  if (!todaysWorkout) {
    return (
      <View style={[styles.container, styles.restDayContainer]}>
        <View style={styles.restDayContent}>
          <Ionicons name="moon-outline" size={24} color={colors.system.purple} />
          <Text style={styles.restDayTitle}>Rest Day</Text>
          <Text style={styles.restDaySubtitle}>Focus on recovery and preparation</Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSubtitle = (discipline: string) => {
    switch (discipline) {
      case 'brick': return 'Bike + Run';
      case 'swim': return 'Swimming';
      case 'bike': return 'Cycling';
      case 'run': return 'Running';
      case 'rest': return 'Recovery';
      default: return discipline;
    }
  };


  const coachNote = Array.isArray(todaysWorkout.workout_data.coach_notes) 
    ? todaysWorkout.workout_data.coach_notes[0]
    : todaysWorkout.workout_data.coach_notes;

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case 'swim': return colors.disciplines.swim;
      case 'bike': return colors.disciplines.bike;
      case 'run': return colors.disciplines.run;
      case 'brick': return colors.disciplines.bike; // Use bike color for brick
      default: return colors.primary;
    }
  };

  const disciplineColor = getDisciplineColor(todaysWorkout.discipline);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={[styles.statusDot, { backgroundColor: disciplineColor }]} />
          <View>
            <Text style={styles.title}>{todaysWorkout.workout_data.title}</Text>
            <Text style={styles.subtitle}>{getSubtitle(todaysWorkout.discipline)}</Text>
          </View>
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>{formatDate(todaysWorkout.scheduled_date)}</Text>
          <View style={styles.todayBadge}>
            <Text style={styles.todayText}>Today</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        {todaysWorkout.workout_data.description}
      </Text>

      <View style={[styles.metrics, { backgroundColor: disciplineColor + '10' }]}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{todaysWorkout.workout_data.intensity}</Text>
          <Text style={styles.metricLabel}>INTENSITY</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{todaysWorkout.workout_data.duration}</Text>
          <Text style={styles.metricLabel}>DURATION</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{todaysWorkout.workout_data.structure.length} phases</Text>
          <Text style={styles.metricLabel}>PHASES</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.startButton, { backgroundColor: disciplineColor }]} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.startButtonText}>View Workout Details</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.white} />
      </TouchableOpacity>

      {coachNote && (
        <View style={styles.coachTip}>
          <View style={styles.coachTipHeader}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.system.gray} />
            <Text style={styles.coachTipLabel}>COACHING TIP</Text>
          </View>
          <Text style={styles.coachTipText}>
            {coachNote}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    marginHorizontal: spacing[4],
    ...shadows.base,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.status.completed,
    marginRight: spacing[2] + spacing[1],
  },
  
  title: {
    fontSize: typography.sizes.lg - 1,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },
  
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.system.gray,
    marginTop: spacing[1] / 2,
  },
  
  dateSection: {
    alignItems: 'flex-end',
  },
  
  dateText: {
    fontSize: typography.sizes.xs,
    color: colors.system.gray,
    marginBottom: spacing[1],
  },
  
  todayBadge: {
    backgroundColor: colors.status.completed + '20',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] - 1,
    borderRadius: borderRadius.base + 2,
  },
  
  todayText: {
    fontSize: typography.sizes.xs - 1,
    color: colors.status.completed,
    fontWeight: typography.weights.medium,
  },
  
  description: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing[4],
  },
  
  metrics: {
    flexDirection: 'row',
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.base,
    paddingVertical: spacing[4],
    marginBottom: spacing[4],
    alignItems: 'center',
  },
  
  metricItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  metricValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1] / 2,
  },
  
  metricLabel: {
    fontSize: typography.sizes.xs - 2,
    color: colors.system.gray,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.neutral.border,
  },
  
  startButton: {
    backgroundColor: colors.neutral.text,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3] + spacing[1],
    borderRadius: borderRadius.base + 2,
    marginBottom: spacing[4],
  },
  
  startButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base - 1,
    fontWeight: typography.weights.medium,
    marginRight: spacing[1] + spacing[1]/2,
  },
  
  coachTip: {
    backgroundColor: colors.system.gray6,
    padding: spacing[3] + spacing[1],
    borderRadius: borderRadius.base + 2,
  },
  
  coachTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1] + spacing[1]/2,
  },
  
  coachTipLabel: {
    fontSize: typography.sizes.xs - 2,
    color: colors.system.gray,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
    marginLeft: spacing[1] + spacing[1]/2,
    textTransform: 'uppercase',
  },
  
  coachTipText: {
    fontSize: typography.sizes.sm - 1,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  
  restDayContainer: {
    borderLeftWidth: 3,
    borderLeftColor: colors.system.purple,
    backgroundColor: colors.system.purple + '05',
  },
  
  restDayContent: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  
  restDayTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginTop: spacing[3],
    marginBottom: spacing[1],
  },
  
  restDaySubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },
});