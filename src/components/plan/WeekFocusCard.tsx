import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WeekFocusCardProps {
  mainGoal: string;
  keyObjectives: string[];
  rationale: string;
  onMorePress?: () => void;
}

export default function WeekFocusCard({
  mainGoal,
  keyObjectives,
  rationale,
  onMorePress,
}: WeekFocusCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.objectivesSection}>
          <Text style={styles.mainGoal}>{mainGoal}</Text>
          {keyObjectives.map((objective, index) => (
            <View key={index} style={styles.objectiveRow}>
              <View style={styles.bullet} />
              <Text style={styles.objectiveText}>{objective}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.insightSection}>
        <View style={styles.insightHeader}>
          <View style={styles.insightTitleRow}>
            <Ionicons name="bulb-outline" size={16} color="rgba(255,255,255,0.75)" />
            <Text style={styles.insightTitle}>WEEK INSIGHT</Text>
          </View>
          {onMorePress && (
            <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
              <Text style={styles.moreText}>More</Text>
              <Ionicons name="chevron-forward" size={12} color="#60A5FA" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.insightText}>{rationale}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },

  mainCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  objectivesSection: {
    marginBottom: 4,
  },

  mainGoal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
    lineHeight: 22,
  },

  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
    marginTop: 6,
    marginRight: 10,
  },

  objectiveText: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
    flex: 1,
  },

  insightSection: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  insightTitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 6,
    textTransform: 'uppercase',
  },

  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreText: {
    fontSize: 12,
    color: '#5AC8FA',
    fontWeight: '500',
    marginRight: 4,
  },

  insightText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
});