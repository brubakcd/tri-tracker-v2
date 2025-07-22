import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface WeekPlanHeaderProps {
  weekNumber: number;
  totalWeeks: number;
  phase: string;
  description: string;
  totalWorkouts: number;
  completedWorkouts: number;
  totalMinutes: number;
  completedMinutes: number;
}

export default function WeekPlanHeader({
  weekNumber,
  totalWeeks,
  phase,
  description,
  totalWorkouts,
  completedWorkouts,
  totalMinutes,
  completedMinutes,
}: WeekPlanHeaderProps) {
  const progress = (completedWorkouts / totalWorkouts) * 100;
  const remainingWorkouts = totalWorkouts - completedWorkouts;
  const remainingMinutes = totalMinutes - completedMinutes;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.weekText}>Week {weekNumber} of {totalWeeks}</Text>
          <Text style={styles.phaseText}>{phase}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{completedWorkouts}/{totalWorkouts}</Text>
          <Text style={styles.progressLabel}>COMPLETED</Text>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.metrics}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{totalWorkouts}</Text>
          <Text style={styles.metricLabel}>WORKOUTS</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{totalMinutes}</Text>
          <Text style={styles.metricLabel}>TOTAL MIN</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{remainingWorkouts}</Text>
          <Text style={styles.metricLabel}>REMAINING</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{remainingMinutes}</Text>
          <Text style={styles.metricLabel}>MIN LEFT</Text>
        </View>
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
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  weekText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },

  phaseText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },

  progressContainer: {
    alignItems: 'flex-end',
  },

  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },

  progressLabel: {
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 2,
  },

  description: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
    marginBottom: 16,
  },

  progressBar: {
    height: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },

  metrics: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },

  metricItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },

  metricLabel: {
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D1D1D6',
  },
});