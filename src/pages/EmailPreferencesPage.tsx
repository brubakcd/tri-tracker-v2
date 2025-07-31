import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader, SettingsRow } from '../components/ui';
import { SelectionModal } from '../components/modals';

export default function EmailPreferencesPage() {
  const [emailSettings, setEmailSettings] = useState({
    // Training Emails
    weeklyTrainingSummary: true,
    workoutReminders: false,
    trainingTips: true,
    planUpdates: true,
    
    // Progress & Analytics
    monthlyProgress: true,
    goalReminders: true,
    performanceInsights: false,
    
    // Product Updates
    newFeatures: true,
    appUpdates: false,
    betaInvitations: false,
    
    // Marketing
    newsletters: false,
    partnerships: false,
    surveys: true,
    promotions: false,
  });

  const [emailFrequency, setEmailFrequency] = useState('Weekly');
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);

  const handleToggle = (key: string) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleEmailFrequency = () => {
    setShowFrequencyModal(true);
  };

  const emailFrequencyOptions = [
    { label: 'Daily', value: 'Daily', description: 'Get updates every day' },
    { label: 'Weekly', value: 'Weekly', description: 'Summary once a week' },
    { label: 'Bi-weekly', value: 'Bi-weekly', description: 'Every two weeks' },
    { label: 'Monthly', value: 'Monthly', description: 'Once a month' },
    { label: 'Never', value: 'Never', description: 'Turn off all emails' },
  ];

  const handleUnsubscribeAll = () => {
    console.log('Unsubscribe from all emails pressed');
  };

  const EmailSwitch = ({ label, description, value, onToggle }: {
    label: string;
    description?: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <View>
      <View style={styles.switchRow}>
        <View style={styles.switchContent}>
          <Text style={styles.switchLabel}>{label}</Text>
          {description && <Text style={styles.switchDescription}>{description}</Text>}
        </View>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.neutral.border, true: colors.neutral.text + '40' }}
          thumbColor={value ? colors.neutral.text : colors.neutral.secondary}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Email Preferences" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Email Settings */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Email Settings</Text>
            </View>
            <SettingsRow
              label="Email Frequency"
              value={emailFrequency}
              onPress={handleEmailFrequency}
              isLast={true}
            />
          </View>
        </View>

        {/* Training Emails */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Training & Workouts</Text>
            </View>
            
            <EmailSwitch
              label="Weekly Training Summary"
              description="Overview of your completed workouts and progress"
              value={emailSettings.weeklyTrainingSummary}
              onToggle={() => handleToggle('weeklyTrainingSummary')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Workout Reminders"
              description="Email reminders for upcoming scheduled workouts"
              value={emailSettings.workoutReminders}
              onToggle={() => handleToggle('workoutReminders')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Training Tips"
              description="Weekly tips and advice to improve your training"
              value={emailSettings.trainingTips}
              onToggle={() => handleToggle('trainingTips')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Plan Updates"
              description="Notifications when your training plan is updated"
              value={emailSettings.planUpdates}
              onToggle={() => handleToggle('planUpdates')}
            />
          </View>
        </View>

        {/* Progress & Analytics */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Progress & Analytics</Text>
            </View>
            
            <EmailSwitch
              label="Monthly Progress Report"
              description="Detailed monthly analysis of your training"
              value={emailSettings.monthlyProgress}
              onToggle={() => handleToggle('monthlyProgress')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Goal Reminders"
              description="Updates on your race goals and milestones"
              value={emailSettings.goalReminders}
              onToggle={() => handleToggle('goalReminders')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Performance Insights"
              description="AI-powered insights about your performance trends"
              value={emailSettings.performanceInsights}
              onToggle={() => handleToggle('performanceInsights')}
            />
          </View>
        </View>

        {/* Product Updates */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Product Updates</Text>
            </View>
            
            <EmailSwitch
              label="New Features"
              description="Learn about new features and improvements"
              value={emailSettings.newFeatures}
              onToggle={() => handleToggle('newFeatures')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="App Updates"
              description="Release notes and app update announcements"
              value={emailSettings.appUpdates}
              onToggle={() => handleToggle('appUpdates')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Beta Invitations"
              description="Early access to test new features"
              value={emailSettings.betaInvitations}
              onToggle={() => handleToggle('betaInvitations')}
            />
          </View>
        </View>

        {/* Marketing */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Marketing & Communication</Text>
            </View>
            
            <EmailSwitch
              label="Newsletters"
              description="General triathlon news and community updates"
              value={emailSettings.newsletters}
              onToggle={() => handleToggle('newsletters')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Partner Offers"
              description="Special offers from our training partners"
              value={emailSettings.partnerships}
              onToggle={() => handleToggle('partnerships')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Surveys"
              description="Help us improve with feedback surveys"
              value={emailSettings.surveys}
              onToggle={() => handleToggle('surveys')}
            />
            <View style={styles.divider} />
            
            <EmailSwitch
              label="Promotions"
              description="Discounts and special promotional offers"
              value={emailSettings.promotions}
              onToggle={() => handleToggle('promotions')}
            />
          </View>
        </View>

        {/* Unsubscribe */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Unsubscribe</Text>
            </View>
            <SettingsRow
              label="Unsubscribe from All Emails"
              value="Stop all email communication"
              onPress={handleUnsubscribeAll}
              isLast={true}
            />
          </View>
        </View>
      </ScrollView>

      {/* Email Frequency Modal */}
      <SelectionModal
        visible={showFrequencyModal}
        onClose={() => setShowFrequencyModal(false)}
        title="Email Frequency"
        options={emailFrequencyOptions}
        selectedValue={emailFrequency}
        onSelect={setEmailFrequency}
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

  switchContent: {
    flex: 1,
    marginRight: spacing[3],
  },

  switchLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  switchDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: typography.sizes.sm * 1.4,
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[4],
  },
});