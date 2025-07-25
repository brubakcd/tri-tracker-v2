import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import WeekPlan from '../components/plan/WeekPlan';
import RaceDate from '../components/plan/RaceDate';
import { spacing, colors } from '../styles/tokens';

export default function PlanPage() {
  const currentWeek = 8; // This would come from your data/state
  const totalWeeks = 12;
  const scrollViewRef = useRef<ScrollView>(null);
  const weekPositions = useRef<{ [key: number]: number }>({});
  
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

  // Keep chronological order
  const sortedWeeks = allWeeks; // Already in chronological order

  // Scroll to current week on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWeekPosition = weekPositions.current[currentWeek];
      if (scrollViewRef.current && currentWeekPosition !== undefined) {
        scrollViewRef.current.scrollTo({
          y: Math.max(0, currentWeekPosition - 100), // Scroll with some padding from top
          animated: true
        });
      }
    }, 500); // Longer delay to ensure all layouts are complete

    return () => clearTimeout(timer);
  }, [currentWeek]);

  // Handle week layout to track positions
  const handleWeekLayout = (weekNumber: number, y: number) => {
    weekPositions.current[weekNumber] = y;
    
    // If this is the current week and all previous weeks have been measured, scroll
    if (weekNumber === currentWeek) {
      const allPreviousWeeksMeasured = Array.from({ length: currentWeek }, (_, i) => i + 1)
        .every(week => weekPositions.current[week] !== undefined);
      
      if (allPreviousWeeksMeasured && scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, y - 100),
            animated: true
          });
        }, 100);
      }
    }
  };

  const handleWorkoutPress = (workoutId: string) => {
    console.log('Navigate to workout:', workoutId);
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {sortedWeeks.map((week) => (
        <WeekPlan
          key={week.weekNumber}
          weekNumber={week.weekNumber}
          phase={week.phase}
          description={week.description}
          workouts={week.workouts}
          isCurrentWeek={week.isCurrentWeek}
          weekStartDate={week.weekStartDate}
          currentWeekNumber={currentWeek}
          onWorkoutPress={handleWorkoutPress}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            handleWeekLayout(week.weekNumber, y);
          }}
        />
      ))}
      
      {/* Race Date Component */}
      <RaceDate
        raceName="Summer Olympic Triathlon"
        raceDate={raceDate}
        raceType="Olympic Triathlon"
        location="Lakefront Park, Chicago"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  
  content: {
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
});