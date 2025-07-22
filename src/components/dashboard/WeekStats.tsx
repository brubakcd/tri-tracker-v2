import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BodyTextLarge, CaptionText } from '../ui/Typography';
import { colors, spacing, borderRadius } from '../../styles/tokens';

interface WeekStatsProps {
  completed: number;
  totalMinutes: number;
  remaining: number;
  lastWeekCompleted?: number;
  lastWeekMinutes?: number;
}

export default function WeekStats({ 
  completed, 
  totalMinutes, 
  remaining,
  lastWeekCompleted = 0,
  lastWeekMinutes = 0 
}: WeekStatsProps) {
  const getChangeText = (current: number, previous: number, type: 'workouts' | 'minutes') => {
    const diff = current - previous;
    if (diff === 0) return { text: 'Same as last week', color: '#8E8E93' };
    
    const prefix = diff > 0 ? '+' : '';
    const unit = type === 'workouts' ? '' : ' min';
    const text = `${prefix}${diff}${unit} vs last week`;
    const color = diff > 0 ? '#34C759' : '#FF3B30';
    
    return { text, color };
  };

  const workoutChange = getChangeText(completed, lastWeekCompleted, 'workouts');
  const minuteChange = getChangeText(totalMinutes, lastWeekMinutes, 'minutes');
  const onTrack = remaining <= 2 ? 'On track' : 'Behind schedule';
  const trackColor = remaining <= 2 ? '#8E8E93' : '#FF3B30';

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <BodyTextLarge style={styles.statValue}>{completed}</BodyTextLarge>
        <CaptionText style={styles.statLabel}>Completed</CaptionText>
        <CaptionText style={[styles.statChange, { color: workoutChange.color }]}>
          {workoutChange.text}
        </CaptionText>
      </View>

      <View style={styles.statCard}>
        <BodyTextLarge style={styles.statValue}>{totalMinutes}</BodyTextLarge>
        <CaptionText style={styles.statLabel}>Total Min</CaptionText>
        <CaptionText style={[styles.statChange, { color: minuteChange.color }]}>
          {minuteChange.text}
        </CaptionText>
      </View>

      <View style={styles.statCard}>
        <BodyTextLarge style={styles.statValue}>{remaining}</BodyTextLarge>
        <CaptionText style={styles.statLabel}>Remaining</CaptionText>
        <CaptionText style={[styles.statChange, { color: trackColor }]}>
          {onTrack}
        </CaptionText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing[4],
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: spacing[1],
  },
  
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '400',
    marginBottom: spacing[1] / 2,
  },
  
  statChange: {
    fontSize: 11,
    fontWeight: '500',
  },
});