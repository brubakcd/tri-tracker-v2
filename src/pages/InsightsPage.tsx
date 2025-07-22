import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Heading1, Heading3, BodyText, BodyTextLarge, CaptionText } from '../components/ui/Typography';
import Card from '../components/ui/Card';
import WeekStats from '../components/dashboard/WeekStats';
import CoachInsights from '../components/dashboard/CoachInsights';
import { colors, spacing, typography, borderRadius } from '../styles/tokens';
import { getWeeklyProgress, getCompletedWorkoutsByUserId, getTrainingPlanById, getCurrentRace, getWorkoutsByPlanId } from '../data';
import { Ionicons } from '@expo/vector-icons';

type InsightsStackParamList = {
  InsightsHome: undefined;
  Profile: undefined;
};

type InsightsNavigationProp = StackNavigationProp<InsightsStackParamList, 'InsightsHome'>;
type InsightsRouteProp = RouteProp<InsightsStackParamList, 'InsightsHome'>;

interface InsightsProps {
  navigation: InsightsNavigationProp;
  route: InsightsRouteProp;
}

export default function InsightsPage({ navigation }: InsightsProps) {
  const plan = getTrainingPlanById('plan_1');
  const race = getCurrentRace('user_1');
  const weeklyProgress = getWeeklyProgress('plan_1');
  const completedWorkouts = getCompletedWorkoutsByUserId('user_1');
  const allWorkouts = getWorkoutsByPlanId('plan_1');
  
  // Calculate race countdown
  const raceDate = race ? new Date(race.race_date) : new Date();
  const today = new Date();
  const daysUntilRace = Math.ceil((raceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const weeksUntilRace = Math.ceil(daysUntilRace / 7);
  
  // Calculate overall progress
  const totalWorkouts = allWorkouts.filter((w: any) => w.discipline !== 'rest').length;
  const totalCompleted = completedWorkouts.length;
  const overallProgress = totalWorkouts > 0 ? Math.round((totalCompleted / totalWorkouts) * 100) : 0;
  
  // Calculate weekly averages
  const currentWeek = plan?.plan_data?.current_week || 1;
  const weeksCompleted = currentWeek - 1;
  const avgWorkoutsPerWeek = weeksCompleted > 0 ? Math.round(totalCompleted / weeksCompleted) : 0;
  
  // Get discipline breakdown
  const disciplineBreakdown = completedWorkouts.reduce((acc: Record<string, number>, workout: any) => {
    const workoutInfo = allWorkouts.find((w: any) => w.id === workout.workout_id);
    if (workoutInfo) {
      acc[workoutInfo.discipline] = (acc[workoutInfo.discipline] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get current phase
  const currentPhase = plan?.plan_data?.phases?.find((p: any) => 
    p.weeks.includes(currentWeek)
  )?.name || 'Base Building';
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Race Countdown */}
          <Card style={styles.countdownCard} variant="elevated">
            <View style={styles.countdownHeader}>
              <Ionicons name="trophy" size={24} color={colors.system.yellow} />
              <Text style={styles.raceName}>{race?.name || 'Olympic Triathlon'}</Text>
            </View>
            <View style={styles.countdownContent}>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{daysUntilRace}</Text>
                <Text style={styles.countdownLabel}>DAYS</Text>
              </View>
              <View style={styles.countdownDivider} />
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{weeksUntilRace}</Text>
                <Text style={styles.countdownLabel}>WEEKS</Text>
              </View>
            </View>
            <Text style={styles.raceDate}>
              {raceDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Card>

          {/* Weekly Stats */}
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>This Week's Progress</Heading3>
            <WeekStats 
              completed={weeklyProgress.workoutsCompleted}
              totalMinutes={weeklyProgress.totalMinutes}
              remaining={weeklyProgress.workoutsRemaining}
              lastWeekCompleted={3}
              lastWeekMinutes={180}
            />
          </View>

          {/* Overall Progress */}
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Overall Progress</Heading3>
            <Card style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <BodyTextLarge style={styles.progressPercentage}>{overallProgress}%</BodyTextLarge>
                <CaptionText style={styles.progressLabel}>
                  {totalCompleted} of {totalWorkouts} workouts completed
                </CaptionText>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${overallProgress}%` }]} />
              </View>
              <View style={styles.progressStats}>
                <View style={styles.progressStat}>
                  <BodyText style={styles.statNumber}>{currentWeek}</BodyText>
                  <CaptionText style={styles.statText}>Current Week</CaptionText>
                </View>
                <View style={styles.progressStat}>
                  <BodyText style={styles.statNumber}>{currentPhase}</BodyText>
                  <CaptionText style={styles.statText}>Training Phase</CaptionText>
                </View>
                <View style={styles.progressStat}>
                  <BodyText style={styles.statNumber}>{avgWorkoutsPerWeek}</BodyText>
                  <CaptionText style={styles.statText}>Avg/Week</CaptionText>
                </View>
              </View>
            </Card>
          </View>

          {/* Discipline Breakdown */}
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Training Distribution</Heading3>
            <Card style={styles.disciplineCard}>
              <View style={styles.disciplines}>
                <View style={styles.disciplineItem}>
                  <View style={[styles.disciplineIcon, { backgroundColor: colors.disciplines.swim + '20' }]}>
                    <Ionicons name="water" size={20} color={colors.disciplines.swim} />
                  </View>
                  <BodyTextLarge style={styles.disciplineCount}>
                    {disciplineBreakdown.swim || 0}
                  </BodyTextLarge>
                  <CaptionText style={styles.disciplineLabel}>Swim</CaptionText>
                </View>
                <View style={styles.disciplineItem}>
                  <View style={[styles.disciplineIcon, { backgroundColor: colors.disciplines.bike + '20' }]}>
                    <Ionicons name="bicycle" size={20} color={colors.disciplines.bike} />
                  </View>
                  <BodyTextLarge style={styles.disciplineCount}>
                    {disciplineBreakdown.bike || 0}
                  </BodyTextLarge>
                  <CaptionText style={styles.disciplineLabel}>Bike</CaptionText>
                </View>
                <View style={styles.disciplineItem}>
                  <View style={[styles.disciplineIcon, { backgroundColor: colors.disciplines.run + '20' }]}>
                    <Ionicons name="walk" size={20} color={colors.disciplines.run} />
                  </View>
                  <BodyTextLarge style={styles.disciplineCount}>
                    {disciplineBreakdown.run || 0}
                  </BodyTextLarge>
                  <CaptionText style={styles.disciplineLabel}>Run</CaptionText>
                </View>
                <View style={styles.disciplineItem}>
                  <View style={[styles.disciplineIcon, { backgroundColor: colors.disciplines.run + '20' }]}>
                    <Ionicons name="layers" size={20} color={colors.disciplines.run} />
                  </View>
                  <BodyTextLarge style={styles.disciplineCount}>
                    {disciplineBreakdown.brick || 0}
                  </BodyTextLarge>
                  <CaptionText style={styles.disciplineLabel}>Brick</CaptionText>
                </View>
              </View>
            </Card>
          </View>

          {/* Coach Insights */}
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Training Insights</Heading3>
            <Card style={styles.insightsCard}>
              <CoachInsights 
                message="Your consistency this week has been excellent! Keep maintaining this momentum as you build toward race day."
              />
              <View style={styles.insightDivider} />
              <CoachInsights 
                message={`With ${weeksUntilRace} weeks until race day, you're in the ${currentPhase} phase. Focus on building endurance while maintaining good form.`}
              />
            </Card>
          </View>

          {/* Upcoming Milestones */}
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Upcoming Milestones</Heading3>
            <Card style={styles.milestonesCard}>
              <View style={styles.milestone}>
                <View style={styles.milestoneDot} />
                <View style={styles.milestoneContent}>
                  <BodyText style={styles.milestoneTitle}>Peak Week</BodyText>
                  <CaptionText style={styles.milestoneDate}>Week {plan?.plan_data?.total_weeks ? plan.plan_data.total_weeks - 3 : 9}</CaptionText>
                </View>
              </View>
              <View style={styles.milestone}>
                <View style={styles.milestoneDot} />
                <View style={styles.milestoneContent}>
                  <BodyText style={styles.milestoneTitle}>Taper Begins</BodyText>
                  <CaptionText style={styles.milestoneDate}>Week {plan?.plan_data?.total_weeks ? plan.plan_data.total_weeks - 2 : 10}</CaptionText>
                </View>
              </View>
              <View style={styles.milestone}>
                <View style={[styles.milestoneDot, { backgroundColor: colors.system.yellow }]} />
                <View style={styles.milestoneContent}>
                  <BodyText style={styles.milestoneTitle}>Race Week</BodyText>
                  <CaptionText style={styles.milestoneDate}>Week {plan?.plan_data?.total_weeks || 12}</CaptionText>
                </View>
              </View>
            </Card>
          </View>
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
  
  content: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },

  countdownCard: {
    backgroundColor: colors.neutral.text,
    marginBottom: spacing[6],
    padding: spacing[6],
  },

  countdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    marginBottom: spacing[4],
  },

  raceName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.cards,
  },

  countdownContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[6],
    marginBottom: spacing[4],
  },

  countdownItem: {
    alignItems: 'center',
  },

  countdownNumber: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
    color: colors.neutral.cards,
    lineHeight: 48,
  },

  countdownLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
    letterSpacing: 1,
    marginTop: spacing[1],
  },

  countdownDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral.secondary,
    opacity: 0.3,
  },

  raceDate: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    textAlign: 'center',
  },

  section: {
    marginBottom: spacing[6],
  },

  sectionTitle: {
    marginBottom: spacing[4],
    color: colors.neutral.text,
  },

  progressCard: {
    padding: spacing[4],
  },

  progressHeader: {
    marginBottom: spacing[3],
  },

  progressPercentage: {
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  progressLabel: {
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: colors.neutral.separator,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing[4],
  },

  progressBar: {
    height: '100%',
    backgroundColor: colors.system.green,
    borderRadius: 4,
  },

  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressStat: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  statText: {
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },

  disciplineCard: {
    padding: spacing[4],
  },

  disciplines: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  disciplineItem: {
    alignItems: 'center',
  },

  disciplineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },

  disciplineCount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  disciplineLabel: {
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },

  insightsCard: {
    padding: spacing[4],
  },

  insightDivider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginVertical: spacing[4],
  },

  milestonesCard: {
    padding: spacing[4],
  },

  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[3],
  },

  milestoneDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.system.blue,
  },

  milestoneContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  milestoneTitle: {
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },

  milestoneDate: {
    color: colors.neutral.secondary,
  },
});