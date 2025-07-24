import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, BodyTextSmall, CaptionText } from '../ui/Typography';
import { colors, spacing, borderRadius } from '../../styles/tokens';

interface WorkoutMiniItemProps {
  workout: {
    id: string;
    discipline: 'swim' | 'bike' | 'run' | 'brick' | 'rest';
    scheduled_date: string;
    workout_data: {
      title: string;
      description?: string;
      duration: string;
      distance?: string;
      intensity?: string;
    };
  };
  dayNumber?: number;
  dayName?: string;
  isToday?: boolean;
  status?: 'scheduled' | 'completed' | 'missed' | 'skipped';
  onPress?: () => void;
}

export default function WorkoutMiniItem({ 
  workout,
  dayNumber,
  dayName,
  isToday = false,
  status = 'scheduled',
  onPress
}: WorkoutMiniItemProps) {
  const disciplineColor = getDisciplineColor(workout.discipline);
  
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        {/* Day indicator */}
        {(dayNumber !== undefined && dayName) && (
          <View style={styles.dayContainer}>
            <CaptionText style={styles.dayName}>{dayName}</CaptionText>
            <BodyText style={[styles.dayNumber, isToday && styles.dayNumberToday]}>
              {dayNumber}
            </BodyText>
          </View>
        )}
        
        {/* Discipline dot */}
        <View style={[styles.disciplineDot, { backgroundColor: disciplineColor }]} />
        
        {/* Workout info */}
        <View style={styles.workoutInfo}>
          <BodyText style={styles.title} numberOfLines={1}>
            {workout.workout_data.title}
          </BodyText>
{/*           <CaptionText style={styles.details} numberOfLines={1}>
            {workout.workout_data.description || `${workout.workout_data.intensity || workout.discipline}`}
          </CaptionText> */}
        </View>
        
        {/* Duration */}
        <CaptionText style={styles.duration}>
          {workout.workout_data.duration}
        </CaptionText>
      </View>
    </TouchableOpacity>
  );
}

// Helper functions (same as WorkoutCard but reused here)
function getDisciplineColor(discipline: string): string {
  const colorMap: Record<string, string> = {
    swim: colors.disciplines.swim,
    bike: colors.disciplines.bike,
    run: colors.disciplines.run,
    brick: colors.disciplines.run,
    rest: colors.status.rest,
  };
  return colorMap[discipline] || colors.neutral.secondary;
}

function getDisciplineIcon(discipline: string): keyof typeof Ionicons.glyphMap {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    swim: 'water',
    bike: 'bicycle',
    run: 'walk',
    brick: 'layers',
    rest: 'bed',
  };
  return iconMap[discipline] || 'help-outline';
}

function formatWorkoutDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.system.gray4,
  },
  
  dayContainer: {
    width: 32,
    alignItems: 'center',
  },
  
  dayName: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  
  dayNumberToday: {
    color: '#007AFF',
  },
  
  disciplineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  workoutInfo: {
    flex: 1,
    minWidth: 0,
  },
  
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  
  details: {
    fontSize: 13,
    color: '#6D6D80',
  },
  
  duration: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '400',
  },
});