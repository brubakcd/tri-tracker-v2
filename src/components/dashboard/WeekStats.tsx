import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    if (diff === 0) return { text: 'Same as last week', color: colors.neutral.secondary };
    
    const prefix = diff > 0 ? '+' : '';
    const unit = type === 'workouts' ? '' : ' min';
    const text = `${prefix}${diff}${unit} vs last week`;
    const color = diff > 0 ? colors.system.green : colors.system.red;
    
    return { text, color };
  };

  const workoutChange = getChangeText(completed, lastWeekCompleted, 'workouts');
  const minuteChange = getChangeText(totalMinutes, lastWeekMinutes, 'minutes');
  const onTrack = remaining <= 2;
  const trackText = onTrack ? 'On track' : 'Behind schedule';
  const trackColor = onTrack ? colors.system.green : colors.system.red;

  // Determine performance level for styling
  const performanceLevel = completed >= lastWeekCompleted ? 'good' : 'needs-attention';
  const progressPercentage = Math.min(100, (completed / (completed + remaining)) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <BodyTextLarge style={styles.statValue}>{completed}</BodyTextLarge>
          {workoutChange.color === colors.system.green && (
            <View style={styles.trendIndicator}>
              <Ionicons name="trending-up" size={16} color={colors.system.green} />
            </View>
          )}
        </View>
        <CaptionText style={styles.statLabel}>Completed Workouts</CaptionText>
        <CaptionText style={[styles.statChange, { color: workoutChange.color }]}>
          {workoutChange.text}
        </CaptionText>
      </View>

      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <BodyTextLarge style={styles.statValue}>{totalMinutes}</BodyTextLarge>
          {minuteChange.color === colors.system.green && (
            <View style={styles.trendIndicator}>
              <Ionicons name="trending-up" size={16} color={colors.system.green} />
            </View>
          )}
        </View>
        <CaptionText style={styles.statLabel}>Total Minutes</CaptionText>
        <CaptionText style={[styles.statChange, { color: minuteChange.color }]}>
          {minuteChange.text}
        </CaptionText>
      </View>

      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <BodyTextLarge style={styles.statValue}>{remaining}</BodyTextLarge>
          <View style={[styles.statusIndicator, { backgroundColor: trackColor }]}>
            <Ionicons 
              name={onTrack ? "checkmark" : "time"} 
              size={12} 
              color={colors.neutral.cards} 
            />
          </View>
        </View>
        <CaptionText style={styles.statLabel}>Remaining Workouts</CaptionText>
        <CaptionText style={[styles.statChange, { color: trackColor }]}>
          {trackText}
        </CaptionText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    gap: spacing[3],
  },
  
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.cards,
    borderRadius: 16,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.neutral.separator,
  },
  
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  
  trendIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.system.green + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral.text,
    lineHeight: 28,
  },
  
  statLabel: {
    fontSize: 13,
    color: colors.neutral.secondary,
    fontWeight: '500',
    marginBottom: spacing[1],
    textAlign: 'left',
  },
  
  statChange: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'left',
  },
});