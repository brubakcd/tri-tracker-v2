import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';
import { getRaceById } from '../data/mockRaces';
import { getTrainingPlanByRaceId } from '../data/mockTrainingPlans';

export default function PlanOverviewPage() {
  // Mock data - in real app would come from route params or state
  const race = getRaceById('race_1');
  const trainingPlan = getTrainingPlanByRaceId('race_1');
  
  if (!race || !trainingPlan) {
    return null;
  }

  const { plan_data } = trainingPlan;
  const phaseColors = [colors.system.blue, colors.system.orange, colors.system.purple];

  return (
    <View style={styles.container}>
      <PageHeader title="Plan Overview" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Race Overview Card */}
        <View style={styles.raceCard}>
          <View style={styles.raceInfo}>
            <Text style={styles.raceName}>{race.name}</Text>
            <Text style={styles.raceLocation}>{race.location}</Text>
          </View>

          <View style={styles.raceDate}>
            <Ionicons name="calendar-outline" size={16} color={colors.neutral.secondary} />
            <Text style={styles.raceDateText}>
              {new Date(race.race_date).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.raceMetrics}>
            <View style={styles.metricItem}>
              <Ionicons name="water" size={18} color={colors.disciplines.swim} />
              <Text style={styles.metricText}>{race.distances.swim}</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="bicycle" size={18} color={colors.disciplines.bike} />
              <Text style={styles.metricText}>{race.distances.bike}</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="walk" size={18} color={colors.disciplines.run} />
              <Text style={styles.metricText}>{race.distances.run}</Text>
            </View>
          </View>

          <View style={styles.goalSection}>
            <Text style={styles.goalTime}>{race.goal_time}</Text>
            <Text style={styles.goalLabel}>Target Finish Time</Text>
          </View>
        </View>

        {/* Training Plan Overview */}
        <View style={styles.planOverviewCard}>
          <View style={styles.overviewMainCard}>
            <Text style={styles.overviewTitle}>Training Plan Overview</Text>
            <Text style={styles.overviewMainText}>
              Your personalized {plan_data.total_weeks}-week program progressively builds from aerobic base development through race-specific intensity training, culminating in a strategic taper for peak performance.
            </Text>
            
            <View style={styles.overviewObjectives}>
              <View style={styles.objectiveRow}>
                <View style={styles.bullet} />
                <Text style={styles.objectiveText}>Progressive volume increases with strategic recovery weeks</Text>
              </View>
              <View style={styles.objectiveRow}>
                <View style={styles.bullet} />
                <Text style={styles.objectiveText}>Discipline-specific technique refinement throughout all phases</Text>
              </View>
              <View style={styles.objectiveRow}>
                <View style={styles.bullet} />
                <Text style={styles.objectiveText}>Race-pace practice and transition work in build phases</Text>
              </View>
            </View>
          </View>

          <View style={styles.overviewInsightSection}>
            <View style={styles.overviewInsightHeader}>
              <View style={styles.overviewInsightTitleRow}>
                <Ionicons name="trophy-outline" size={16} color="rgba(255,255,255,0.75)" />
                <Text style={styles.overviewInsightTitle}>TRAINING PHILOSOPHY</Text>
              </View>
            </View>
            <Text style={styles.overviewInsightText}>
              This plan emphasizes consistent progression over aggressive jumps, prioritizing injury prevention while building the aerobic engine necessary for triathlon success. Each phase builds systematically toward your race goals.
            </Text>
          </View>
        </View>

        {/* Workout Types */}
        <View style={styles.workoutTypesCard}>
          <Text style={styles.cardTitle}>Workout Types</Text>
          <View style={styles.workoutTypesRow}>
            <View style={styles.workoutTypeItem}>
              <View style={[styles.workoutTypeIcon, { backgroundColor: `${colors.disciplines.swim}15` }]}>
                <Ionicons name="water" size={20} color={colors.disciplines.swim} />
              </View>
              <Text style={styles.workoutTypeText}>Swim</Text>
            </View>
            <View style={styles.workoutTypeItem}>
              <View style={[styles.workoutTypeIcon, { backgroundColor: `${colors.disciplines.bike}15` }]}>
                <Ionicons name="bicycle" size={20} color={colors.disciplines.bike} />
              </View>
              <Text style={styles.workoutTypeText}>Bike</Text>
            </View>
            <View style={styles.workoutTypeItem}>
              <View style={[styles.workoutTypeIcon, { backgroundColor: `${colors.disciplines.run}15` }]}>
                <Ionicons name="walk" size={20} color={colors.disciplines.run} />
              </View>
              <Text style={styles.workoutTypeText}>Run</Text>
            </View>
            <View style={styles.workoutTypeItem}>
              <View style={[styles.workoutTypeIcon, { backgroundColor: `${colors.disciplines.brick}15` }]}>
                <Ionicons name="fitness" size={20} color={colors.disciplines.brick} />
              </View>
              <Text style={styles.workoutTypeText}>Brick</Text>
            </View>
            <View style={styles.workoutTypeItem}>
              <View style={[styles.workoutTypeIcon, { backgroundColor: `${colors.status.rest}15` }]}>
                <Ionicons name="bed" size={20} color={colors.status.rest} />
              </View>
              <Text style={styles.workoutTypeText}>Rest</Text>
            </View>
          </View>
        </View>

        {/* Phase Overview */}
        <View style={styles.phasesCard}>
          <Text style={styles.cardTitle}>{plan_data.total_weeks}-Week Training Plan</Text>
          {plan_data.phases.map((phase, index) => {
            const phaseColor = phaseColors[index];
            
            return (
              <View key={index} style={[
                styles.phaseRow,
                { backgroundColor: `${phaseColor}10` }
              ]}>
                <View style={[styles.phaseIndicator, { backgroundColor: phaseColor }]} />
                
                <View style={styles.phaseContent}>
                  <View style={styles.phaseHeaderRow}>
                    <Text style={styles.phaseName}>{phase.name}</Text>
                    <View style={[styles.weeksBadge, { backgroundColor: phaseColor }]}>
                      <Text style={styles.weeksBadgeText}>
                        Weeks {phase.weeks[0]}-{phase.weeks[phase.weeks.length - 1]}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.phaseDescription}>{phase.description}</Text>
                  
                  <View style={styles.phaseStats}>
                    <View style={styles.phaseStatItem}>
                      <Ionicons name="water" size={14} color={colors.disciplines.swim} />
                      <Text style={styles.phaseStatText}>{phase.weekly_structure.swim_sessions}</Text>
                    </View>
                    <View style={styles.phaseStatItem}>
                      <Ionicons name="bicycle" size={14} color={colors.disciplines.bike} />
                      <Text style={styles.phaseStatText}>{phase.weekly_structure.bike_sessions}</Text>
                    </View>
                    <View style={styles.phaseStatItem}>
                      <Ionicons name="walk" size={14} color={colors.disciplines.run} />
                      <Text style={styles.phaseStatText}>{phase.weekly_structure.run_sessions}</Text>
                    </View>
                    <View style={styles.phaseStatItem}>
                      <Ionicons name="bed" size={14} color={colors.status.rest} />
                      <Text style={styles.phaseStatText}>{phase.weekly_structure.rest_days}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
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
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },

  // Race Card
  raceCard: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  raceInfo: {
    marginBottom: spacing[4],
  },

  raceName: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  raceLocation: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
  },

  raceDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[4],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  raceDateText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },

  raceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing[4],
    backgroundColor: colors.system.gray6,
    borderRadius: borderRadius.base,
    marginBottom: spacing[4],
  },

  metricItem: {
    alignItems: 'center',
    gap: spacing[2],
  },

  metricText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  goalSection: {
    alignItems: 'center',
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  goalTime: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  goalLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[3],
  },

  // Training Plan Overview Card
  planOverviewCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.neutral.cards,
    ...shadows.base,
  },

  overviewMainCard: {
    padding: spacing[5],
    backgroundColor: colors.neutral.cards,
  },

  overviewTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[3],
  },

  overviewMainText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal,
    color: colors.neutral.text,
    marginBottom: spacing[4],
    lineHeight: 22,
  },

  overviewObjectives: {
    marginBottom: spacing[1],
  },

  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.status.completed,
    marginTop: 6,
    marginRight: spacing[2] + spacing[1],
  },

  objectiveText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: 20,
    flex: 1,
  },

  overviewInsightSection: {
    backgroundColor: colors.neutral.text,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },

  overviewInsightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  overviewInsightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  overviewInsightTitle: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
    marginLeft: spacing[1] + spacing[1],
    textTransform: 'uppercase',
  },

  overviewInsightText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    lineHeight: 20,
  },


  // Workout Types Card
  workoutTypesCard: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  workoutTypesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing[2],
  },

  workoutTypeItem: {
    alignItems: 'center',
    flex: 1,
    gap: spacing[2],
  },

  workoutTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  workoutTypeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    textAlign: 'center',
  },

  // Phases Card
  phasesCard: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  phaseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing[3],
    borderRadius: borderRadius.base,
    marginBottom: spacing[3],
    paddingHorizontal: spacing[3],
  },

  phaseIndicator: {
    width: 4,
    height: '100%',
    minHeight: 60,
    borderRadius: borderRadius.full,
    marginRight: spacing[3],
    marginTop: spacing[1],
  },

  phaseContent: {
    flex: 1,
  },

  phaseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  phaseName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  weeksBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },

  weeksBadgeText: {
    fontSize: typography.sizes.xs,
    color: colors.white,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  phaseDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.sm,
    marginBottom: spacing[3],
  },

  phaseStats: {
    flexDirection: 'row',
    gap: spacing[3],
  },

  phaseStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    backgroundColor: colors.system.gray6,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },

  phaseStatText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },
});