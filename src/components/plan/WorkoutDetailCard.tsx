import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CompletedStats {
  actualDuration: string;
  avgHeartRate?: string;
  distance?: string;
  feeling: 'excellent' | 'good' | 'okay' | 'tough';
}

interface WorkoutDetailCardProps {
  dayOfWeek: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  intensity: string;
  duration: string;
  phases: string;
  status: 'completed' | 'scheduled' | 'upcoming';
  coachNote?: string;
  completedStats?: CompletedStats;
  onPress?: () => void;
}

export default function WorkoutDetailCard({
  dayOfWeek,
  date,
  title,
  subtitle,
  description,
  intensity,
  duration,
  phases,
  status,
  coachNote,
  completedStats,
  onPress,
}: WorkoutDetailCardProps) {
  const getStatusDotColor = () => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'scheduled': return '#007AFF';
      case 'upcoming': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusBadgeStyle = () => {
    switch (status) {
      case 'completed': return { backgroundColor: '#34C75920', color: '#34C759' };
      case 'scheduled': return { backgroundColor: '#007AFF20', color: '#007AFF' };
      case 'upcoming': return { backgroundColor: '#8E8E9320', color: '#8E8E93' };
      default: return { backgroundColor: '#8E8E9320', color: '#8E8E93' };
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

  const getFeelingIcon = (feeling: string) => {
    switch (feeling) {
      case 'excellent': return { icon: 'happy-outline', color: '#34C759' };
      case 'good': return { icon: 'happy-outline', color: '#5AC8FA' };
      case 'okay': return { icon: 'remove-circle-outline', color: '#FF9500' };
      case 'tough': return { icon: 'sad-outline', color: '#FF3B30' };
      default: return { icon: 'remove-circle-outline', color: '#8E8E93' };
    }
  };

  const isCompleted = status === 'completed';

  return (
    <View style={styles.container}>
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

      <Text style={styles.description}>{description}</Text>

      <View style={styles.metrics}>
        {isCompleted && completedStats ? (
          <>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{completedStats.actualDuration}</Text>
              <Text style={styles.metricLabel}>ACTUAL TIME</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>
                {completedStats.avgHeartRate || completedStats.distance || '—'}
              </Text>
              <Text style={styles.metricLabel}>
                {completedStats.avgHeartRate ? 'AVG HR' : completedStats.distance ? 'DISTANCE' : 'DATA'}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <View style={styles.feelingContainer}>
                <Ionicons 
                  name={getFeelingIcon(completedStats.feeling).icon as any} 
                  size={16} 
                  color={getFeelingIcon(completedStats.feeling).color}
                />
              </View>
              <Text style={styles.metricLabel}>FEELING</Text>
            </View>
          </>
        ) : (
          <>
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
          </>
        )}
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.actionButtonText}>
          {status === 'completed' ? 'View Results' : status === 'scheduled' ? 'Start Workout' : 'View Details'}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {coachNote && (
        <View style={styles.coachTip}>
          <View style={styles.coachTipHeader}>
            <Ionicons 
              name={isCompleted ? "checkmark-circle-outline" : "analytics-outline"} 
              size={16} 
              color="#8E8E93" 
            />
            <Text style={styles.coachTipLabel}>
              {isCompleted ? 'POST-WORKOUT NOTE' : 'COACHING TIP'}
            </Text>
          </View>
          <Text style={styles.coachTipText}>{coachNote}</Text>
        </View>
      )}
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

  feelingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },

  actionButton: {
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 6,
  },

  coachTip: {
    backgroundColor: '#F2F2F7',
    padding: 14,
    borderRadius: 10,
  },

  coachTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  coachTipLabel: {
    fontSize: 10,
    color: '#8E8E93',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 6,
    textTransform: 'uppercase',
  },

  coachTipText: {
    fontSize: 13,
    color: '#48484A',
    lineHeight: 18,
  },
});