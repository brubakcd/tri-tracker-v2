import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CoachInsights from '../components/dashboard/CoachInsights';
import { spacing, colors, typography, borderRadius, shadows } from '../styles/tokens';

interface CoachPageProps {
  navigation: any;
}

export default function CoachPage({ navigation }: CoachPageProps) {
  // Mock data for AI insights
  const insights = [
    {
      id: '1',
      message: "Your running pace has improved 8% this month! Consider increasing your tempo run intensity for even better results.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2', 
      message: "Recovery metrics show optimal adaptation. Your heart rate variability has increased 12% - great sign of improved fitness.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '3',
      message: "Swimming technique analysis suggests focusing on catch phase. Your stroke rate is consistent but could be more efficient.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    }
  ];

  // Mock performance trends
  const trends = {
    swim: { change: '4s faster', direction: 'positive' },
    bike: { change: '2.3 mph faster', direction: 'positive' },
    run: { change: '15s/mile faster', direction: 'positive' }
  };

  // Mock goals progress
  const goals = [
    { discipline: 'swim', name: 'Swim 1500m', progress: 75, target: '28:00' },
    { discipline: 'bike', name: 'Bike 40km', progress: 85, target: '1:05:00' },
    { discipline: 'run', name: 'Run 10km', progress: 90, target: '42:00' }
  ];

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case 'swim': return colors.disciplines.swim;
      case 'bike': return colors.disciplines.bike;
      case 'run': return colors.disciplines.run;
      default: return colors.system.gray;
    }
  };

  const formatRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Coach</Text>
        </View>

        {/* Recent Insights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Insights</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Insights')}>
              <Text style={styles.sectionAction}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.insightsContainer}>
            {insights.map((insight) => (
              <View key={insight.id} style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <Text style={styles.insightTime}>{formatRelativeTime(insight.timestamp)}</Text>
                </View>
                <CoachInsights message={insight.message} />
              </View>
            ))}
          </View>
        </View>

        {/* Performance Trends Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Trends</Text>
            <TouchableOpacity onPress={() => console.log('View trends')}>
              <Text style={styles.sectionAction}>Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.trendsCard}>
            <Text style={styles.cardTitle}>Last 4 Weeks</Text>
            <Text style={styles.cardSubtitle}>Key performance indicators</Text>
            
            {Object.entries(trends).map(([discipline, trend]) => (
              <View key={discipline} style={styles.trendItem}>
                <View style={styles.trendLeft}>
                  <View style={[styles.disciplineDot, { backgroundColor: getDisciplineColor(discipline) }]} />
                  <Text style={styles.trendText}>{discipline.charAt(0).toUpperCase() + discipline.slice(1)} Pace</Text>
                </View>
                <View style={styles.trendRight}>
                  <Ionicons 
                    name="arrow-up" 
                    size={12} 
                    color={colors.status.completed} 
                    style={styles.trendArrow} 
                  />
                  <Text style={styles.trendValue}>{trend.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goal Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Goal Progress</Text>
            <TouchableOpacity onPress={() => console.log('Edit goals')}>
              <Text style={styles.sectionAction}>Edit goals</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.goalsCard}>
            <Text style={styles.cardTitle}>Olympic Distance Targets</Text>
            <Text style={styles.cardSubtitle}>Race preparation milestones</Text>
            
            {goals.map((goal, index) => (
              <View key={index} style={styles.goalItem}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalTarget}>{goal.target}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${goal.progress}%`,
                        backgroundColor: getDisciplineColor(goal.discipline)
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Focus</Text>
          
          <View style={styles.recommendationsCard}>
            <View style={styles.recommendationItem}>
              <View style={[styles.categoryDot, { backgroundColor: colors.primary }]} />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Increase Training Volume</Text>
                <Text style={styles.recommendationDescription}>
                  Add 15 minutes to your long run this weekend. Your base fitness can handle the increase.
                </Text>
              </View>
            </View>
            
            <View style={styles.recommendationItem}>
              <View style={[styles.categoryDot, { backgroundColor: colors.system.orange }]} />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Focus on Technique</Text>
                <Text style={styles.recommendationDescription}>
                  Practice bilateral breathing during easy swim sessions to improve stroke efficiency.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: spacing[8],
  },

  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[5],
  },

  headerTitle: {
    fontSize: typography.sizes['3xl'] - 2,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    letterSpacing: -0.3,
  },

  section: {
    marginBottom: spacing[6],
    paddingHorizontal: spacing[4],
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },

  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  sectionAction: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },

  insightsContainer: {
    gap: spacing[4],
  },

  insightCard: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.base,
  },

  insightHeader: {
    marginBottom: spacing[3],
  },

  insightTime: {
    fontSize: typography.sizes.xs,
    color: colors.system.gray,
    textAlign: 'right',
  },

  trendsCard: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  cardSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    marginBottom: spacing[4],
  },

  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.base,
    marginBottom: spacing[2],
  },

  trendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  disciplineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  trendText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },

  trendRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },

  trendArrow: {
    marginRight: spacing[1] / 2,
  },

  trendValue: {
    fontSize: typography.sizes.sm - 1,
    fontWeight: typography.weights.medium,
    color: colors.status.completed,
  },

  goalsCard: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  goalItem: {
    marginBottom: spacing[4],
  },

  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  goalName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },

  goalTarget: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
  },

  progressBar: {
    height: 6,
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.sm - 1,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm - 1,
  },

  recommendationsCard: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.base + 2,
    marginBottom: spacing[3],
  },

  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: spacing[1] + spacing[1]/2,
  },

  recommendationContent: {
    flex: 1,
  },

  recommendationTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  recommendationDescription: {
    fontSize: typography.sizes.sm - 1,
    color: colors.text.secondary,
    lineHeight: 18,
  },
});