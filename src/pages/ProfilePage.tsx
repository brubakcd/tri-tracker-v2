import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Heading1, Heading3, BodyText } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import { colors, spacing, typography } from '../styles/tokens';
import { RootStackParamList } from '../../App';

type ProfileStackParamList = {
  Profile: undefined;
};

type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;
type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;
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
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.profilePicture}>
              <Text style={styles.initials}>CB</Text>
            </View>
            <Heading1 style={styles.name}>Chris Brown</Heading1>
            <BodyText style={styles.email}>chris.brown@email.com</BodyText>
          </View>

          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Account Settings</Heading3>
            <View style={styles.settingItem}>
              <BodyText>Personal Information</BodyText>
            </View>
            <View style={styles.settingItem}>
              <BodyText>Training Preferences</BodyText>
            </View>
            <View style={styles.settingItem}>
              <BodyText>Notifications</BodyText>
            </View>
          </View>

          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Training Stats</Heading3>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24</Text>
                <BodyText style={styles.statLabel}>Workouts Completed</BodyText>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>156</Text>
                <BodyText style={styles.statLabel}>Total Hours</BodyText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Support</Heading3>
            <View style={styles.settingItem}>
              <BodyText>Help Center</BodyText>
            </View>
            <View style={styles.settingItem}>
              <BodyText>Contact Support</BodyText>
            </View>
            <View style={styles.settingItem}>
              <BodyText>About</BodyText>
            </View>
          </View>

          <View style={styles.signOutSection}>
            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="outline"
              size="large"
              style={styles.signOutButton}
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
  
  content: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing[8],
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
    marginBottom: spacing[1],
    textAlign: 'center',
  },

  email: {
    color: colors.neutral.secondary,
    textAlign: 'center',
  },

  section: {
    marginBottom: spacing[6],
  },

  sectionTitle: {
    marginBottom: spacing[4],
    color: colors.neutral.text,
  },

  settingItem: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.neutral.cards,
    borderRadius: 12,
    marginBottom: spacing[2],
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[3],
  },

  statItem: {
    flex: 1,
    padding: spacing[4],
    backgroundColor: colors.neutral.cards,
    borderRadius: 12,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    textAlign: 'center',
  },

  signOutSection: {
    marginTop: spacing[2],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  signOutButton: {
    marginTop: spacing[2],
  },
});