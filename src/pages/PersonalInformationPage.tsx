import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';
import Button from '../components/ui/Button';

export default function PersonalInformationPage() {
  // Mock user data - in real app this would come from user state/API
  const userData = {
    fullName: "Cole Bennett",
    email: "cole.bennett@email.com",
    age: 28,
    location: "San Francisco, CA"
  };

  const handleEdit = () => {
    // TODO: Navigate to edit personal information
    console.log('Edit personal information pressed');
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Personal Information" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailValue}>{userData.fullName}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{userData.email}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{userData.age} years old</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{userData.location}</Text>
          </View>
        </View>

        {/* Edit Button */}
        <View style={styles.editButtonContainer}>
          <Button
            title="Edit Information"
            onPress={handleEdit}
            variant="primary"
            size="large"
            style={styles.editButton}
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
    alignItems: 'flex-start',
    paddingVertical: spacing[3],
  },

  detailLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
    flex: 1,
  },

  detailValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
    flex: 2,
    textAlign: 'right',
  },

  // Divider (matching ManagePlanPage)
  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: -spacing[5],
    marginLeft: 0,
  },

  // Edit Button Section
  editButtonContainer: {
    marginHorizontal: spacing[4],
    marginTop: spacing[2],
  },

  editButton: {
    marginTop: spacing[2],
  },
});