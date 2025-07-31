import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Heading1, Heading3, BodyText } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { RootStackParamList } from '../../App';

type PlanStackParamList = {
  PlanOverview: undefined;
  PlanDetailOverview: undefined;
  WeeklyView: undefined;
  WeekDetail: {
    weekNumber: number;
    phase: string;
    description: string;
    workouts: any[];
  };
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  ManagePlan: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
};

type ProfileNavigationProp = StackNavigationProp<PlanStackParamList, 'Profile'>;
type ProfileRouteProp = RouteProp<PlanStackParamList, 'Profile'>;
type RootNavigationProp = StackNavigationProp<RootStackParamList>;

interface ProfileProps {
  navigation: ProfileNavigationProp;
  route: ProfileRouteProp;
}

export default function ProfilePage({ navigation }: ProfileProps) {
  const rootNavigation = useNavigation<RootNavigationProp>();

  const handleSignOut = () => {
    rootNavigation.navigate('SignOut');
  };

  const handlePersonalInfo = () => {
    navigation.navigate('PersonalInformation');
  };

  const handleTrainingPreferences = () => {
    console.log('Training preferences pressed');
  };

  const handleSubscriptionBilling = () => {
    console.log('Subscription & billing pressed');
  };

  const handlePushNotifications = () => {
    console.log('Push notifications pressed');
  };

  const handleEmailPreferences = () => {
    console.log('Email preferences pressed');
  };

  const handleHelpCenter = () => {
    console.log('Help center pressed');
  };

  const handleContactSupport = () => {
    console.log('Contact support pressed');
  };

  const handleAbout = () => {
    console.log('About pressed');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.profilePicture}>
            <Text style={styles.initials}>CB</Text>
          </View>
          <Text style={styles.name}>Cole Bennett</Text>
          <Text style={styles.email}>cole.bennett@email.com</Text>
        </View>

        {/* Account Settings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Account Settings</Text>
          </View>
          
          <TouchableOpacity style={styles.detailRow} onPress={handlePersonalInfo} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="person-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.detailRow} onPress={handleTrainingPreferences} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="fitness-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Training Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.detailRow} onPress={handleSubscriptionBilling} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="card-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Subscription & Billing</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
        </View>

        {/* Notifications Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notifications</Text>
          </View>
          
          <TouchableOpacity style={styles.detailRow} onPress={handlePushNotifications} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="notifications-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.detailRow} onPress={handleEmailPreferences} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="mail-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Email Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
        </View>

        {/* Support Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Support & Information</Text>
          </View>
          
          <TouchableOpacity style={styles.detailRow} onPress={handleHelpCenter} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.detailRow} onPress={handleContactSupport} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="chatbubble-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.detailRow} onPress={handleAbout} activeOpacity={0.7}>
            <View style={styles.settingItem}>
              <Ionicons name="information-circle-outline" size={20} color={colors.neutral.secondary} />
              <Text style={styles.settingText}>About Tri-Tracker</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="primary"
            size="large"
            style={styles.signOutButton}
          />
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
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },

  // Profile Header Card
  profileCard: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    alignItems: 'center',
    ...shadows.base,
  },

  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutral.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },

  initials: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.background,
  },

  name: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
    textAlign: 'center',
  },

  email: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    textAlign: 'center',
  },

  // Card Styles (matching ManagePlanPage)
  card: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    ...shadows.base,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  // Detail Row Styles (matching ManagePlanPage)
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
  },

  settingText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },

  // Divider (matching ManagePlanPage)
  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: -spacing[5],
    marginLeft: 0,
  },


  // Sign Out Section
  signOutContainer: {
    marginHorizontal: spacing[4],
    marginTop: spacing[2],
  },

  signOutButton: {
    marginTop: spacing[2],
  },
});