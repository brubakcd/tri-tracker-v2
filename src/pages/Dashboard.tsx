import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Heading3, BodyText } from '../components/ui/Typography';
import TodaysWorkoutSimple from '../components/workout/TodaysWorkoutSimple';
import DashboardHeaderSimple from '../components/dashboard/DashboardHeaderSimple';
import WeekOverviewCombined from '../components/dashboard/WeekOverviewCombined';
import { spacing, colors, typography } from '../styles/tokens';
import { getTodaysWorkout, getUpcomingWorkouts, isWorkoutCompleted, getConsistencyData } from '../data';

type DashboardStackParamList = {
  DashboardHome: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
};

type TabParamList = {
  Dashboard: undefined;
  Plan: undefined;
  Coach: undefined;
};

type DashboardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<DashboardStackParamList, 'DashboardHome'>,
  BottomTabNavigationProp<TabParamList>
>;

interface DashboardProps {
  navigation: DashboardNavigationProp;
}

export default function Dashboard({ navigation }: DashboardProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to top on tab press
  useEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;

    const unsubscribe = (parent as any).addListener('tabPress', () => {
      if (navigation.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);

  // Get today's workout
  const todaysWorkout = getTodaysWorkout('plan_1');
  
  // Get all workouts for the current week
  const weekWorkouts = getUpcomingWorkouts('plan_1', 7);
  
  
  // Determine status for today's workout
  const todaysStatus: 'completed' | 'scheduled' | 'missed' | 'skipped' | undefined = 
    todaysWorkout ? (isWorkoutCompleted(todaysWorkout.id) ? 'completed' : 'scheduled') : undefined;
  
  // Calculate completed workouts for the week
  const completedCount = weekWorkouts.filter(w => isWorkoutCompleted(w.id)).length;
  
  // Get consistency data for streak
  const consistencyData = getConsistencyData('user_1', 'plan_1');

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Welcome Message */}
        <DashboardHeaderSimple 
          onMorePress={() => navigation.navigate('Insights' as any)}
          userName="Cole"
          trainingInfo={{
            currentWeek: 8,
            totalWeeks: 16,
            phase: "Build Phase",
            program: "Olympic Distance Program",
            weeklyWorkouts: weekWorkouts,
            completedCount: completedCount,
            currentStreak: consistencyData.currentStreak
          }}
        />
        
        {/* Today's Workout Section */}
        <View style={styles.section}>
          <TodaysWorkoutSimple 
            onPress={() => {
              if (todaysWorkout) {
                navigation.navigate('WorkoutDetail', {
                  workoutId: todaysWorkout.id,
                  status: todaysStatus
                });
              }
            }} 
          />
        </View>

        {/* Combined Week Overview */}
        <WeekOverviewCombined
          workouts={weekWorkouts}
          currentWeek={8}
          totalWeeks={16}
          weekPhase="Build Phase"
          onWorkoutPress={(workoutId) => {
            const workout = weekWorkouts.find(w => w.id === workoutId);
            if (workout) {
              const workoutStatus = isWorkoutCompleted(workoutId) ? 'completed' : 'scheduled';
              navigation.navigate('WorkoutDetail', {
                workoutId: workoutId,
                status: workoutStatus
              });
            }
          }}
          onViewPlanPress={() => navigation.navigate('Plan' as any)}
        />
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
    paddingTop: 0,
    paddingBottom: spacing[8],
  },
  
  section: {
    marginBottom: spacing[4],
  },
  
  paddedSection: {
    paddingHorizontal: spacing[4],
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  
  sectionTitleAlt: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },
  
  sectionAction: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },

  
});