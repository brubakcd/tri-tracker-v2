import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../styles/tokens';

interface WeekNavigationHeaderProps {
  currentWeek: number;
  totalWeeks: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export default function WeekNavigationHeader({
  currentWeek,
  totalWeeks,
  onPreviousWeek,
  onNextWeek,
}: WeekNavigationHeaderProps) {
  const canGoPrevious = currentWeek > 1;
  const canGoNext = currentWeek < totalWeeks;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.arrowButton, !canGoPrevious && styles.arrowButtonDisabled]}
        onPress={onPreviousWeek}
        disabled={!canGoPrevious}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={canGoPrevious ? colors.neutral.text : colors.neutral.secondary}
        />
      </TouchableOpacity>

      <View style={styles.weekIndicator}>
        <Text style={styles.weekNumber}>Week {currentWeek}</Text>
        <Text style={styles.weekTotal}>of {totalWeeks}</Text>
      </View>

      <TouchableOpacity
        style={[styles.arrowButton, !canGoNext && styles.arrowButtonDisabled]}
        onPress={onNextWeek}
        disabled={!canGoNext}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={canGoNext ? colors.neutral.text : colors.neutral.secondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.cards,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.system.gray6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowButtonDisabled: {
    opacity: 0.3,
  },

  weekIndicator: {
    alignItems: 'center',
    flex: 1,
  },

  weekNumber: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  weekTotal: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    marginTop: spacing[1] / 2,
  },
});