import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Heading1, SecondaryText } from '../components/ui/Typography';
import { WorkoutCard } from '../components/workout';
import { spacing, colors, typography } from '../styles/tokens';
import { getWorkoutsByWeek, isWorkoutCompleted } from '../data';

type PlanStackParamList = {
  PlanOverview: undefined;
  WeeklyView: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
};

type WeeklyViewNavigationProp = StackNavigationProp<PlanStackParamList, 'WeeklyView'>;
type WeeklyViewRouteProp = RouteProp<PlanStackParamList, 'WeeklyView'>;

interface WeeklyViewProps {
  navigation: WeeklyViewNavigationProp;
  route: WeeklyViewRouteProp;
}

export default function WeeklyView({ navigation }: WeeklyViewProps) {
  // Get current week workouts (week 2 for demo)
  const weekWorkouts = getWorkoutsByWeek('plan_1', 2);

  const handleWorkoutPress = (workoutId: string) => {
    const isCompleted = isWorkoutCompleted(workoutId);
    navigation.navigate('WorkoutDetail', {
      workoutId,
      status: isCompleted ? 'completed' : 'scheduled'
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Heading1 style={styles.title}>Weekly View</Heading1>
          <SecondaryText>Week 2 • Base Building</SecondaryText>
        </View>

        <View style={styles.workoutsSection}>
          <Text style={styles.sectionTitle}>This Week's Workouts</Text>
          {weekWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={{
                id: workout.id,
                discipline: workout.discipline as 'swim' | 'bike' | 'run' | 'brick' | 'rest',
                scheduledDate: workout.scheduled_date,
                workout_data: workout.workout_data
              }}
              status={isWorkoutCompleted(workout.id) ? 'completed' : 'scheduled'}
              onPress={() => handleWorkoutPress(workout.id)}
            />
          ))}
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
    paddingTop: spacing[1],
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
  },
  
  header: {
    marginBottom: spacing[6],
  },
  
  title: {
    fontSize: typography.sizes['3xl'] - 2,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[2],
  },

  workoutsSection: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[4],
  },
});