import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
      {phases.map((phase, index) => (
        <View key={index} style={[styles.phaseContainer, index === phases.length - 1 && styles.lastPhase]}>
          {/* Phase Header */}
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseName}>{phase.name}</Text>
            <Text style={styles.phaseDuration}>{phase.duration}</Text>
          </View>

          {/* Phase Details */}
          {(phase.details.length > 0 || phase.description) && (
            <View style={styles.detailsBox}>
              {phase.details.map((detail, detailIndex) => (
                <View key={detailIndex} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              ))}
              
              {/* Description with divider */}
              {phase.description && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.descriptionInBox}>{phase.description}</Text>
                </>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    alignItems: 'baseline',
    marginBottom: spacing[4],
  },
  
  phaseName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  
  phaseDuration: {
    fontSize: 14,
    color: colors.neutral.secondary,
    fontWeight: '500',
  },
  
  detailsBox: {
    backgroundColor: colors.neutral.background,
    borderRadius: borderRadius.base,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  
  detailLabel: {
    fontSize: 14,
    color: colors.neutral.secondary,
    fontWeight: '400',
  },
  
  detailValue: {
    fontSize: 14,
    color: colors.neutral.text,
    fontWeight: '600',
    textAlign: 'right',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#D1D1D6',
    marginTop: spacing[3],
    marginBottom: spacing[3],
  },
  
  descriptionInBox: {
    fontSize: 14,
    color: colors.neutral.text,
    fontWeight: '600',
    lineHeight: 20,
  },
});