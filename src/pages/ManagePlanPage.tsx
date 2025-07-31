import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader, SettingsRow } from '../components/ui';

export default function ManagePlanPage() {
  // Mock user data - in real app this would come from user state/API
  const userData = {
    plan: {
      title: "Summer Olympic Triathlon",
      location: "Santa Barbara, CA"
    },
    race: {
      type: "Olympic Triathlon",
      distance: "Olympic Distance", 
      date: "July 15, 2024",
      goalTime: "2:30:00",
      priority: "A-Race",
      swimGoal: "30:00",
      bikeGoal: "1:10:00",
      runGoal: "45:00"
    },
    training: {
      daysPerWeek: 5,
      availableDays: ["Mon", "Tue", "Thu", "Fri", "Sat"],
      restDays: ["Wed", "Sun"],
      longWorkoutDay: "Saturday",
      preferredTime: "Morning (6-8 AM)",
      startDate: "January 8, 2024",
      endDate: "July 10, 2024",
      volume: "Moderate",
      difficulty: "Intermediate",
      weeklyHours: "8-10 hours"
    },
    fitness: {
      swimming: {
        level: "Intermediate",
        experience: "3 years",
        pace100m: "1:45",
        maxDistance: "2000m"
      },
      cycling: {
        level: "Advanced",
        experience: "5 years",
        ftp: "285W",
        maxDistance: "100km"
      },
      running: {
        level: "Intermediate",
        experience: "4 years",
        pace5k: "5:30/km",
        maxDistance: "21km"
      }
    },
    health: {
      generalHealth: "Excellent",
      injuries: {
        current: "None",
        previous: "Left knee strain (2022) - fully recovered",
        notes: "Avoid high-impact running on consecutive days"
      },
      medications: "None",
      allergies: "Seasonal (pollen)",
      sleepHours: "7-8 hours",
      stressLevel: "Low"
    },
    equipment: {
      pool: {
        access: "3x per week",
        type: "25m indoor pool",
        location: "Local gym"
      },
      bike: {
        type: "Road bike + Smart trainer",
        brand: "Trek Domane SL5",
        maintenance: "Recently serviced"
      },
      running: {
        shoes: "Brooks Ghost 14",
        surface: "Mixed (road/trail)",
        treadmill: "Available at gym"
      },
      technology: ["Garmin Forerunner 945", "Wahoo KICKR", "Heart rate monitor"],
      gear: ["Wetsuit (Zone3)", "Tri suit", "Aero helmet", "Cycling shoes", "Running shoes"]
    }
  };

  const handlePlanDetails = () => {
    console.log('Edit plan details pressed');
  };

  const handleRaceInfo = () => {
    console.log('Edit race information pressed');
  };

  const handleTrainingSchedule = () => {
    console.log('Edit training schedule pressed');
  };

  const handleTrainingIntensity = () => {
    console.log('Edit training intensity pressed');
  };

  const handlePlanTimeline = () => {
    console.log('Edit plan timeline pressed');
  };

  const handleFitnessAssessment = () => {
    console.log('Edit fitness assessment pressed');
  };

  const handleHealthLimitations = () => {
    console.log('Edit health limitations pressed');
  };

  const handleEquipmentAccess = () => {
    console.log('Edit equipment access pressed');
  };

  const handleLongWorkoutDay = () => {
    console.log('Edit long workout day pressed');
  };

  const handleRestDays = () => {
    console.log('Edit rest days pressed');
  };

  const handleWeeklyVolume = () => {
    console.log('Edit weekly volume pressed');
  };

  const handleSwimmingFitness = () => {
    console.log('Edit swimming fitness pressed');
  };

  const handleCyclingFitness = () => {
    console.log('Edit cycling fitness pressed');
  };

  const handleRunningFitness = () => {
    console.log('Edit running fitness pressed');
  };

  const handleInjuries = () => {
    console.log('Edit injuries pressed');
  };

  const handleGeneralHealth = () => {
    console.log('Edit general health pressed');
  };

  const handleRaceGoals = () => {
    console.log('Edit race goals pressed');
  };

  const handleSwimGear = () => {
    console.log('Edit swim gear pressed');
  };

  const handleBikeGear = () => {
    console.log('Edit bike gear pressed');
  };

  const handleRunGear = () => {
    console.log('Edit run gear pressed');
  };

  const handleTechnology = () => {
    console.log('Edit technology pressed');
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Manage Plan" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan Details Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Plan Details</Text>
            </View>
            <SettingsRow
              label="Plan Title"
              value={userData.plan.title}
              onPress={handlePlanDetails}
            />
            <SettingsRow
              label="Location"
              value={userData.plan.location}
              onPress={handlePlanDetails}
              isLast={true}
            />
          </View>
        </View>

        {/* Race Information Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Race Information</Text>
            </View>
            <SettingsRow
              label="Race Type"
              value={userData.race.type}
              onPress={handleRaceInfo}
            />
            <SettingsRow
              label="Race Date"
              value={userData.race.date}
              onPress={handleRaceInfo}
            />
            <SettingsRow
              label="Plan Start Date"
              value={userData.training.startDate}
              onPress={handlePlanTimeline}
            />
            <SettingsRow
              label="Race Goals"
              value={`Overall: ${userData.race.goalTime}`}
              onPress={handleRaceGoals}
              isLast={true}
            />
          </View>
        </View>

        {/* Training Schedule Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Training Schedule</Text>
            </View>
            <SettingsRow
              label="Training Schedule"
              value={`${userData.training.daysPerWeek} days per week`}
              onPress={handleTrainingSchedule}
            />
            <SettingsRow
              label="Long Workout Day"
              value={userData.training.longWorkoutDay}
              onPress={handleLongWorkoutDay}
            />
            <SettingsRow
              label="Rest Days"
              value={userData.training.restDays.join(', ')}
              onPress={handleRestDays}
            />
            <SettingsRow
              label="Weekly Volume"
              value={userData.training.weeklyHours}
              onPress={handleWeeklyVolume}
            />
            <SettingsRow
              label="Training Intensity"
              value={userData.training.volume}
              onPress={handleTrainingIntensity}
              isLast={true}
            />
          </View>
        </View>

        {/* Fitness Assessment Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Fitness Assessment</Text>
            </View>
            <SettingsRow
              label="Swimming Fitness"
              value={userData.fitness.swimming.level}
              onPress={handleSwimmingFitness}
            />
            <SettingsRow
              label="Cycling Fitness"
              value={userData.fitness.cycling.level}
              onPress={handleCyclingFitness}
            />
            <SettingsRow
              label="Running Fitness"
              value={userData.fitness.running.level}
              onPress={handleRunningFitness}
              isLast={true}
            />
          </View>
        </View>

        {/* Health & Limitations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Health & Limitations</Text>
            </View>
            <SettingsRow
              label="General Health"
              value={userData.health.generalHealth}
              onPress={handleGeneralHealth}
            />
            <SettingsRow
              label="Injuries & Notes"
              value={userData.health.injuries.current === "None" ? "No current injuries" : userData.health.injuries.current}
              onPress={handleInjuries}
              isLast={true}
            />
          </View>
        </View>

        {/* Equipment & Access Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Equipment & Access</Text>
            </View>
            <SettingsRow
              label="Swimming Gear"
              value={`${userData.equipment.pool.access} • ${userData.equipment.pool.type}`}
              onPress={handleSwimGear}
            />
            <SettingsRow
              label="Cycling Gear"
              value={userData.equipment.bike.brand}
              onPress={handleBikeGear}
            />
            <SettingsRow
              label="Running Gear"
              value={userData.equipment.running.shoes}
              onPress={handleRunGear}
            />
            <SettingsRow
              label="Technology"
              value={`${userData.equipment.technology.length} devices`}
              onPress={handleTechnology}
              isLast={true}
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

  // Section Container
  sectionContainer: {
    marginBottom: spacing[8],
    marginHorizontal: spacing[4],
  },

  // Card Header
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

  // Card Container
  cardContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

});