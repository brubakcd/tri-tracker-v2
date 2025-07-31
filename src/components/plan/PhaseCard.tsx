import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

interface PhaseCardProps {
  phaseName: string;
  phaseDescription: string;
  phaseColor: string;
  weekNumbers: number[];
  currentWeek: number;
  isExpanded?: boolean;
  children: React.ReactNode;
}

export default function PhaseCard({
  phaseName,
  phaseDescription,
  phaseColor,
  weekNumbers,
  currentWeek,
  isExpanded: initialExpanded = false,
  children,
}: PhaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const isCurrentPhase = weekNumbers.includes(currentWeek);
  const completedWeeks = weekNumbers.filter(week => week < currentWeek).length;
  const totalPhaseWeeks = weekNumbers.length;

  return (
    <View style={[
      styles.container,
      isCurrentPhase && styles.currentPhaseContainer
    ]}>
      <TouchableOpacity 
        style={[
          styles.header,
          { backgroundColor: phaseColor + '05' }
        ]}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={[styles.phaseIndicator, { backgroundColor: phaseColor }]} />
            <View style={styles.titleContainer}>
              <View style={styles.titleAndBadge}>
                <Text style={styles.phaseTitle}>{phaseName}</Text>
                {isCurrentPhase && (
                  <View style={[styles.currentBadge, { backgroundColor: phaseColor }]}>
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
        </View>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={phaseColor} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={[
          styles.content,
          { backgroundColor: phaseColor + '05' }
        ]}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    overflow: 'hidden',
    ...shadows.base,
  },

  currentPhaseContainer: {
    ...shadows.lg,
    borderWidth: 2,
    borderColor: colors.primary + '30',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
  },

  headerContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },

  phaseIndicator: {
    width: 4,
    height: 48,
    borderRadius: borderRadius.full,
    marginTop: spacing[1],
  },

  titleContainer: {
    flex: 1,
  },

  titleAndBadge: {
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
    lineHeight: typography.lineHeights.relaxed * typography.sizes.sm,
  },

  weekRange: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
  },

  content: {
    paddingTop: 0,
    paddingBottom: spacing[2],
  },
});