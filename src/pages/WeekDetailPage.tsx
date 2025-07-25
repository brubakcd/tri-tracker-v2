import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/tokens';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function WeekDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { weekNumber, phase, description, workouts } = route.params as any;

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.neutral.text} />
          <Text style={styles.backText}>Plan Overview</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Week Title */}
        <View style={styles.weekHeader}>
          <Text style={styles.weekTitle}>Week {weekNumber}</Text>
          <Text style={styles.weekPhase}>{phase}</Text>
          <Text style={styles.weekDescription}>{description}</Text>
        </View>

        {/* Placeholder for workout content */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Week workout content will go here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  
  backText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: spacing[8],
  },
  
  weekHeader: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[4],
  },
  
  weekTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },
  
  weekPhase: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing[2],
  },
  
  weekDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  
  placeholder: {
    padding: spacing[4],
    margin: spacing[4],
    backgroundColor: colors.system.gray6,
    borderRadius: 8,
  },
  
  placeholderText: {
    fontSize: typography.sizes.sm,
    color: colors.system.gray,
    textAlign: 'center',
  },
});