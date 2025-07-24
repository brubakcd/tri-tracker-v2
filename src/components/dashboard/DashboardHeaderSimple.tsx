import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  };
}

export default function DashboardHeaderSimple({ onMorePress, userName = 'Cole', trainingInfo }: DashboardHeaderSimpleProps) {
  const getDisciplineGradientColors = (discipline: string): string[] => {
    switch (discipline) {
      case 'swim': return ['#0EA5E9', '#0284C7'];
      case 'bike': return ['#FB923C', '#F97316'];
      case 'run': return ['#4ADE80', '#22C55E'];
      default: return ['#9CA3AF', '#6B7280'];
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: 'sunny-outline' };
    if (hour < 17) return { text: 'Good afternoon', icon: 'partly-sunny-outline' };
    return { text: 'Good evening', icon: 'moon-outline' };
  };

  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.welcomeSection}>
          <View style={styles.greetingRow}>
            <Ionicons name={greeting.icon as any} size={20} color="#007AFF" style={styles.welcomeIcon} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.greetingText}>{greeting.text}, {userName}.</Text>
              <Text style={styles.subtitle}>Let's crush today's training</Text>
            </View>
          </View>
        </View>

        <View style={styles.programBadge}>
          <Ionicons name="medal-outline" size={14} color="#3B82F6" />
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
            <Text style={styles.progressCount}>{trainingInfo?.completedCount || 0}/{trainingInfo?.weeklyWorkouts?.length || 0}</Text>
          </View>
          <View style={styles.progressBars}>
            {(trainingInfo?.weeklyWorkouts || []).map((workout: any, index: number) => {
              const isCompleted = index < (trainingInfo?.completedCount || 0);
              const gradientColors = getDisciplineGradientColors(workout.discipline);
              return (
                <View
                  key={index}
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: isCompleted 
                        ? gradientColors[0] 
                        : '#E5E7EB'
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
            <Ionicons name="analytics-outline" size={16} color="rgba(255,255,255,0.75)" />
            <Text style={styles.aiTitle}>TRAINING INSIGHT</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <Text style={styles.moreText}>More</Text>
            <Ionicons name="chevron-forward" size={12} color="#60A5FA" />
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
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  
  mainCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  welcomeSection: {
    marginBottom: 20,
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  welcomeIcon: {
    marginRight: 10,
  },

  welcomeTextContainer: {
    flex: 1,
  },

  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  
  statLabel: {
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D1D1D6',
  },

  programBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },

  programBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
    marginLeft: 6,
  },

  progressSection: {
    marginTop: 16,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },

  progressCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },

  progressBars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  
  aiInsight: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  aiTitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  moreText: {
    fontSize: 12,
    color: '#5AC8FA',
    fontWeight: '500',
    marginRight: 4,
  },
  
  aiText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
});