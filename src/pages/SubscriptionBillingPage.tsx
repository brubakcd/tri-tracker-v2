import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader, SettingsRow } from '../components/ui';

export default function SubscriptionBillingPage() {
  const subscriptionData = {
    plan: 'Pro Annual',
    status: 'Active',
    nextBilling: 'January 15, 2025',
    amount: '$79.99/year',
    paymentMethod: 'Visa ending in 4242',
    billingEmail: 'cole.bennett@email.com'
  };

  const handleChangePlan = () => {
    console.log('Change plan pressed');
  };

  const handlePaymentMethod = () => {
    console.log('Update payment method pressed');
  };

  const handleBillingHistory = () => {
    console.log('Billing history pressed');
  };

  const handleCancelSubscription = () => {
    console.log('Cancel subscription pressed');
  };

  const handleBillingEmail = () => {
    console.log('Update billing email pressed');
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Subscription & Billing" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Plan */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Current Plan</Text>
            </View>
            
            <View style={styles.planHighlight}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{subscriptionData.plan}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{subscriptionData.status}</Text>
                </View>
              </View>
              <Text style={styles.planAmount}>{subscriptionData.amount}</Text>
              <Text style={styles.nextBilling}>Next billing: {subscriptionData.nextBilling}</Text>
            </View>

            <View style={styles.divider} />

            <SettingsRow
              label="Change Plan"
              value="View available plans"
              onPress={handleChangePlan}
              isLast={true}
            />
          </View>
        </View>

        {/* Payment & Billing */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Payment & Billing</Text>
            </View>
            <SettingsRow
              label="Payment Method"
              value={subscriptionData.paymentMethod}
              onPress={handlePaymentMethod}
            />
            <SettingsRow
              label="Billing Email"
              value={subscriptionData.billingEmail}
              onPress={handleBillingEmail}
            />
            <SettingsRow
              label="Billing History"
              value="View past invoices"
              onPress={handleBillingHistory}
              isLast={true}
            />
          </View>
        </View>

        {/* Subscription Management */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Subscription Management</Text>
            </View>
            
            <TouchableOpacity style={styles.dangerRow} onPress={handleCancelSubscription}>
              <View style={styles.dangerContent}>
                <Ionicons name="warning-outline" size={20} color={colors.system.red} />
                <Text style={styles.dangerText}>Cancel Subscription</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Plan Features */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Pro Plan Features</Text>
            </View>
            
            <View style={styles.featuresContainer}>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.status.completed} />
                <Text style={styles.featureText}>Unlimited training plans</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.status.completed} />
                <Text style={styles.featureText}>Advanced analytics & insights</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.status.completed} />
                <Text style={styles.featureText}>AI-powered training recommendations</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.status.completed} />
                <Text style={styles.featureText}>Priority customer support</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.status.completed} />
                <Text style={styles.featureText}>Export workout data</Text>
              </View>
            </View>
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

  planHighlight: {
    backgroundColor: colors.neutral.separator + '20',
    marginHorizontal: spacing[4],
    padding: spacing[4],
    borderRadius: borderRadius.md,
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },

  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  planName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  statusBadge: {
    backgroundColor: colors.status.completed,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },

  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral.background,
  },

  planAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  nextBilling: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[4],
  },

  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },

  dangerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  dangerText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.system.red,
    marginLeft: spacing[3],
  },

  featuresContainer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
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
});