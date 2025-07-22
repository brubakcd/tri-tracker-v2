import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DashboardHeaderSimpleProps {
  userName?: string;
  onMorePress?: () => void;
  weeklyStats?: {
    completed: number;
    totalMinutes: number;
    remaining: number;
  };
}

export default function DashboardHeaderSimple({ userName = 'Cole', onMorePress, weeklyStats }: DashboardHeaderSimpleProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: 'moon-outline' };
    if (hour < 17) return { text: 'Good afternoon', icon: 'cafe-outline' };
    return { text: 'Good evening', icon: 'moon-outline' };
  };

  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.greetingRow}>
          <Ionicons name={greeting.icon as any} size={16} color="#6B7280" style={styles.icon} />
          <View>
            <Text style={styles.greetingText}>{greeting.text}, {userName}.</Text>
            <Text style={styles.subtitle}>Let's get to training</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weeklyStats?.completed || 0}</Text>
            <Text style={styles.statLabel}>COMPLETED</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weeklyStats?.totalMinutes || 0}</Text>
            <Text style={styles.statLabel}>TOTAL MIN</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weeklyStats?.remaining || 0}</Text>
            <Text style={styles.statLabel}>REMAINING</Text>
          </View>
        </View>
      </View>

      <View style={styles.aiInsight}>
        <View style={styles.aiHeader}>
          <View style={styles.aiTitleRow}>
            <Ionicons name="analytics-outline" size={16} color="rgba(255,255,255,0.75)" />
            <Text style={styles.aiTitle}>TRAINING INSIGHT</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <Text style={styles.moreText}>More</Text>
            <Ionicons name="chevron-forward" size={12} color="#60A5FA" />
          </TouchableOpacity>
        </View>
        <Text style={styles.aiText}>
          Your pacing in yesterday's tempo run was excellent. Heart rate stayed in Zone 4 for 87% of the session - perfect for race preparation.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
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
  
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  icon: {
    marginRight: 8,
  },
  
  greetingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  
  statLabel: {
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D1D1D6',
  },
  
  aiInsight: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  aiTitle: {
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
  
  aiText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
});