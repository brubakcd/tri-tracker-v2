import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';
import PhaseBadge from '../ui/PhaseBadge';

interface PlanHeaderProps {
  raceName: string;
  raceDate: Date;
  raceType: string; // e.g., "Olympic Distance"
  currentWeek: number;
  totalWeeks: number;
  currentPhase: string;
  phaseColor?: string;
}

export default function PlanHeader({
  raceName,
  raceDate,
  raceType,
  currentWeek,
  totalWeeks,
  currentPhase,
  phaseColor = colors.primary,
}: PlanHeaderProps) {
  // Calculate progress percentage
  const progressPercentage = (currentWeek / totalWeeks) * 100;
  
  // Calculate days to race
  const today = new Date();
  const daysToRace = Math.ceil((raceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format race date
  const formatRaceDate = () => {
    return raceDate.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Main Info Section */}
      <View style={styles.mainSection}>
        <Text style={styles.raceName}>{raceName}</Text>
        <Text style={styles.raceDate}>{formatRaceDate()}</Text>
        
        {/* Training Type Badge */}
        <View style={styles.trainingBadge}>
          <Ionicons name="medal-outline" size={16} color={colors.system.blue} />
          <Text style={styles.trainingBadgeText}>{raceType}</Text>
        </View>

        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Training Progress</Text>
          <Text style={styles.weekText}>Week {currentWeek} of {totalWeeks}</Text>
        </View>
        
        {/* Week Pills */}
        <View style={styles.weekPillsContainer}>
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum) => {
            const isCompleted = weekNum < currentWeek;
            const isCurrent = weekNum === currentWeek;
            const isUpcoming = weekNum > currentWeek;
            
            return (
              <View
                key={weekNum}
                style={[
                  styles.weekPill,
                  isCompleted && styles.weekPillCompleted,
                  isCurrent && styles.weekPillCurrent,
                  isUpcoming && styles.weekPillUpcoming,
                ]}
              />
            );
          })}
        </View>

        {/* Phase and Days Info */}
        <View style={styles.infoRow}>
          <PhaseBadge phase={currentPhase} />
          <View style={styles.daysContainer}>
            <Text style={styles.daysNumber}>{daysToRace}</Text>
            <Text style={styles.daysLabel}>days to race</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.base,
  },

  mainSection: {
    padding: spacing[5],
  },

  raceName: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
    textAlign: 'left',
  },

  raceDate: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal,
    color: colors.neutral.secondary,
    marginBottom: spacing[4],
    textAlign: 'left',
  },

  trainingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.system.blue}20`,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    marginBottom: spacing[5],
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: `${colors.system.blue}50`,
  },

  trainingBadgeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.system.blue,
    marginLeft: spacing[1],
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },

  progressTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  weekText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
  },

  weekPillsContainer: {
    flexDirection: 'row',
    marginBottom: spacing[4],
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weekPill: {
    flex: 1,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing[1] / 2,
  },

  weekPillCompleted: {
    backgroundColor: colors.status.completed,
  },

  weekPillCurrent: {
    backgroundColor: colors.primary,
    height: 8,
  },

  weekPillUpcoming: {
    backgroundColor: colors.neutral.border,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  daysContainer: {
    alignItems: 'center',
  },

  daysNumber: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    lineHeight: typography.sizes.xxl,
  },

  daysLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
    marginTop: -spacing[1],
  },
});