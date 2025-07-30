import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

interface DashboardHeaderSimpleProps {
  onMorePress?: () => void;
  userName?: string;
  trainingInfo?: {
    currentWeek: number;
    totalWeeks: number;
    phase: string;
    program: string;
    weeklyWorkouts: any[];
    completedCount: number;
    currentStreak?: number;
  };
}

export default function DashboardHeaderSimple({ onMorePress, userName, trainingInfo }: DashboardHeaderSimpleProps) {
  const displayName = userName || 'Cole';
  const getDisciplineGradientColors = (discipline: string): string[] => {
    if (!discipline || typeof discipline !== 'string') {
      return [colors.system.gray, colors.system.gray];
    }
    
    switch (discipline.toLowerCase()) {
      case 'swim': return [colors.disciplines.swim, colors.disciplines.swim];
      case 'bike': return [colors.disciplines.bike, colors.disciplines.bike];
      case 'run': return [colors.disciplines.run, colors.disciplines.run];
      default: return [colors.system.gray, colors.system.gray];
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: 'sunny-outline' as const };
    if (hour < 17) return { text: 'Good afternoon', icon: 'partly-sunny-outline' as const };
    return { text: 'Good evening', icon: 'moon-outline' as const };
  };

  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.welcomeSection}>
          <View style={styles.greetingRow}>
            <View style={styles.welcomeIcon}>
              <Ionicons name={greeting.icon as any} size={20} color={colors.primary} />
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.greetingText}>{`${greeting.text}, ${displayName}.`}</Text>
              <Text style={styles.subtitle}>Let's crush today's training</Text>
            </View>
            {trainingInfo?.currentStreak && trainingInfo.currentStreak > 2 ? (
              <View style={styles.streakBadge}>
                <Ionicons name="flame" size={16} color={colors.system.orange} />
                <Text style={styles.streakText}>{trainingInfo.currentStreak}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.programBadge}>
          <Ionicons name="medal-outline" size={14} color={colors.system.blue} />
          <Text style={styles.programBadgeText}>{trainingInfo?.program || 'Olympic Distance Program'}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Week {trainingInfo?.currentWeek || 8}</Text>
            <Text style={styles.statLabel}>OF {trainingInfo?.totalWeeks || 16}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{trainingInfo?.phase || 'Build Phase'}</Text>
            <Text style={styles.statLabel}>CURRENT PHASE</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Workouts Completed This Week</Text>
            <Text style={styles.progressCount}>{`${trainingInfo?.completedCount || 0}/${trainingInfo?.weeklyWorkouts?.length || 0}`}</Text>
          </View>
          <View style={styles.progressBars}>
            {(trainingInfo?.weeklyWorkouts || []).map((workout: any, index: number) => {
              const isCompleted = index < (trainingInfo?.completedCount || 0);
              const gradientColors = getDisciplineGradientColors(workout?.discipline || 'default');
              return (
                <View
                  key={index}
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: isCompleted 
                        ? gradientColors[0] 
                        : colors.neutral.background
                    }
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.aiInsight}>
        <View style={styles.aiHeader}>
          <View style={styles.aiTitleRow}>
            <Ionicons name="analytics-outline" size={16} color={`${colors.white}BF`} />
            <Text style={styles.aiTitle}>TRAINING INSIGHT</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <Text style={styles.moreText}>More</Text>
            <Ionicons name="chevron-forward" size={12} color={colors.system.teal} />
          </TouchableOpacity>
        </View>
        <Text style={styles.aiText}>
          Your pacing in yesterday's tempo run was excellent. Heart rate stayed in Zone 4 for 87% of the session - perfect for race preparation.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[5],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.neutral.cards,
    ...shadows.lg,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 25,
  },
  
  mainCard: {
    padding: spacing[5],
    backgroundColor: colors.neutral.cards,
  },

  welcomeSection: {
    marginBottom: spacing[5],
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  welcomeIcon: {
    marginRight: spacing[2] + spacing[1],
  },

  welcomeTextContainer: {
    flex: 1,
  },

  greetingText: {
    fontSize: typography.sizes['2xl'] - 2,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: typography.sizes.base - 1,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
    marginTop: spacing[1] / 2,
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.base,
    paddingVertical: spacing[4],
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  statValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1] / 2,
  },
  
  statLabel: {
    fontSize: typography.sizes.xs - 2,
    color: colors.system.gray,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.neutral.border,
  },

  programBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.system.blue}20`,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    marginBottom: spacing[4],
    marginHorizontal: spacing[5],
    borderWidth: 1,
    borderColor: `${colors.system.blue}50`,
  },

  programBadgeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.system.blue,
    marginLeft: spacing[1] + spacing[1]/2,
  },

  progressSection: {
    marginTop: spacing[4],
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },

  progressTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },

  progressCount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  progressBars: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[2],
  },

  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: borderRadius.sm - 1,
  },
  
  aiInsight: {
    backgroundColor: colors.neutral.text,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  aiTitle: {
    fontSize: typography.sizes.xs - 2,
    color: `${colors.white}BF`,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
    marginLeft: spacing[1] + spacing[1]/2,
    textTransform: 'uppercase',
  },
  
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  moreText: {
    fontSize: typography.sizes.xs,
    color: colors.system.teal,
    fontWeight: typography.weights.medium,
    marginRight: spacing[1],
  },
  
  aiText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    lineHeight: 20,
  },
  
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.system.orange}20`,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 12,
    gap: spacing[1],
  },
  
  streakText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.system.orange,
  },
});