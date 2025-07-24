import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import WeekPlanHeader from '../components/plan/WeekPlanHeader';
import WeekFocusCard from '../components/plan/WeekFocusCard';
import WeekSelector from '../components/plan/WeekSelector';
import WorkoutDetailCard from '../components/plan/WorkoutDetailCard';
import { spacing } from '../styles/tokens';

export default function PlanPage() {
  const [selectedWeek, setSelectedWeek] = useState(6); // Start on different week to show button
  const actualCurrentWeek = 8; // This would come from your data/state
  
  // Mock data for the components  
  const getWeekPhase = (week: number) => {
    if (week < 5) return 'Base Building';
    if (week < 9) return 'Build Phase';
    return 'Peak & Taper';
  };

  const weekData = {
    weekNumber: selectedWeek,
    totalWeeks: 12,
    phase: getWeekPhase(selectedWeek),
    description: selectedWeek < 5 
      ? 'Focus on building aerobic capacity and establishing consistent training patterns. This week emphasizes longer, steady-state efforts.'
      : selectedWeek < 9
      ? 'Build specific race fitness with higher intensity workouts. Focus on lactate threshold and VO2 max development.'
      : 'Fine-tune race fitness and begin tapering for peak performance. Reduce volume while maintaining intensity.',
    totalWorkouts: 5,
    completedWorkouts: selectedWeek === actualCurrentWeek ? 3 : selectedWeek < actualCurrentWeek ? 5 : 0,
    totalMinutes: 420,
    completedMinutes: selectedWeek === actualCurrentWeek ? 280 : selectedWeek < actualCurrentWeek ? 420 : 0,
  };

  const focusData = {
    mainGoal: 'Build aerobic base and establish consistent training rhythm',
    keyObjectives: [
      'Develop efficient aerobic energy system',
      'Practice race-day nutrition strategies',
      'Build weekly training volume gradually',
      'Focus on technique refinement'
    ],
    rationale: 'Base building is crucial for long-term performance gains. These steady-state workouts develop mitochondrial density and capillarization, creating the aerobic foundation needed for later intensity phases.',
  };
  
  const weeks = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    phase: i < 4 ? 'Base Building' : i < 8 ? 'Build Phase' : 'Peak & Taper',
    isCompleted: i + 1 < actualCurrentWeek,
    isActive: i + 1 === actualCurrentWeek,
  }));

  const mockWorkouts = [
    {
      dayOfWeek: 'Monday',
      date: 'Jul 15',
      title: 'Recovery Swim',
      subtitle: 'Easy aerobic',
      description: 'Easy swim focusing on technique and form',
      intensity: 'Zone 1-2',
      duration: '45 min',
      phases: '4 sets',
      status: 'completed' as const,
      completedStats: {
        actualDuration: '42 min',
        distance: '1.2 km',
        feeling: 'good' as const,
      },
      coachNote: 'Great stroke technique improvement noticed. Keep focusing on bilateral breathing.',
    },
    {
      dayOfWeek: 'Tuesday',
      date: 'Jul 16',
      title: 'Base Build Bike',
      subtitle: 'Aerobic endurance',
      description: 'Steady aerobic ride with cadence focus',
      intensity: 'Zone 2',
      duration: '90 min',
      phases: '3 intervals',
      status: 'completed' as const,
      completedStats: {
        actualDuration: '85 min',
        avgHeartRate: '142 bpm',
        feeling: 'excellent' as const,
      },
      coachNote: 'Perfect pacing and heart rate control. You\'re building great aerobic capacity.',
    },
    {
      dayOfWeek: 'Wednesday',
      date: 'Jul 17',
      title: 'Tempo Run',
      subtitle: 'Sustained effort',
      description: 'Build sustained running pace with good form',
      intensity: 'Zone 3-4',
      duration: '60 min',
      phases: '5 intervals',
      status: 'completed' as const,
      completedStats: {
        actualDuration: '58 min',
        avgHeartRate: '165 bpm',
        feeling: 'tough' as const,
      },
      coachNote: 'Challenging workout completed well. Recovery focus for next 24 hours.',
    },
    {
      dayOfWeek: 'Thursday',
      date: 'Jul 18',
      title: 'Recovery Swim',
      subtitle: 'Active recovery',
      description: 'Easy swim with drill focus',
      intensity: 'Zone 1',
      duration: '30 min',
      phases: '6 drills',
      status: 'scheduled' as const,
    },
    {
      dayOfWeek: 'Friday',
      date: 'Jul 19',
      title: 'Brick Workout',
      subtitle: 'Bike + Run',
      description: 'Practice transition from bike to run',
      intensity: 'Multi-Zone',
      duration: '75 min',
      phases: '3 phases',
      status: 'upcoming' as const,
      coachNote: 'First brick workout - expect legs to feel heavy initially',
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <WeekPlanHeader {...weekData} />
      
      <WeekFocusCard
        {...focusData}
        onMorePress={() => console.log('Show more insights')}
      />
      
      <WeekSelector
        weeks={weeks}
        currentWeek={actualCurrentWeek}
        selectedWeek={selectedWeek}
        onWeekSelect={setSelectedWeek}
      />
      
      <View style={styles.workoutsSection}>
        <Text style={styles.sectionTitle}>This Week's Workouts</Text>
        {mockWorkouts.map((workout, index) => (
          <WorkoutDetailCard
            key={index}
            {...workout}
            onPress={() => console.log('Navigate to workout:', workout.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  
  content: {
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  
  workoutsSection: {
    marginBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});