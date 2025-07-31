import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';

export default function AboutPage() {
  const appVersion = '2.1.0';
  const buildNumber = '42';

  const handleWebsite = () => {
    Linking.openURL('https://tri-tracker.com');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://tri-tracker.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://tri-tracker.com/terms');
  };

  const handleLicenses = () => {
    console.log('View licenses pressed');
  };

  const handleRateApp = () => {
    console.log('Rate app pressed');
  };

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Head Coach',
      credential: 'USAT Level II Certified'
    },
    {
      name: 'Mike Chen',
      role: 'Lead Developer',
      credential: 'Former Pro Triathlete'
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Sports Science Advisor',
      credential: 'PhD Exercise Physiology'
    },
    {
      name: 'James Wilson',
      role: 'UX Designer',
      credential: 'Ironman Finisher'
    }
  ];

  const features = [
    'AI-powered training plans',
    'Real-time performance analytics',
    'Multi-sport workout tracking',
    'Progressive overload optimization',
    'Recovery recommendations',
    'Race day preparation'
  ];

  return (
    <View style={styles.container}>
      <PageHeader title="About Tri-Tracker" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Info */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.appHeader}>
              <View style={styles.appIcon}>
                <Text style={styles.appIconText}>TT</Text>
              </View>
              <View style={styles.appInfo}>
                <Text style={styles.appName}>Tri-Tracker</Text>
                <Text style={styles.appTagline}>Intelligent Triathlon Training</Text>
                <Text style={styles.appVersion}>Version {appVersion} ({buildNumber})</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Our Mission</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.missionText}>
                Tri-Tracker was built by triathletes, for triathletes. We believe that every athlete deserves personalized training that adapts to their unique goals, schedule, and abilities.
              </Text>
              <Text style={styles.missionText}>
                Our AI-powered platform combines decades of coaching expertise with cutting-edge sports science to help you achieve your triathlon goals, whether it's your first sprint distance or your next Ironman PR.
              </Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>What We Offer</Text>
            </View>
            <View style={styles.cardContent}>
              {features.map((feature, index) => (
                <View key={feature} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.neutral.text} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Team */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Our Team</Text>
            </View>
            <View style={styles.cardContent}>
              {teamMembers.map((member, index) => (
                <View key={member.name} style={styles.teamMember}>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                    <Text style={styles.memberCredential}>{member.credential}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Links */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>More Information</Text>
            </View>
            
            <TouchableOpacity style={styles.linkRow} onPress={handleWebsite}>
              <View style={styles.linkContent}>
                <Ionicons name="globe-outline" size={20} color={colors.neutral.text} />
                <Text style={styles.linkText}>Visit our website</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.linkRow} onPress={handlePrivacyPolicy}>
              <View style={styles.linkContent}>
                <Ionicons name="shield-outline" size={20} color={colors.neutral.text} />
                <Text style={styles.linkText}>Privacy Policy</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.linkRow} onPress={handleTermsOfService}>
              <View style={styles.linkContent}>
                <Ionicons name="document-text-outline" size={20} color={colors.neutral.text} />
                <Text style={styles.linkText}>Terms of Service</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.linkRow} onPress={handleLicenses}>
              <View style={styles.linkContent}>
                <Ionicons name="library-outline" size={20} color={colors.neutral.text} />
                <Text style={styles.linkText}>Open Source Licenses</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Rate App */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.rateButton} onPress={handleRateApp}>
            <View style={styles.rateContent}>
              <Ionicons name="star-outline" size={24} color={colors.neutral.text} />
              <View style={styles.rateText}>
                <Text style={styles.rateTitle}>Enjoying Tri-Tracker?</Text>
                <Text style={styles.rateDescription}>Rate us on the App Store</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={styles.sectionContainer}>
          <Text style={styles.copyright}>
            © 2024 Tri-Tracker. All rights reserved.
          </Text>
          <Text style={styles.copyright}>
            Made with ❤️ by athletes, for athletes.
          </Text>
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
    marginBottom: spacing[6],
    marginHorizontal: spacing[4],
  },

  cardContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[5],
  },

  appIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.text,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appIconText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.background,
  },

  appInfo: {
    marginLeft: spacing[4],
    flex: 1,
  },

  appName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  appTagline: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },

  appVersion: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },

  cardHeader: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  cardContent: {
    padding: spacing[4],
  },

  missionText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    lineHeight: typography.sizes.base * 1.5,
    marginBottom: spacing[4],
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },

  featureText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    marginLeft: spacing[3],
    flex: 1,
  },

  teamMember: {
    marginBottom: spacing[4],
  },

  memberInfo: {
    flex: 1,
  },

  memberName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  memberRole: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },

  memberCredential: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },

  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  linkText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    marginLeft: spacing[3],
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[4],
  },

  rateButton: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.base,
  },

  rateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rateText: {
    marginLeft: spacing[3],
    flex: 1,
  },

  rateTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  rateDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },

  copyright: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
});