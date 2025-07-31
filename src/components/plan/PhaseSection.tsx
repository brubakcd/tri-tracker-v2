import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../styles/tokens';

interface PhaseSectionProps {
  phaseName: string;
  phaseDescription: string;
  phaseColor: string;
  weekNumbers: number[];
  currentWeek: number;
  isExpanded?: boolean;
  children: React.ReactNode;
}

export default function PhaseSection({
  phaseName,
  phaseDescription,
  phaseColor,
  weekNumbers,
  currentWeek,
  isExpanded: initialExpanded = false,
  children,
}: PhaseSectionProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const isCurrentPhase = weekNumbers.includes(currentWeek);
  const completedWeeks = weekNumbers.filter(week => week < currentWeek).length;
  const totalPhaseWeeks = weekNumbers.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.header,
          isCurrentPhase && styles.currentPhaseHeader
        ]}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.phaseIndicator, { backgroundColor: phaseColor }]} />
          <View style={styles.headerContent}>
            <View style={styles.titleRow}>
              <Text style={styles.phaseTitle}>{phaseName}</Text>
              {isCurrentPhase && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>CURRENT</Text>
                </View>
              )}
            </View>
            <Text style={styles.phaseDescription}>{phaseDescription}</Text>
            <Text style={styles.weekRange}>
              Weeks {weekNumbers[0]}-{weekNumbers[weekNumbers.length - 1]} • {completedWeeks}/{totalPhaseWeeks} completed
            </Text>
          </View>
        </View>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={colors.neutral.secondary} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3],
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.neutral.background,
  },

  currentPhaseHeader: {
    backgroundColor: colors.primary + '10',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing[3],
  },

  phaseIndicator: {
    width: 4,
    height: 56,
    borderRadius: borderRadius.full,
  },

  headerContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[1],
  },

  phaseTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  currentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: borderRadius.full,
  },

  currentBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: 0.5,
  },

  phaseDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },

  weekRange: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
  },

  content: {
    paddingTop: spacing[2],
  },
});