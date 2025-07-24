import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, BodyTextLarge, CaptionText } from '../ui/Typography';
import { colors, spacing } from '../../styles/tokens';

interface ConsistencyStreakProps {
  currentStreak: number;
  longestStreak: number;
  weeklyCompletion: number[];
}

export default function ConsistencyStreak({ currentStreak, longestStreak, weeklyCompletion }: ConsistencyStreakProps) {
  const getDayStatus = (completed: boolean) => {
    return completed ? colors.status.completed : colors.neutral.separator;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.streakStats}>
        <View style={styles.statItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="flame" size={24} color={colors.system.orange} />
          </View>
          <BodyTextLarge style={styles.statNumber}>{currentStreak}</BodyTextLarge>
          <CaptionText style={styles.statLabel}>Day Streak</CaptionText>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="trophy-outline" size={24} color={colors.system.gray2} />
          </View>
          <BodyTextLarge style={styles.statNumber}>{longestStreak}</BodyTextLarge>
          <CaptionText style={styles.statLabel}>Best Streak</CaptionText>
        </View>
      </View>
      
      <View style={styles.weekGrid}>
        <CaptionText style={styles.weekLabel}>THIS WEEK</CaptionText>
        <View style={styles.days}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <CaptionText style={styles.dayLabel}>{day}</CaptionText>
              <View 
                style={[
                  styles.dayDot, 
                  { backgroundColor: getDayStatus(weeklyCompletion[index] === 1) }
                ]} 
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: 12,
    padding: spacing[4],
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  
  streakStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  iconWrapper: {
    marginBottom: spacing[2],
  },
  
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },
  
  statLabel: {
    color: colors.neutral.secondary,
    fontSize: 12,
  },
  
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral.separator,
  },
  
  weekGrid: {
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },
  
  weekLabel: {
    color: colors.neutral.secondary,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: spacing[2],
  },
  
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  
  dayLabel: {
    fontSize: 11,
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },
  
  dayDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutral.separator,
  },
});