import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WeekPlan from '../components/plan/WeekPlan';
import WeekPlanCard from '../components/plan/WeekPlanCard';
import PlanHeader from '../components/plan/PlanHeader';
import QuickActions from '../components/plan/QuickActions';
import PhaseCard from '../components/plan/PhaseCard';
import { spacing, colors, typography } from '../styles/tokens';

type PlanStackParamList = {
  PlanOverview: undefined;
  PlanDetailOverview: undefined;
  WeeklyView: undefined;
  WeekDetail: {
    weekNumber: number;
    phase: string;
    description: string;
    workouts: any[];
  };
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  ManagePlan: undefined;
  Profile: undefined;
};

export default function PlanPage() {
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();
  const currentWeek = 8; // This would come from your data/state
  const totalWeeks = 12;
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to top on tab press
  useEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;

    const unsubscribe = parent.addListener('tabPress', () => {
      if (navigation.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  // Helper functions
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

  // Generate mock workouts for a week
  const generateWeekWorkouts = (weekNumber: number) => {
    const baseDate = new Date(2024, 0, (weekNumber - 1) * 7 + 8); // Start from Jan 8, 2024
    const disciplines = ['swim', 'bike', 'run', 'swim', 'brick', 'run', 'rest'];
    
    return disciplines.map((discipline, index) => {
      const workoutDate = new Date(baseDate);
      workoutDate.setDate(baseDate.getDate() + index);
      
      return {
        id: `week${weekNumber}_day${index + 1}`,
        discipline,
        scheduled_date: workoutDate.toISOString(),
        status: weekNumber < currentWeek ? 'completed' : 
               weekNumber === currentWeek && index < 3 ? 'completed' : 
               weekNumber === currentWeek ? 'scheduled' : 'upcoming',
        workout_data: {
          title: discipline === 'rest' ? 'Rest Day' : 
                discipline === 'brick' ? 'Bike + Run' :
                `${discipline.charAt(0).toUpperCase() + discipline.slice(1)} Workout`,
          duration: discipline === 'rest' ? '0 min' : 
                   discipline === 'swim' ? '45 min' :
                   discipline === 'bike' ? '90 min' :
                   discipline === 'run' ? '60 min' :
                   '75 min', // brick
        }
      };
    });
  };

  // Generate all weeks data with start dates
  const planStartDate = new Date(2024, 0, 8); // Jan 8, 2024
  const allWeeks = Array.from({ length: totalWeeks }, (_, i) => {
    const weekNumber = i + 1;
    const weekStartDate = new Date(planStartDate);
    weekStartDate.setDate(planStartDate.getDate() + (weekNumber - 1) * 7);
    
    return {
      weekNumber,
      phase: getWeekPhase(weekNumber),
      description: getWeekDescription(weekNumber),
      workouts: generateWeekWorkouts(weekNumber),
      isCurrentWeek: weekNumber === currentWeek,
      weekStartDate,
    };
  });

  // Calculate race date (12 weeks after plan start + 1 week buffer)
  const raceDate = new Date(planStartDate);
  raceDate.setDate(planStartDate.getDate() + (totalWeeks * 7) + 7);

  // Group weeks by phase
  const phases = [
    {
      name: 'Base Building',
      description: 'Building aerobic fitness and technique',
      color: colors.system.blue,
      weeks: [1, 2, 3, 4],
    },
    {
      name: 'Build Phase', 
      description: 'Adding intensity and race-specific work',
      color: colors.system.orange,
      weeks: [5, 6, 7, 8, 9],
    },
    {
      name: 'Peak & Taper',
      description: 'Race preparation and recovery',
      color: colors.system.purple,
      weeks: [10, 11, 12],
    },
  ];

  // Get today's workout
  const getTodaysWorkout = () => {
    const today = new Date();
    const currentWeekData = allWeeks.find(w => w.weekNumber === currentWeek);
    if (!currentWeekData) return null;
    
    const todaysWorkout = currentWeekData.workouts.find(w => {
      const workoutDate = new Date(w.scheduled_date);
      return workoutDate.toDateString() === today.toDateString();
    });
    
    return todaysWorkout ? {
      discipline: todaysWorkout.discipline,
      title: todaysWorkout.workout_data.title,
      duration: todaysWorkout.workout_data.duration,
    } : null;
  };

  // Calculate week stats
  const getWeekStats = () => {
    const currentWeekData = allWeeks.find(w => w.weekNumber === currentWeek);
    if (!currentWeekData) return { completed: 0, total: 0, hoursRemaining: 0 };
    
    const completed = currentWeekData.workouts.filter(w => w.status === 'completed').length;
    const total = currentWeekData.workouts.filter(w => w.discipline !== 'rest').length;
    
    // Mock hours calculation
    const remainingWorkouts = currentWeekData.workouts.filter(
      w => w.status !== 'completed' && w.discipline !== 'rest'
    );
    const hoursRemaining = remainingWorkouts.reduce((acc, w) => {
      const duration = parseInt(w.workout_data.duration) || 0;
      return acc + duration / 60;
    }, 0);
    
    return { completed, total, hoursRemaining };
  };

  // Remove auto-scroll behavior - page should always start at top

  const handleWorkoutPress = (workoutId: string) => {
    navigation.navigate('WorkoutDetail', { workoutId });
  };

  const handleTodaysWorkoutPress = () => {
    const todaysWorkout = getTodaysWorkout();
    if (todaysWorkout) {
      // Navigate to today's workout
      navigation.navigate('WorkoutDetail', { workoutId: 'todays_workout' });
    }
  };

  const handleCurrentWeekPress = () => {
    navigation.navigate('WeekDetail', {
      weekNumber: currentWeek,
      phase: getWeekPhase(currentWeek),
      description: getWeekDescription(currentWeek),
      workouts: allWeeks.find(w => w.weekNumber === currentWeek)?.workouts || []
    });
  };

  const handlePlanOverviewPress = () => {
    navigation.navigate('PlanDetailOverview');
  };

  const handleManagePlanPress = () => {
    navigation.navigate('ManagePlan');
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Plan Header */}
      <PlanHeader
        raceName="Summer Olympic Triathlon"
        raceDate={raceDate}
        raceType="Olympic Distance"
        currentWeek={currentWeek}
        totalWeeks={totalWeeks}
        currentPhase={getWeekPhase(currentWeek)}
        phaseColor={phases.find(p => p.name === getWeekPhase(currentWeek))?.color}
      />

      {/* Quick Actions */}
      <QuickActions
        todaysWorkout={getTodaysWorkout()}
        weekStats={getWeekStats()}
        onTodaysWorkoutPress={handleTodaysWorkoutPress}
        onCurrentWeekPress={handleCurrentWeekPress}
        onPlanOverviewPress={handlePlanOverviewPress}
        onManagePlanPress={handleManagePlanPress}
      />

      {/* Current Week Highlight */}
      <View style={styles.currentWeekSection}>
        <Text style={styles.sectionTitle}>Current Week</Text>
        {allWeeks
          .filter(week => week.weekNumber === currentWeek)
          .map((week) => (
            <WeekPlan
              key={week.weekNumber}
              weekNumber={week.weekNumber}
              phase={week.phase}
              description={week.description}
              workouts={week.workouts}
              isCurrentWeek={true}
              weekStartDate={week.weekStartDate}
              currentWeekNumber={currentWeek}
              onWorkoutPress={handleWorkoutPress}
            />
          ))}
      </View>

      {/* All Weeks by Phase */}
      <View style={styles.allWeeksSection}>
        <Text style={styles.sectionTitle}>Training Phases</Text>
        {phases.map((phase) => {
          const phaseWeeks = allWeeks.filter(week => phase.weeks.includes(week.weekNumber));
          const isCurrentPhase = phase.weeks.includes(currentWeek);
          
          return (
            <PhaseCard
              key={phase.name}
              phaseName={phase.name}
              phaseDescription={phase.description}
              phaseColor={phase.color}
              weekNumbers={phase.weeks}
              currentWeek={currentWeek}
              isExpanded={isCurrentPhase}
            >
              {phaseWeeks.map((week) => (
                <WeekPlanCard
                  key={week.weekNumber}
                  weekNumber={week.weekNumber}
                  phase={week.phase}
                  description={week.description}
                  workouts={week.workouts}
                  isCurrentWeek={week.isCurrentWeek}
                  weekStartDate={week.weekStartDate}
                  currentWeekNumber={currentWeek}
                  onWorkoutPress={handleWorkoutPress}
                />
              ))}
            </PhaseCard>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  
  content: {
    paddingTop: 0,
    paddingBottom: spacing[8],
  },

  currentWeekSection: {
    marginTop: spacing[4],
  },

  allWeeksSection: {
    marginTop: spacing[6],
  },

  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[3],
    paddingHorizontal: spacing[4],
  },
});