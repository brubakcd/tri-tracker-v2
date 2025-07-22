import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../styles/tokens';

interface WorkoutDetailHeaderProps {
  dayOfWeek: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  intensity: string;
  duration: string;
  phases: string;
  status: 'completed' | 'scheduled' | 'upcoming';
  workoutOverview: string;
}

export default function WorkoutDetailHeader({
  dayOfWeek,
  date,
  title,
  subtitle,
  description,
  intensity,
  duration,
  phases,
  status,
  workoutOverview,
}: WorkoutDetailHeaderProps) {
  const getStatusDotColor = () => {
    switch (status) {
      case 'completed': return colors.status.completed;
      case 'scheduled': return colors.status.scheduled;
      case 'upcoming': return colors.neutral.secondary;
      default: return colors.neutral.secondary;
    }
  };

  const getStatusBadgeStyle = () => {
    switch (status) {
      case 'completed': return { backgroundColor: colors.status.completed + '20', color: colors.status.completed };
      case 'scheduled': return { backgroundColor: colors.status.scheduled + '20', color: colors.status.scheduled };
      case 'upcoming': return { backgroundColor: colors.neutral.secondary + '20', color: colors.neutral.secondary };
      default: return { backgroundColor: colors.neutral.secondary + '20', color: colors.neutral.secondary };
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'scheduled': return 'Today';
      case 'upcoming': return dayOfWeek;
      default: return dayOfWeek;
    }
  };

  const statusBadge = getStatusBadgeStyle();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={[styles.statusDot, { backgroundColor: getStatusDotColor() }]} />
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>{date}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusBadge.backgroundColor }]}>
              <Text style={[styles.statusText, { color: statusBadge.color }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Metrics */}
        <View style={styles.metrics}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{intensity}</Text>
            <Text style={styles.metricLabel}>INTENSITY</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{duration}</Text>
            <Text style={styles.metricLabel}>DURATION</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{phases}</Text>
            <Text style={styles.metricLabel}>PHASES</Text>
          </View>
        </View>
      </View>

      {/* Workout Overview Section (AI Insights style) */}
      <View style={styles.overviewSection}>
        <View style={styles.overviewHeader}>
          <View style={styles.overviewTitleRow}>
            <Ionicons 
              name="fitness" 
              size={14} 
              color="rgba(255, 255, 255, 0.7)" 
            />
            <Text style={styles.overviewTitle}>WORKOUT OVERVIEW</Text>
          </View>
        </View>
        <Text style={styles.overviewText}>{workoutOverview}</Text>
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
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
    overflow: 'hidden',
  },

  mainContent: {
    // No padding here since container already has padding
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
    marginRight: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1C1C1E',
  },

  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },

  dateSection: {
    alignItems: 'flex-end',
  },

  dateText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },

  description: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
    marginBottom: 16,
  },

  metrics: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
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

  // Workout Overview Section (AI Insights style)
  overviewSection: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    marginHorizontal: -20, // Negative margin to extend to card edges
    marginBottom: -20, // Negative margin to extend to card edges
  },

  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  overviewTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  overviewTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 6,
    textTransform: 'uppercase',
  },

  overviewText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
});