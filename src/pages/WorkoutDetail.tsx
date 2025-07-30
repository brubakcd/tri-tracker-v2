import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText } from '../components/ui/Typography';
import { WorkoutStructureCard, WorkoutDetailHeader } from '../components/workout';
import { colors, spacing, typography } from '../styles/tokens';
import { getWorkoutById } from '../data/mockWorkouts';

type PlanStackParamList = {
  PlanOverview: undefined;
  WeeklyView: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
};

type WorkoutDetailNavigationProp = StackNavigationProp<PlanStackParamList, 'WorkoutDetail'>;
type WorkoutDetailRouteProp = RouteProp<PlanStackParamList, 'WorkoutDetail'>;

interface WorkoutDetailProps {
  navigation: WorkoutDetailNavigationProp;
  route: WorkoutDetailRouteProp;
}

export default function WorkoutDetail({ navigation, route }: WorkoutDetailProps) {
  // Get params from navigation
  const { workoutId, status = 'scheduled' } = route.params || { 
    workoutId: 'workout_2_7', 
    status: 'scheduled' as const 
  };

  // Get workout data
  const workout = getWorkoutById(workoutId);
  
  if (!workout) {
    return (
      <View style={styles.container}>
        <BodyText>Workout not found</BodyText>
      </View>
    );
  }

  const isCompleted = status === 'completed';
  const isScheduled = status === 'scheduled';


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getSubtitle = (discipline: string) => {
    switch (discipline) {
      case 'brick': return 'Bike + Run';
      case 'swim': return 'Swimming';
      case 'bike': return 'Cycling';
      case 'run': return 'Running';
      case 'rest': return 'Recovery';
      default: return discipline.charAt(0).toUpperCase() + discipline.slice(1);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Workout Overview Header */}
        <WorkoutDetailHeader
          dayOfWeek={formatDayOfWeek(workout.scheduled_date)}
          date={formatDate(workout.scheduled_date)}
          title={workout.workout_data.title}
          subtitle={getSubtitle(workout.discipline)}
          description={workout.workout_data.description}
          intensity={workout.workout_data.intensity}
          duration={workout.workout_data.duration}
          phases={`${workout.workout_data.structure.length} phases`}
          status={isCompleted ? 'completed' : (isScheduled ? 'scheduled' : 'upcoming')}
          workoutOverview="This endurance-focused session builds aerobic capacity through varied intensity zones. Maintain steady effort and focus on proper form throughout each phase to maximize training adaptations."
          discipline={workout.discipline}
        />

        {/* Workout Structure */}
        <WorkoutStructureCard phases={workout.workout_data.structure} />

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
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
});