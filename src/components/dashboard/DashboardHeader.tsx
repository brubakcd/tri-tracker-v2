import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Heading2, BodyText, CaptionText } from '../ui/Typography';
import Card from '../ui/Card';
import { colors, spacing } from '../../styles/tokens';

interface DashboardHeaderProps {
  userName: string;
  completedThisWeek?: number;
  totalMinutesThisWeek?: number;
  weeklyGoal?: number;
  aiInsight?: string;
}

export default function DashboardHeader({
  userName,
  completedThisWeek = 2,
  totalMinutesThisWeek = 140,
  weeklyGoal = 5,
  aiInsight = "Your pacing in yesterday's tempo run was excellent. Heart rate stayed in Zone 4 for 87% of the session - perfect for race preparation."
}: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good morning", icon: "sunny" };
    if (hour < 17) return { text: "Good afternoon", icon: "cafe" };
    return { text: "Good evening", icon: "moon" };
  };

  const greeting = getGreeting();
  const remaining = weeklyGoal - completedThisWeek;

  return (
    <Card style={styles.container} variant="elevated">
      {/* Main Header Content */}
      <View style={styles.mainContent}>
        <View style={styles.greetingSection}>
          <View style={styles.greetingRow}>
            <Ionicons 
              name={greeting.icon as any} 
              size={16} 
              color={colors.neutral.secondary} 
              style={styles.greetingIcon}
            />
            <Heading2 style={styles.greetingText}>
              {greeting.text}, {userName}.
            </Heading2>
          </View>
          <BodyText style={styles.subtitle}>Let's get to training</BodyText>
        </View>
        
        {/* Weekly Progress Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <BodyText style={styles.statValue}>{completedThisWeek}</BodyText>
            <CaptionText style={styles.statLabel}>COMPLETED</CaptionText>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <BodyText style={styles.statValue}>{totalMinutesThisWeek}</BodyText>
            <CaptionText style={styles.statLabel}>TOTAL MIN</CaptionText>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <BodyText style={styles.statValue}>{remaining}</BodyText>
            <CaptionText style={styles.statLabel}>REMAINING</CaptionText>
          </View>
        </View>
      </View>
      
      {/* AI Insight Section */}
      <View style={styles.aiInsightSection}>
        <View style={styles.aiInsightHeader}>
          <View style={styles.aiInsightTitleRow}>
            <Ionicons 
              name="chatbubble-ellipses" 
              size={14} 
              color="rgba(255, 255, 255, 0.7)" 
            />
            <CaptionText style={styles.aiInsightTitle}>TRAINING INSIGHT</CaptionText>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <BodyText style={styles.moreText}>More</BodyText>
            <Ionicons 
              name="chevron-forward" 
              size={12} 
              color={colors.system.blue} 
            />
          </TouchableOpacity>
        </View>
        <BodyText style={styles.aiInsightText}>{aiInsight}</BodyText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[6],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  
  mainContent: {
    padding: spacing[6],
    backgroundColor: colors.neutral.cards,
  },
  
  greetingSection: {
    marginBottom: spacing[4],
  },
  
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  
  greetingIcon: {
    marginRight: spacing[2],
  },
  
  greetingText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.neutral.text,
  },
  
  subtitle: {
    fontSize: 14,
    color: colors.neutral.secondary,
    marginLeft: spacing[6], // Align with greeting text after icon
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.background,
    borderRadius: 12,
    padding: spacing[4],
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },
  
  statLabel: {
    fontSize: 10,
    color: colors.neutral.secondary,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[2],
  },
  
  // AI Insight Section
  aiInsightSection: {
    backgroundColor: colors.neutral.text,
    padding: spacing[4],
  },
  
  aiInsightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  
  aiInsightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  aiInsightTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: spacing[1],
  },
  
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  moreText: {
    color: colors.system.blue,
    fontSize: 12,
    fontWeight: '500',
    marginRight: spacing[1],
  },
  
  aiInsightText: {
    color: colors.neutral.cards,
    fontSize: 14,
    lineHeight: 20,
  },
});