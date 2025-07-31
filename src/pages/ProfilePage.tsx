import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Heading1, Heading3, BodyText } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { RootStackParamList } from '../../App';

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  TrainingPreferences: undefined;
  SubscriptionBilling: undefined;
  PushNotifications: undefined;
  EmailPreferences: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  About: undefined;
};

type RootNavigationProp = StackNavigationProp<RootStackParamList>;

interface ProfileProps {
  navigation: any;
  route?: any;
}

export default function ProfilePage({ navigation }: ProfileProps) {
  const rootNavigation = useNavigation<RootNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to top on tab press
  useEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;

    const unsubscribe = (parent as any).addListener('tabPress', () => {
      if (navigation.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignOut = () => {
    rootNavigation.navigate('SignOut');
  };

  const handlePersonalInfo = () => {
    navigation.navigate('PersonalInformation');
  };

  const handleTrainingPreferences = () => {
    navigation.navigate('TrainingPreferences');
  };

  const handleSubscriptionBilling = () => {
    navigation.navigate('SubscriptionBilling');
  };

  const handlePushNotifications = () => {
    navigation.navigate('PushNotifications');
  };

  const handleEmailPreferences = () => {
    navigation.navigate('EmailPreferences');
  };

  const handleHelpCenter = () => {
    navigation.navigate('HelpCenter');
  };

  const handleContactSupport = () => {
    navigation.navigate('ContactSupport');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
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