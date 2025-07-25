import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/tokens';

interface RaceDateProps {
  raceName: string;
  raceDate: Date;
  raceType?: string;
  location?: string;
}

export default function RaceDate({
  raceName,
  raceDate,
  raceType = 'Olympic Triathlon',
  location
}: RaceDateProps) {
  
  const formatRaceDate = () => {
    return raceDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilRace = () => {
    const today = new Date();
    const timeDiff = raceDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const daysUntilRace = getDaysUntilRace();

  return (
    <View style={styles.container}>
      {/* Trophy Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="trophy" size={32} color={colors.system.yellow} />
      </View>
      
      {/* Race Information */}
      <View style={styles.contentContainer}>
        <Text style={styles.raceType}>{raceType}</Text>
        <Text style={styles.raceName}>{raceName}</Text>
        <Text style={styles.raceDate}>{formatRaceDate()}</Text>
        {location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={colors.neutral.secondary} />
            <Text style={styles.location}>{location}</Text>
          </View>
        )}
      </View>
      
      {/* Countdown */}
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownNumber}>{daysUntilRace}</Text>
        <Text style={styles.countdownLabel}>
          {daysUntilRace === 1 ? 'DAY' : 'DAYS'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[6],
    marginBottom: spacing[8],
    ...shadows.lg,
    borderWidth: 2,
    borderColor: colors.system.yellow + '40',
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: colors.system.yellow + '20',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },

  contentContainer: {
    alignItems: 'center',
    marginBottom: spacing[5],
  },

  raceType: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[1],
  },

  raceName: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    textAlign: 'center',
    marginBottom: spacing[2],
  },

  raceDate: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    textAlign: 'center',
    marginBottom: spacing[2],
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },

  location: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.secondary,
  },

  countdownContainer: {
    alignItems: 'center',
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  countdownNumber: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
    color: colors.system.yellow,
    lineHeight: 48,
  },

  countdownLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.neutral.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: spacing[1],
  },
});