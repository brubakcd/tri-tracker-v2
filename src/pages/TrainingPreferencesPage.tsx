import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader, SettingsRow } from '../components/ui';
import { SelectionModal } from '../components/modals';

export default function TrainingPreferencesPage() {
  const [preferences, setPreferences] = useState({
    autoSchedule: true,
    weatherAlerts: true,
    adaptiveTraining: false,
    restDayReminders: true,
    workoutReminders: true,
    preferredTimeSlot: 'Morning (6-8 AM)',
    maxWeeklyHours: '8-10 hours',
    trainingIntensity: 'Moderate',
    recoveryFocus: 'Balanced'
  });

  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePreferredTime = () => {
    setModalVisible('preferredTime');
  };

  const handleWeeklyHours = () => {
    setModalVisible('weeklyHours');
  };

  const handleTrainingIntensity = () => {
    setModalVisible('trainingIntensity');
  };

  const handleRecoveryFocus = () => {
    setModalVisible('recoveryFocus');
  };

  // Modal options
  const timeSlotOptions = [
    { label: 'Early Morning (5-7 AM)', value: 'Early Morning (5-7 AM)', description: 'Perfect for early risers' },
    { label: 'Morning (6-8 AM)', value: 'Morning (6-8 AM)', description: 'Most popular time slot' },
    { label: 'Mid-Morning (8-10 AM)', value: 'Mid-Morning (8-10 AM)', description: 'After morning routine' },
    { label: 'Lunch (12-1 PM)', value: 'Lunch (12-1 PM)', description: 'Quick midday sessions' },
    { label: 'Afternoon (3-5 PM)', value: 'Afternoon (3-5 PM)', description: 'Post-work energy boost' },
    { label: 'Evening (5-7 PM)', value: 'Evening (5-7 PM)', description: 'After work training' },
    { label: 'Night (7-9 PM)', value: 'Night (7-9 PM)', description: 'For night owls' },
  ];

  const weeklyHoursOptions = [
    { label: '4-6 hours', value: '4-6 hours', description: 'Light training load' },
    { label: '6-8 hours', value: '6-8 hours', description: 'Moderate training load' },
    { label: '8-10 hours', value: '8-10 hours', description: 'Standard training load' },
    { label: '10-12 hours', value: '10-12 hours', description: 'High training load' },
    { label: '12-15 hours', value: '12-15 hours', description: 'Advanced training load' },
    { label: '15+ hours', value: '15+ hours', description: 'Elite training load' },
  ];

  const trainingIntensityOptions = [
    { label: 'Easy', value: 'Easy', description: 'Focus on base building and recovery' },
    { label: 'Moderate', value: 'Moderate', description: 'Balanced approach to training' },
    { label: 'Hard', value: 'Hard', description: 'Push your limits and improve performance' },
    { label: 'Very Hard', value: 'Very Hard', description: 'Elite level intensity' },
  ];

  const recoveryFocusOptions = [
    { label: 'Minimal', value: 'Minimal', description: 'Less recovery, more training' },
    { label: 'Balanced', value: 'Balanced', description: 'Equal focus on training and recovery' },
    { label: 'Enhanced', value: 'Enhanced', description: 'Extra recovery time between sessions' },
    { label: 'Maximum', value: 'Maximum', description: 'Prioritize recovery for injury prevention' },
  ];

  return (
    <View style={styles.container}>
      <PageHeader title="Training Preferences" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Training Schedule */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Training Schedule</Text>
            </View>
            <SettingsRow
              label="Preferred Time Slot"
              value={preferences.preferredTimeSlot}
              onPress={handlePreferredTime}
            />
            <SettingsRow
              label="Max Weekly Hours"
              value={preferences.maxWeeklyHours}
              onPress={handleWeeklyHours}
            />
            <SettingsRow
              label="Training Intensity"
              value={preferences.trainingIntensity}
              onPress={handleTrainingIntensity}
              isLast={true}
            />
          </View>
        </View>

        {/* Smart Features */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Smart Features</Text>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Auto-Schedule Workouts</Text>
              <Switch
                value={preferences.autoSchedule}
                onValueChange={() => handleToggle('autoSchedule')}
                trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
                thumbColor={preferences.autoSchedule ? colors.neutral.text : colors.neutral.secondary}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Adaptive Training</Text>
              <Switch
                value={preferences.adaptiveTraining}
                onValueChange={() => handleToggle('adaptiveTraining')}
                trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
                thumbColor={preferences.adaptiveTraining ? colors.neutral.text : colors.neutral.secondary}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Weather Alerts</Text>
              <Switch
                value={preferences.weatherAlerts}
                onValueChange={() => handleToggle('weatherAlerts')}
                trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
                thumbColor={preferences.weatherAlerts ? colors.neutral.text : colors.neutral.secondary}
              />
            </View>
          </View>
        </View>

        {/* Reminders */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Reminders</Text>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Workout Reminders</Text>
              <Switch
                value={preferences.workoutReminders}
                onValueChange={() => handleToggle('workoutReminders')}
                trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
                thumbColor={preferences.workoutReminders ? colors.neutral.text : colors.neutral.secondary}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Rest Day Reminders</Text>
              <Switch
                value={preferences.restDayReminders}
                onValueChange={() => handleToggle('restDayReminders')}
                trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
                thumbColor={preferences.restDayReminders ? colors.neutral.text : colors.neutral.secondary}
              />
            </View>
          </View>
        </View>

        {/* Recovery & Performance */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recovery & Performance</Text>
            </View>
            <SettingsRow
              label="Recovery Focus"
              value={preferences.recoveryFocus}
              onPress={handleRecoveryFocus}
              isLast={true}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <SelectionModal
        visible={modalVisible === 'preferredTime'}
        onClose={() => setModalVisible(null)}
        title="Preferred Time Slot"
        options={timeSlotOptions}
        selectedValue={preferences.preferredTimeSlot}
        onSelect={(value) => setPreferences(prev => ({ ...prev, preferredTimeSlot: value }))}
      />

      <SelectionModal
        visible={modalVisible === 'weeklyHours'}
        onClose={() => setModalVisible(null)}
        title="Max Weekly Hours"
        options={weeklyHoursOptions}
        selectedValue={preferences.maxWeeklyHours}
        onSelect={(value) => setPreferences(prev => ({ ...prev, maxWeeklyHours: value }))}
      />

      <SelectionModal
        visible={modalVisible === 'trainingIntensity'}
        onClose={() => setModalVisible(null)}
        title="Training Intensity"
        options={trainingIntensityOptions}
        selectedValue={preferences.trainingIntensity}
        onSelect={(value) => setPreferences(prev => ({ ...prev, trainingIntensity: value }))}
      />

      <SelectionModal
        visible={modalVisible === 'recoveryFocus'}
        onClose={() => setModalVisible(null)}
        title="Recovery Focus"
        options={recoveryFocusOptions}
        selectedValue={preferences.recoveryFocus}
        onSelect={(value) => setPreferences(prev => ({ ...prev, recoveryFocus: value }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },

  sectionContainer: {
    marginBottom: spacing[8],
    marginHorizontal: spacing[4],
  },

  cardContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },

  switchLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[4],
  },
});