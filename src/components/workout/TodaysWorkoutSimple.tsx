import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTodaysWorkout } from '../../data';

interface TodaysWorkoutSimpleProps {
  onPress?: () => void;
}

export default function TodaysWorkoutSimple({ onPress }: TodaysWorkoutSimpleProps) {
  const todaysWorkout = getTodaysWorkout('plan_1');
  
  if (!todaysWorkout) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No workout scheduled for today</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={styles.statusDot} />
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

      <View style={styles.metrics}>
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

      <TouchableOpacity style={styles.startButton} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.startButtonText}>View Workout Details</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {coachNote && (
        <View style={styles.coachTip}>
          <View style={styles.coachTipHeader}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#8E8E93" />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
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
    backgroundColor: '#34C759',
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
  
  todayBadge: {
    backgroundColor: '#34C75920',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  
  todayText: {
    fontSize: 11,
    color: '#34C759',
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
  
  startButton: {
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  
  startButtonText: {
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