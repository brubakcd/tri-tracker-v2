import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';

export default function ManagePlanPage() {
  // Mock user data - in real app this would come from user state/API
  const userData = {
    race: {
      name: "Summer Olympic Triathlon",
      location: "Santa Barbara, CA",
      distance: "Olympic Distance",
      date: "July 15, 2024",
      goalTime: "2:30:00",
      priority: "A-Race"
    },
    training: {
      daysPerWeek: 5,
      availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      longWorkoutDay: "Saturday",
      startDate: "January 8, 2024",
      volume: "Moderate",
      difficulty: "Intermediate"
    },
    fitness: {
      swimmingLevel: "Intermediate",
      cyclingLevel: "Advanced",
      runningLevel: "Intermediate",
      injuries: "Previous knee injury (2022) - fully recovered",
      healthStatus: "Excellent"
    },
    equipment: {
      poolAccess: "3x per week",
      gymAccess: "Daily",
      bike: "Road bike + Trainer",
      gear: ["Heart Rate Monitor", "Wetsuit", "Running Watch"]
    }
  };

  const handleEditSection = (section: string) => {
    // TODO: Navigate to corresponding onboarding page in edit mode
    console.log(`Edit ${section} pressed`);
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Manage Plan" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Race Information Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleEditSection('race')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Race Information</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.neutral.secondary} />
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Race Name</Text>
            <Text style={styles.detailValue}>{userData.race.name}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{userData.race.location}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={styles.detailValue}>{userData.race.distance}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Race Date</Text>
            <Text style={styles.detailValue}>{userData.race.date}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Goal Time</Text>
            <Text style={styles.detailValue}>{userData.race.goalTime}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Priority</Text>
            <Text style={styles.detailValue}>{userData.race.priority}</Text>
          </View>
        </TouchableOpacity>

        {/* Training Preferences Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleEditSection('training')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Training Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.neutral.secondary} />
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Days Per Week</Text>
            <Text style={styles.detailValue}>{userData.training.daysPerWeek} days</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Available Days</Text>
            <Text style={styles.detailValue}>{userData.training.availableDays.join(', ')}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Long Workout Day</Text>
            <Text style={styles.detailValue}>{userData.training.longWorkoutDay}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan Start Date</Text>
            <Text style={styles.detailValue}>{userData.training.startDate}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Training Volume</Text>
            <Text style={styles.detailValue}>{userData.training.volume}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difficulty Level</Text>
            <Text style={styles.detailValue}>{userData.training.difficulty}</Text>
          </View>
        </TouchableOpacity>

        {/* Fitness & Health Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleEditSection('fitness')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Fitness & Health</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.neutral.secondary} />
          </View>
          
          <View style={styles.abilitySection}>
            <Text style={styles.sectionSubtitle}>Current Abilities</Text>
            
            <View style={styles.abilityRow}>
              <View style={styles.abilityItem}>
                <Ionicons name="water" size={16} color={colors.disciplines.swim} />
                <Text style={styles.abilityText}>Swimming</Text>
              </View>
              <Text style={styles.abilityLevel}>{userData.fitness.swimmingLevel}</Text>
            </View>
            
            <View style={styles.abilityRow}>
              <View style={styles.abilityItem}>
                <Ionicons name="bicycle" size={16} color={colors.disciplines.bike} />
                <Text style={styles.abilityText}>Cycling</Text>
              </View>
              <Text style={styles.abilityLevel}>{userData.fitness.cyclingLevel}</Text>
            </View>
            
            <View style={styles.abilityRow}>
              <View style={styles.abilityItem}>
                <Ionicons name="walk" size={16} color={colors.disciplines.run} />
                <Text style={styles.abilityText}>Running</Text>
              </View>
              <Text style={styles.abilityLevel}>{userData.fitness.runningLevel}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Injuries/Limitations</Text>
            <Text style={styles.detailValue}>{userData.fitness.injuries}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Health Status</Text>
            <Text style={styles.detailValue}>{userData.fitness.healthStatus}</Text>
          </View>
        </TouchableOpacity>

        {/* Equipment & Access Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleEditSection('equipment')}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Equipment & Access</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.neutral.secondary} />
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pool Access</Text>
            <Text style={styles.detailValue}>{userData.equipment.poolAccess}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gym Access</Text>
            <Text style={styles.detailValue}>{userData.equipment.gymAccess}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bike Setup</Text>
            <Text style={styles.detailValue}>{userData.equipment.bike}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Equipment Owned</Text>
            <Text style={styles.detailValue}>{userData.equipment.gear.join(', ')}</Text>
          </View>
        </TouchableOpacity>
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

  // Card Styles
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

  // Detail Row Styles
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

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: -spacing[5],
    marginLeft: 0,
  },

  // Ability Section (for Fitness card)
  abilitySection: {
    marginBottom: spacing[3],
  },

  sectionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing[3],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  abilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },

  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  abilityText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    fontWeight: typography.weights.medium,
  },

  abilityLevel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    fontWeight: typography.weights.medium,
  },
});