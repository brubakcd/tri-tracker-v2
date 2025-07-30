import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../styles/tokens';

interface WorkoutPhase {
  name: string;
  duration: string;
  details: Array<{ label: string; value: string }>;
  description: string;
}

interface WorkoutStructureCardProps {
  phases: WorkoutPhase[];
}

const getPhaseIcon = (phaseName: string) => {
  const name = phaseName.toLowerCase();
  if (name.includes('warm') || name.includes('prep')) return 'thermometer-outline';
  if (name.includes('main') || name.includes('work') || name.includes('build')) return 'flash';
  if (name.includes('cool') || name.includes('recovery')) return 'leaf-outline';
  if (name.includes('interval')) return 'repeat';
  return 'fitness-outline';
};

const getPhaseColor = (phaseName: string, index: number) => {
  const name = phaseName.toLowerCase();
  if (name.includes('warm') || name.includes('prep')) return colors.disciplines.swim;
  if (name.includes('main') || name.includes('work') || name.includes('build')) return colors.disciplines.bike;
  if (name.includes('cool') || name.includes('recovery')) return colors.disciplines.run;
  if (name.includes('interval')) return colors.system.purple;
  
  // Fallback to cycling through discipline colors
  const fallbackColors = [colors.disciplines.swim, colors.disciplines.bike, colors.disciplines.run];
  return fallbackColors[index % fallbackColors.length];
};

export default function WorkoutStructureCard({ 
  phases
}: WorkoutStructureCardProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Workout Structure</Text>
        <Text style={styles.cardSubtitle}>Detailed breakdown of today's session</Text>
      </View>

      {/* Phases */}
      {phases.map((phase, index) => {
        const phaseColor = getPhaseColor(phase.name, index);
        const isLast = index === phases.length - 1;
        
        return (
          <View key={index} style={[styles.phaseContainer, isLast && styles.lastPhase]}>
            {/* Phase Header */}
            <View style={styles.phaseHeader}>
              <View style={styles.phaseHeaderLeft}>
                <View style={[styles.phaseIndicator, { backgroundColor: phaseColor }]} />
                <View style={styles.phaseTitleContainer}>
                  <Text style={styles.phaseName}>{phase.name}</Text>
                  <Text style={styles.phaseDescription}>{phase.description}</Text>
                </View>
              </View>
              <Text style={styles.phaseDuration}>{phase.duration}</Text>
            </View>

            {/* Phase Details - With Dividers */}
            {phase.details.length > 0 && (
              <View style={styles.detailsContainer}>
                {phase.details.map((detail, detailIndex) => (
                  <View key={detailIndex}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{detail.label}</Text>
                      <Text style={styles.detailValue}>{detail.value}</Text>
                    </View>
                    {detailIndex < phase.details.length - 1 && (
                      <View style={styles.detailDivider} />
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  
  cardHeader: {
    marginBottom: spacing[6],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },
  
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: colors.neutral.secondary,
    lineHeight: 18,
  },
  
  phaseContainer: {
    paddingBottom: spacing[6],
    marginBottom: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },
  
  lastPhase: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  
  phaseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: spacing[4],
  },
  
  phaseIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
    marginTop: 2,
  },
  
  phaseTitleContainer: {
    flex: 1,
  },
  
  phaseName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral.text,
    marginBottom: 4,
  },
  
  phaseDescription: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
  },
  
  phaseDuration: {
    fontSize: 17,
    color: colors.neutral.text,
    fontWeight: '600',
    textAlign: 'right',
  },
  
  detailsContainer: {
    marginTop: 16,
  },
  
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  
  detailDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 4,
  },
  
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  
  detailValue: {
    fontSize: 15,
    color: colors.neutral.text,
    fontWeight: '600',
    textAlign: 'right',
  },
});