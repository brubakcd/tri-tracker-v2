import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/tokens';
import { useNavigation, useRoute } from '@react-navigation/native';
import WeekDetailCard from '../components/plan/WeekDetailCard';

export default function WeekDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { weekNumber, phase, description, workouts } = route.params as any;
  
  const totalWeeks = 12; // This could come from route params or app state

  // Helper functions to generate week data (similar to PlanPage)
  const getWeekPhase = (week: number) => {
    if (week < 5) return 'Base Building';
    if (week < 9) return 'Build Phase';
    return 'Peak & Taper';
  };

  const getWeekDescription = (week: number) => {
    if (week < 5) {
      return 'Focus on building aerobic capacity and establishing consistent training patterns. This week emphasizes longer, steady-state efforts to develop your aerobic base.';
    } else if (week < 9) {
      return 'Build specific race fitness with higher intensity workouts. Focus on lactate threshold and VO2 max development to improve your race-specific fitness.';
    } else {
      return 'Fine-tune race fitness and begin tapering for peak performance. Reduce volume while maintaining intensity to arrive at race day refreshed and ready.';
    }
  };

  // Generate mock workouts for a week (simplified version from PlanPage)
  const generateWeekWorkouts = (weekNum: number) => {
    const baseDate = new Date(2024, 0, (weekNum - 1) * 7 + 8);
    const disciplines = ['swim', 'bike', 'run', 'swim', 'brick', 'run', 'rest'];
    
    return disciplines.map((discipline, index) => {
      const workoutDate = new Date(baseDate);
      workoutDate.setDate(baseDate.getDate() + index);
      
      return {
        id: `week${weekNum}_day${index + 1}`,
        discipline,
        scheduled_date: workoutDate.toISOString(),
        status: weekNum < 8 ? 'completed' : 
               weekNum === 8 && index < 3 ? 'completed' : 
               weekNum === 8 ? 'scheduled' : 'upcoming',
        workout_data: {
          title: discipline === 'rest' ? 'Rest Day' : 
                discipline === 'brick' ? 'Bike + Run' :
                `${discipline.charAt(0).toUpperCase() + discipline.slice(1)} Workout`,
          duration: discipline === 'rest' ? '0 min' : 
                   discipline === 'swim' ? '45 min' :
                   discipline === 'bike' ? '90 min' :
                   discipline === 'run' ? '60 min' :
                   '75 min',
        }
      };
    });
  };

  const handleWorkoutPress = (workoutId: string) => {
    navigation.navigate('WorkoutDetail', { workoutId });
  };

  const handleViewPlanPress = () => {
    navigation.goBack();
  };

  const handlePreviousWeek = () => {
    if (weekNumber > 1) {
      const newWeekNumber = weekNumber - 1;
      navigation.setParams({
        weekNumber: newWeekNumber,
        phase: getWeekPhase(newWeekNumber),
        description: getWeekDescription(newWeekNumber),
        workouts: generateWeekWorkouts(newWeekNumber)
      });
    }
  };

  const handleNextWeek = () => {
    if (weekNumber < totalWeeks) {
      const newWeekNumber = weekNumber + 1;
      navigation.setParams({
        weekNumber: newWeekNumber,
        phase: getWeekPhase(newWeekNumber),
        description: getWeekDescription(newWeekNumber),
        workouts: generateWeekWorkouts(newWeekNumber)
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Safe Area */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={colors.neutral.text} />
            <Text style={styles.backText}>Plan Overview</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Unified Week Detail with Navigation */}
        <WeekDetailCard
          weekNumber={weekNumber}
          totalWeeks={totalWeeks}
          phase={phase}
          description={description}
          workouts={workouts || generateWeekWorkouts(weekNumber)}
          onWorkoutPress={handleWorkoutPress}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
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
  
  headerSafeArea: {
    backgroundColor: colors.neutral.cards,
  },
  
  header: {
    backgroundColor: colors.neutral.cards,
    height: 44,
    paddingHorizontal: spacing[4],
    justifyContent: 'center',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  
  backText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
});