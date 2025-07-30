import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Text } from 'react-native';
import WeekStats from '../components/dashboard/WeekStats';
import CoachInsights from '../components/dashboard/CoachInsights';
import { TrendChart, PersonalRecords, ConsistencyStreak } from '../components/insights';
import { BodyText, BodyTextLarge, CaptionText } from '../components/ui/Typography';
import Card from '../components/ui/Card';
import { colors, spacing, typography } from '../styles/tokens';
import { 
  getWeeklyProgress, 
  getCompletedWorkoutsByUserId, 
  getTrainingPlanById, 
  getCurrentRace, 
  getWorkoutsByPlanId,
  getWeeklyVolumeTrends,
  getPersonalRecords,
  getConsistencyData,
  getHeartRateZones,
  getTrainingLoad
} from '../data';
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
  
  // Get enhanced insights data
  const volumeTrends = getWeeklyVolumeTrends('user_1', 4);
  const personalRecords = getPersonalRecords('user_1');
  const consistencyData = getConsistencyData('user_1', 'plan_1');
  const heartRateData = getHeartRateZones('user_1');
  const trainingLoad = getTrainingLoad('user_1');
  
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
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.raceHeader}>
                <Ionicons name="trophy" size={16} color={colors.system.yellow} />
                <Text style={styles.cardTitle}>{race?.name || 'Olympic Triathlon'}</Text>
              </View>
            </View>
            <View style={styles.countdownGrid}>
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
          </View>

          {/* Consistency Streak */}
          <ConsistencyStreak 
            currentStreak={consistencyData.currentStreak}
            longestStreak={consistencyData.longestStreak}
            weeklyCompletion={consistencyData.weeklyCompletion}
          />

          {/* Weekly Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week's Progress</Text>
            <WeekStats 
              completed={weeklyProgress.workoutsCompleted}
              totalMinutes={weeklyProgress.totalMinutes}
              remaining={weeklyProgress.workoutsRemaining}
              lastWeekCompleted={3}
              lastWeekMinutes={180}
            />
          </View>

          {/* Training Trends */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Training Trends</Text>
            <TrendChart 
              title="Weekly Volume"
              data={volumeTrends.data}
              trend={volumeTrends.trend as 'up' | 'down' | 'stable'}
              changeText={volumeTrends.changeText}
            />
            <TrendChart 
              title="Heart Rate Zones"
              data={heartRateData.data}
              trend={heartRateData.trend as 'up' | 'down' | 'stable'}
              changeText={heartRateData.changeText}
            />
            <TrendChart 
              title="Training Load"
              data={trainingLoad.data.slice(-4)}
              trend={trainingLoad.trend as 'up' | 'down' | 'stable'}
              changeText={trainingLoad.changeText}
            />
          </View>

          {/* Personal Records */}
          <View style={styles.section}>
            <BodyTextLarge style={styles.sectionTitle}>Recent Achievements</BodyTextLarge>
            <PersonalRecords records={personalRecords as any} />
          </View>

          {/* Overall Progress */}
          <View style={styles.section}>
            <BodyTextLarge style={styles.sectionTitle}>Overall Progress</BodyTextLarge>
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
            <BodyTextLarge style={styles.sectionTitle}>Training Distribution</BodyTextLarge>
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

          {/* Key Stats Summary */}
          <View style={styles.section}>
            <BodyTextLarge style={styles.sectionTitle}>Key Performance Indicators</BodyTextLarge>
            <View style={styles.kpiGrid}>
              <Card style={styles.kpiCard}>
                <Ionicons name="speedometer-outline" size={20} color={colors.system.blue} />
                <BodyTextLarge style={styles.kpiValue}>
                  {heartRateData.avgHeartRate}
                </BodyTextLarge>
                <CaptionText style={styles.kpiLabel}>Avg HR</CaptionText>
              </Card>
              <Card style={styles.kpiCard}>
                <Ionicons name="trending-up" size={20} color={colors.system.green} />
                <BodyTextLarge style={styles.kpiValue}>
                  {Math.round(completedWorkouts.length / weeksCompleted) || 0}
                </BodyTextLarge>
                <CaptionText style={styles.kpiLabel}>Workouts/Week</CaptionText>
              </Card>
              <Card style={styles.kpiCard}>
                <Ionicons name="time-outline" size={20} color={colors.system.orange} />
                <BodyTextLarge style={styles.kpiValue}>
                  {Math.round(volumeTrends.data[volumeTrends.data.length - 1].value / 60)}h
                </BodyTextLarge>
                <CaptionText style={styles.kpiLabel}>This Week</CaptionText>
              </Card>
            </View>
          </View>

          {/* Coach Insights */}
          <View style={styles.section}>
            <BodyTextLarge style={styles.sectionTitle}>Training Insights</BodyTextLarge>
            <Card style={styles.insightsCard}>
              <CoachInsights 
                message={`Great job! You've completed ${weeklyProgress.workoutsCompleted} workouts this week. ${consistencyData.currentStreak > 3 ? `Your ${consistencyData.currentStreak}-day streak shows excellent commitment!` : 'Keep building that consistency!'}`}
              />
              <View style={styles.insightDivider} />
              <CoachInsights 
                message={`With ${weeksUntilRace} weeks until race day, you're in the ${currentPhase} phase. ${volumeTrends.trend === 'up' ? 'Your training volume is progressing nicely.' : 'Focus on building volume gradually.'}`}
              />
              {personalRecords.length > 0 && (
                <>
                  <View style={styles.insightDivider} />
                  <CoachInsights 
                    message={`Congratulations on setting ${personalRecords.length} new personal ${personalRecords.length === 1 ? 'record' : 'records'} recently! These improvements show your fitness is heading in the right direction.`}
                  />
                </>
              )}
            </Card>
          </View>

          {/* Upcoming Milestones */}
          <View style={styles.section}>
            <BodyTextLarge style={styles.sectionTitle}>Upcoming Milestones</BodyTextLarge>
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
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },

  // Consistent Card Styling (matches WorkoutDetailHeader)
  card: {
    backgroundColor: colors.neutral.cards,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },

  cardHeader: {
    marginBottom: spacing[4],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral.text,
  },

  raceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  countdownGrid: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[6],
    marginBottom: spacing[4],
  },

  countdownItem: {
    alignItems: 'center',
  },

  countdownNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.neutral.text,
    marginBottom: 4,
  },

  countdownLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.neutral.secondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  countdownDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#D1D1D6',
  },

  raceDate: {
    fontSize: 14,
    color: colors.neutral.secondary,
    textAlign: 'center',
  },

  section: {
    marginBottom: spacing[6],
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral.text,
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },

  progressCard: {
    marginHorizontal: spacing[4],
    padding: spacing[4],
  },

  progressHeader: {
    marginBottom: spacing[3],
  },

  progressPercentage: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
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
    marginHorizontal: spacing[4],
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
    marginHorizontal: spacing[4],
    padding: spacing[4],
  },

  insightDivider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginVertical: spacing[4],
  },

  milestonesCard: {
    marginHorizontal: spacing[4],
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

  kpiGrid: {
    flexDirection: 'row',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
  },

  kpiCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing[3],
    minHeight: 100,
    justifyContent: 'center',
  },

  kpiValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginVertical: spacing[1],
  },

  kpiLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
    textAlign: 'center',
  },
});