import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, BodyTextLarge, CaptionText } from '../ui/Typography';
import Card from '../ui/Card';
import { colors, spacing, borderRadius, typography } from '../../styles/tokens';

interface WorkoutCardProps {
  workout: {
    id: string;
    discipline: 'swim' | 'bike' | 'run' | 'brick' | 'rest';
    scheduledDate: string;
    workout_data: {
      title: string;
      description: string;
      duration: string;
      distance?: string;
      intensity: string;
    };
  };
  status?: 'scheduled' | 'completed' | 'missed' | 'skipped';
  onPress?: () => void;
  variant?: 'default' | 'compact';
}

export default function WorkoutCard({ 
  workout, 
  status = 'scheduled',
  onPress,
  variant = 'default'
}: WorkoutCardProps) {
  const disciplineColor = getDisciplineColor(workout.discipline);
  const statusColor = getStatusColor(status);
  const disciplineIcon = getDisciplineIcon(workout.discipline);
  
  const isCompact = variant === 'compact';

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card style={[
        styles.container,
        { borderLeftWidth: 3, borderLeftColor: disciplineColor }
      ]} padding="medium">
        {/* Header with discipline indicator and status */}
        <View style={styles.header}>
          <View style={styles.disciplineRow}>
            <View style={[styles.disciplineIndicator, { backgroundColor: disciplineColor }]}>
              <Ionicons 
                name={disciplineIcon} 
                size={16} 
                color={colors.neutral.cards} 
              />
            </View>
            <View style={styles.disciplineInfo}>
              <BodyTextLarge style={styles.disciplineText}>
                {getDisciplineName(workout.discipline)}
              </BodyTextLarge>
              <CaptionText style={styles.intensityText}>
                {workout.workout_data.intensity}
              </CaptionText>
            </View>
          </View>
          
          {status !== 'scheduled' && (
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
              <CaptionText style={[styles.statusText, { color: statusColor }]}>
                {getStatusLabel(status)}
              </CaptionText>
            </View>
          )}
        </View>

        {/* Workout Details */}
        <View style={styles.content}>
          <BodyTextLarge style={styles.title}>
            {workout.workout_data.title}
          </BodyTextLarge>
          
          {!isCompact && (
            <BodyText style={styles.description} numberOfLines={2}>
              {workout.workout_data.description}
            </BodyText>
          )}
          
          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Ionicons 
                name="time-outline" 
                size={14} 
                color={colors.neutral.secondary} 
              />
              <CaptionText style={styles.metricText}>
                {workout.workout_data.duration}
              </CaptionText>
            </View>
            
            {workout.workout_data.distance && (
              <View style={styles.metric}>
                <Ionicons 
                  name="location-outline" 
                  size={14} 
                  color={colors.neutral.secondary} 
                />
                <CaptionText style={styles.metricText}>
                  {workout.workout_data.distance}
                </CaptionText>
              </View>
            )}
            
            <View style={styles.metric}>
              <Ionicons 
                name="calendar-outline" 
                size={14} 
                color={colors.neutral.secondary} 
              />
              <CaptionText style={styles.metricText}>
                {formatWorkoutDate(workout.scheduledDate)}
              </CaptionText>
            </View>
          </View>
        </View>

        {/* Completion Indicator */}
        {status === 'completed' && (
          <View style={styles.completionIndicator}>
            <Ionicons 
              name="checkmark-circle" 
              size={20} 
              color={colors.status.completed} 
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

// Helper functions
function getDisciplineColor(discipline: string): string {
  const colorMap: Record<string, string> = {
    swim: colors.disciplines.swim,
    bike: colors.disciplines.bike,
    run: colors.disciplines.run,
    brick: colors.disciplines.run, // Use run color for brick, gradient would be complex
    rest: colors.status.rest,
  };
  return colorMap[discipline] || colors.neutral.secondary;
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    scheduled: colors.status.scheduled,
    completed: colors.status.completed,
    missed: colors.status.missed,
    skipped: colors.neutral.secondary,
  };
  return colorMap[status] || colors.status.scheduled;
}

function getDisciplineIcon(discipline: string): keyof typeof Ionicons.glyphMap {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    swim: 'water',
    bike: 'bicycle',
    run: 'walk',
    brick: 'layers', // Combined workout icon
    rest: 'bed',
  };
  return iconMap[discipline] || 'help-outline';
}

function getDisciplineName(discipline: string): string {
  const nameMap: Record<string, string> = {
    swim: 'Swim',
    bike: 'Bike',
    run: 'Run',
    brick: 'Brick',
    rest: 'Rest',
  };
  return nameMap[discipline] || discipline;
}

function getStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    scheduled: 'Planned',
    completed: 'Done',
    missed: 'Missed',
    skipped: 'Skipped',
  };
  return labelMap[status] || status;
}

function formatWorkoutDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
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
    marginBottom: spacing[3],
    position: 'relative',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  
  disciplineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  disciplineIndicator: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  
  disciplineInfo: {
    flex: 1,
  },
  
  disciplineText: {
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },
  
  intensityText: {
    color: colors.neutral.secondary,
    marginTop: spacing[1] / 2,
  },
  
  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  
  statusText: {
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.xs - 1,
  },
  
  content: {
    marginBottom: spacing[2],
  },
  
  title: {
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[2],
  },
  
  description: {
    color: colors.neutral.secondary,
    marginBottom: spacing[3],
    lineHeight: 20,
  },
  
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[4],
    marginBottom: spacing[1],
  },
  
  metricText: {
    marginLeft: spacing[1],
    color: colors.neutral.secondary,
  },
  
  completionIndicator: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
  },
});