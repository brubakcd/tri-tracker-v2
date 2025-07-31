import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';

export default function PushNotificationsPage() {
  const [notifications, setNotifications] = useState({
    // Training Notifications
    workoutReminders: true,
    restDayReminders: true,
    weeklyPlanUpdates: false,
    trainingInsights: true,
    
    // Progress Notifications  
    goalAchievements: true,
    personalRecords: true,
    weeklyProgress: true,
    phaseTransitions: false,
    
    // System Notifications
    appUpdates: false,
    maintenanceAlerts: true,
    systemDowntime: true,
    
    // Social & Community
    followActivity: false,
    comments: false,
    challenges: false,
  });

  const handleToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const NotificationSwitch = ({ label, description, value, onToggle }: {
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
      <PageHeader title="Push Notifications" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Training Notifications */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Training Notifications</Text>
            </View>
            
            <NotificationSwitch
              label="Workout Reminders"
              description="Get notified 30 minutes before scheduled workouts"
              value={notifications.workoutReminders}
              onToggle={() => handleToggle('workoutReminders')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Rest Day Reminders"
              description="Gentle reminders to prioritize recovery"
              value={notifications.restDayReminders}
              onToggle={() => handleToggle('restDayReminders')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Weekly Plan Updates"
              description="New training plan available each week"
              value={notifications.weeklyPlanUpdates}
              onToggle={() => handleToggle('weeklyPlanUpdates')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Training Insights"
              description="AI-powered insights about your training"
              value={notifications.trainingInsights}
              onToggle={() => handleToggle('trainingInsights')}
            />
          </View>
        </View>

        {/* Progress Notifications */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Progress & Achievements</Text>
            </View>
            
            <NotificationSwitch
              label="Goal Achievements"
              description="Celebrate when you reach training milestones"
              value={notifications.goalAchievements}
              onToggle={() => handleToggle('goalAchievements')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Personal Records"
              description="New PRs and performance improvements"
              value={notifications.personalRecords}
              onToggle={() => handleToggle('personalRecords')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Weekly Progress"
              description="Summary of your week's training progress"
              value={notifications.weeklyProgress}
              onToggle={() => handleToggle('weeklyProgress')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Phase Transitions"
              description="Moving from base to build to peak phases"
              value={notifications.phaseTransitions}
              onToggle={() => handleToggle('phaseTransitions')}
            />
          </View>
        </View>

        {/* System Notifications */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>System & Updates</Text>
            </View>
            
            <NotificationSwitch
              label="App Updates"
              description="New features and improvements available"
              value={notifications.appUpdates}
              onToggle={() => handleToggle('appUpdates')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Maintenance Alerts"
              description="Scheduled maintenance and downtime"
              value={notifications.maintenanceAlerts}
              onToggle={() => handleToggle('maintenanceAlerts')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="System Status"
              description="Critical system updates and issues"
              value={notifications.systemDowntime}
              onToggle={() => handleToggle('systemDowntime')}
            />
          </View>
        </View>

        {/* Social Notifications */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Social & Community</Text>
            </View>
            
            <NotificationSwitch
              label="Follow Activity"
              description="Updates from athletes you follow"
              value={notifications.followActivity}
              onToggle={() => handleToggle('followActivity')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Comments"
              description="New comments on your activities"
              value={notifications.comments}
              onToggle={() => handleToggle('comments')}
            />
            <View style={styles.divider} />
            
            <NotificationSwitch
              label="Challenges"
              description="Invitations and challenge updates"
              value={notifications.challenges}
              onToggle={() => handleToggle('challenges')}
            />
          </View>
        </View>
      </ScrollView>
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