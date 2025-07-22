import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Heading3, BodyText } from '../components/ui/Typography';
import TodaysWorkoutSimple from '../components/workout/TodaysWorkoutSimple';
import DashboardHeaderSimple from '../components/dashboard/DashboardHeaderSimple';
import WeekStats from '../components/dashboard/WeekStats';
import WeekOverview from '../components/dashboard/WeekOverview';
import { spacing } from '../styles/tokens';
import { getTodaysWorkout, getUpcomingWorkouts, isWorkoutCompleted, getWeeklyProgress } from '../data';

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
  // Get today's workout
  const todaysWorkout = getTodaysWorkout('plan_1');
  
  // Get all workouts for the current week
  const weekWorkouts = getUpcomingWorkouts('plan_1', 7);
  
  // Get weekly progress stats
  const weeklyProgress = getWeeklyProgress('plan_1');
  
  // Determine status for today's workout
  const todaysStatus: 'completed' | 'scheduled' | 'missed' | 'skipped' | undefined = 
    todaysWorkout ? (isWorkoutCompleted(todaysWorkout.id) ? 'completed' : 'scheduled') : undefined;
  
  // Calculate completed workouts for the week
  const completedCount = weekWorkouts.filter(w => isWorkoutCompleted(w.id)).length;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <DashboardHeaderSimple 
          userName="Cole" 
          onMorePress={() => navigation.navigate('Insights' as any)}
          weeklyStats={{
            completed: weeklyProgress.workoutsCompleted,
            totalMinutes: weeklyProgress.totalMinutes,
            remaining: weeklyProgress.workoutsRemaining
          }}
        />
        
        {/* Today's Workout Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <TodaysWorkoutSimple onPress={() => {
            if (todaysWorkout) {
              navigation.navigate('WorkoutDetail', {
                workoutId: todaysWorkout.id,
                status: todaysStatus
              });
            }
          }} />
        </View>
        
        {/* This Week Stats */}
{/*         <View style={[styles.section, styles.paddedSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitleAlt}>This Week</Text>
            <TouchableOpacity onPress={() => console.log('View all stats')}>
              <Text style={styles.sectionAction}>View all</Text>
            </TouchableOpacity>
          </View>
          <WeekStats
            completed={weeklyProgress.workoutsCompleted}
            totalMinutes={weeklyProgress.totalMinutes}
            remaining={weeklyProgress.workoutsRemaining}
            lastWeekCompleted={2} // Mock last week data
            lastWeekMinutes={375} // Mock last week data
          />
        </View> */}
        
        {/* Week Overview */}
        <View style={[styles.section, styles.paddedSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitleAlt}>Week Overview</Text>
            <TouchableOpacity onPress={() => console.log('View calendar')}>
              <Text style={styles.sectionAction}>View training plan</Text>
            </TouchableOpacity>
          </View>
          <WeekOverview
            workouts={weekWorkouts.map(w => ({
              ...w,
              discipline: w.discipline as 'swim' | 'bike' | 'run' | 'brick' | 'rest'
            }))}
            currentWeek={8}
            weekPhase="Base Building"
            completedCount={completedCount}
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
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  
  section: {
    marginBottom: 16,
  },
  
  paddedSection: {
    paddingHorizontal: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  
  sectionTitleAlt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  
  sectionAction: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  
});