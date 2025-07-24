import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../styles/tokens';
import { getTodaysWorkout, getWeeklyPlan } from '../data';

// Welcome Message Component
const WelcomeMessage = ({ userName }: { userName: string }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good morning", icon: "sunny" };
    if (hour < 17) return { text: "Good afternoon", icon: "cafe" };
    return { text: "Good evening", icon: "moon" };
  };

  const greeting = getGreeting();

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeIconContainer}>
        <Ionicons name={greeting.icon as any} size={20} color={colors.neutral.secondary} />
      </View>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTitle}>{greeting.text}, {userName}!</Text>
        <Text style={styles.welcomeSubtitle}>Ready to crush today's training?</Text>
      </View>
    </View>
  );
};

// Training Program Info Component
const TrainingProgramInfo = () => (
  <View style={styles.programContainer}>
    <View style={styles.programHeader}>
      <Ionicons name="trophy" size={16} color={colors.disciplines.bike} />
      <Text style={styles.programTitle}>Training Program</Text>
    </View>
    
    <View style={styles.programGrid}>
      <View style={styles.programCard}>
        <Text style={styles.programCardTitle}>Week 8</Text>
        <Text style={styles.programCardSubtitle}>of 16</Text>
      </View>
      <LinearGradient
        colors={['#FFF7ED', '#FFEDD5']}
        style={styles.programPhaseCard}
      >
        <Text style={styles.programPhaseText}>Build Phase</Text>
      </LinearGradient>
    </View>
    
    <LinearGradient
      colors={['#EFF6FF', '#DBEAFE']}
      style={styles.programTypeCard}
    >
      <Ionicons name="medal" size={16} color="#3B82F6" />
      <Text style={styles.programTypeText}>Olympic Distance Program</Text>
    </LinearGradient>
  </View>
);

// Weekly Progress Component
const WeeklyProgress = () => {
  const weeklyPlan = getWeeklyPlan('plan_1');
  const completedCount = weeklyPlan.filter((w: any) => w.status === 'completed').length;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>This Week</Text>
        <Text style={styles.progressCount}>{completedCount}/{weeklyPlan.length}</Text>
      </View>
      <View style={styles.progressBars}>
        {weeklyPlan.map((workout: any, index: number) => (
          <LinearGradient
            key={index}
            colors={workout.status === 'completed' 
              ? getDisciplineGradientColors(workout.discipline) as readonly [string, string, ...string[]]
              : ['#E5E7EB', '#E5E7EB'] as readonly [string, string, ...string[]]
            }
            style={styles.progressBar}
          />
        ))}
      </View>
    </View>
  );
};

// AI Insight Component
const AIInsight = () => (
  <LinearGradient
    colors={['#000000', '#111827']}
    style={styles.aiContainer}
  >
    <View style={styles.aiIconContainer}>
      <Ionicons name="flash" size={16} color="#FFFFFF" />
    </View>
    <View style={styles.aiTextContainer}>
      <Text style={styles.aiTitle}>AI Insight</Text>
      <Text style={styles.aiText}>
        Your running pace has improved 8% this month! Consider increasing your tempo run intensity.
      </Text>
    </View>
  </LinearGradient>
);

// Today's Workout Component
const TodaysWorkout = ({ onPress }: { onPress: () => void }) => {
  const todayWorkout = getTodaysWorkout('plan_1');
  
  if (!todayWorkout) {
    return (
      <View style={styles.todayContainer}>
        <View style={styles.todayHeader}>
          <Text style={styles.todayTitle}>Today</Text>
          <Text style={styles.todayDate}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
        </View>
        <View style={styles.restDayContainer}>
          <View style={styles.restDayIcon}>
            <Ionicons name="moon" size={24} color="#9CA3AF" />
          </View>
          <Text style={styles.restDayText}>Rest day - enjoy your recovery!</Text>
        </View>
      </View>
    );
  }

  const disciplineGradient = getDisciplineGradientColors(todayWorkout.discipline);
  
  return (
    <View style={styles.todayContainer}>
      <View style={styles.todayHeader}>
        <Text style={styles.todayTitle}>Today</Text>
        <Text style={styles.todayDate}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
      </View>
      
      <LinearGradient
        colors={[...disciplineGradient].map((color, i) => i === 0 ? color + '20' : color + '40') as readonly [string, string, ...string[]]}
        style={styles.workoutCard}
      >
        <View style={styles.workoutHeader}>
          <LinearGradient
            colors={disciplineGradient as readonly [string, string, ...string[]]}
            style={styles.workoutIcon}
          >
            <Ionicons 
              name={getDisciplineIcon(todayWorkout.discipline)} 
              size={20} 
              color="#FFFFFF" 
            />
          </LinearGradient>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>{todayWorkout.workout_data.title}</Text>
            <Text style={styles.workoutSubtitle}>
              {todayWorkout.workout_data.distance || todayWorkout.discipline} • {todayWorkout.workout_data.duration}
            </Text>
          </View>
        </View>
        
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutDescription}>
            {todayWorkout.workout_data.description}
          </Text>
        </View>
        
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.startButton}
          >
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Workout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

// Quick Stats Component
const QuickStats = () => (
  <View style={styles.statsGrid}>
    <View style={styles.statCard}>
      <Text style={styles.statValue}>4</Text>
      <Text style={styles.statLabel}>Day streak</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statValue}>12.5</Text>
      <Text style={styles.statLabel}>Hours this week</Text>
    </View>
  </View>
);

// Week Overview Component  
const WeekOverview = () => {
  const weeklyPlan = getWeeklyPlan('plan_1');
  const today = new Date();
  
  return (
    <View style={styles.weekContainer}>
      <Text style={styles.weekTitle}>Week Overview</Text>
      
      <View style={styles.weekGrid}>
        {weeklyPlan.map((workout: any, index: number) => {
          const workoutDate = new Date(workout.scheduled_date);
          const isToday = workoutDate.toDateString() === today.toDateString();
          const isCompleted = workout.status === 'completed';
          
          return (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayName}>
                {workoutDate.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)}
              </Text>
              <View style={[
                styles.dayIcon,
                isToday && styles.dayIconToday,
                isCompleted && { backgroundColor: getDisciplineColor(workout.discipline) + '20' }
              ]}>
                <Ionicons 
                  name={getDisciplineIcon(workout.discipline)} 
                  size={16} 
                  color={isToday ? '#FFFFFF' : isCompleted ? getDisciplineColor(workout.discipline) : '#9CA3AF'} 
                />
              </View>
              <Text style={styles.dayDate}>{workoutDate.getDate()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Weekly Schedule Component
const WeeklySchedule = ({ onWorkoutPress }: { onWorkoutPress: (workoutId: string) => void }) => {
  const weeklyPlan = getWeeklyPlan('plan_1');
  const today = new Date();
  
  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.scheduleHeader}>
        <Text style={styles.scheduleTitle}>This Week</Text>
      </View>
      
      {weeklyPlan.map((workout: any, index: number) => {
        const workoutDate = new Date(workout.scheduled_date);
        const isToday = workoutDate.toDateString() === today.toDateString();
        const isCompleted = workout.status === 'completed';
        
        return (
          <TouchableOpacity 
            key={index}
            style={[styles.scheduleItem, isToday && styles.scheduleItemToday]}
            onPress={() => onWorkoutPress(workout.id)}
            activeOpacity={0.7}
          >
            <View style={styles.scheduleContent}>
              <View style={[
                styles.scheduleIcon,
                isCompleted && styles.scheduleIconCompleted,
                isToday && styles.scheduleIconToday
              ]}>
                <Ionicons 
                  name={getDisciplineIcon(workout.discipline)} 
                  size={16} 
                  color={isCompleted ? '#10B981' : isToday ? '#3B82F6' : '#9CA3AF'} 
                />
              </View>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleWorkoutTitle}>{workout.workout_data.title}</Text>
                <Text style={styles.scheduleWorkoutSubtitle}>
                  {workoutDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {workout.workout_data.duration}
                  {workout.workout_data.distance && ` • ${workout.workout_data.distance}`}
                </Text>
              </View>
            </View>
            <View style={styles.scheduleActions}>
              {isToday && (
                <View style={styles.todayBadge}>
                  <Text style={styles.todayBadgeText}>Today</Text>
                </View>
              )}
              {isCompleted ? (
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              ) : (
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Helper functions
const getDisciplineIcon = (discipline: string): keyof typeof Ionicons.glyphMap => {
  switch (discipline) {
    case 'swim': return 'water';
    case 'bike': return 'bicycle';
    case 'run': return 'walk';
    case 'rest': return 'moon';
    default: return 'fitness';
  }
};

const getDisciplineColor = (discipline: string): string => {
  switch (discipline) {
    case 'swim': return colors.disciplines.swim;
    case 'bike': return colors.disciplines.bike;
    case 'run': return colors.disciplines.run;
    default: return colors.neutral.secondary;
  }
};

const getDisciplineGradientColors = (discipline: string): string[] => {
  switch (discipline) {
    case 'swim': return ['#0EA5E9', '#0284C7'];
    case 'bike': return ['#FB923C', '#F97316'];
    case 'run': return ['#4ADE80', '#22C55E'];
    default: return ['#9CA3AF', '#6B7280'];
  }
};

// Main TestDashboard Component
export default function TestDashboard({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <WelcomeMessage userName="Cole" />
          <TrainingProgramInfo />
          <WeeklyProgress />
          <AIInsight />
        </View>

        {/* Today's Workout */}
        <TodaysWorkout 
          onPress={() => {
            const todayWorkout = getTodaysWorkout('plan_1');
            if (todayWorkout) {
              navigation.navigate('WorkoutDetail', {
                workoutId: todayWorkout.id,
                status: todayWorkout.status
              });
            }
          }}
        />

        {/* Quick Stats */}
        <QuickStats />

        {/* Week Overview */}
        <WeekOverview />

        {/* Weekly Schedule */}
        <WeeklySchedule 
          onWorkoutPress={(workoutId) => {
            navigation.navigate('WorkoutDetail', { workoutId });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
    gap: spacing[4],
  },
  
  // Header Card
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // Welcome Message
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  welcomeIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },
  welcomeSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },
  
  // Training Program
  programContainer: {
    marginBottom: spacing[4],
    padding: spacing[3],
    backgroundColor: '#F9FAFB',
    borderRadius: borderRadius.md,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  programTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },
  programGrid: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  programCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    alignItems: 'center',
  },
  programCardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },
  programCardSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
  },
  programPhaseCard: {
    flex: 1,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  programPhaseText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: '#EA580C',
  },
  programTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    padding: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  programTypeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: '#3B82F6',
  },
  
  // Weekly Progress
  progressContainer: {
    marginBottom: spacing[4],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  progressTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },
  progressCount: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
  },
  progressBars: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  
  // AI Insight
  aiContainer: {
    borderRadius: borderRadius.md,
    padding: spacing[4],
    flexDirection: 'row',
    gap: spacing[3],
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.white,
    marginBottom: spacing[1],
  },
  aiText: {
    fontSize: typography.sizes.sm,
    color: '#D1D5DB',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  
  // Today's Workout
  todayContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  todayTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },
  todayDate: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },
  workoutCard: {
    padding: spacing[4],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  workoutHeader: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },
  workoutSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },
  workoutDetails: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  workoutDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.text,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
  },
  startButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.white,
  },
  restDayContainer: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  restDayIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  restDayText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },
  
  // Quick Stats
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },
  
  // Week Overview
  weekContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  weekTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[4],
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayName: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
    marginBottom: spacing[2],
  },
  dayIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  dayIconToday: {
    backgroundColor: '#3B82F6',
  },
  dayDate: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
  },
  
  // Weekly Schedule
  scheduleContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleHeader: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },
  scheduleTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },
  scheduleItemToday: {
    backgroundColor: '#EFF6FF',
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
  },
  scheduleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleIconCompleted: {
    backgroundColor: '#D1FAE5',
  },
  scheduleIconToday: {
    backgroundColor: '#DBEAFE',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleWorkoutTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },
  scheduleWorkoutSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
  },
  scheduleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  todayBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },
  todayBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: '#3B82F6',
  },
});