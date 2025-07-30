import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, BodyTextLarge, CaptionText } from '../ui/Typography';
import Card from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../styles/tokens';

interface DailyInsight {
  id: string;
  date: Date;
  insights: {
    type: 'performance' | 'progress' | 'achievement' | 'recommendation';
    title: string;
    message: string;
    icon: string;
  }[];
}

interface DailyInsightsProps {
  insights: DailyInsight[];
  showLimited?: boolean;
  onViewAllPress?: () => void;
}

export default function DailyInsights({ insights, showLimited = false, onViewAllPress }: DailyInsightsProps) {
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'performance': return colors.system.blue;
      case 'progress': return colors.system.green;
      case 'achievement': return colors.system.orange;
      case 'recommendation': return colors.system.purple;
      default: return colors.neutral.secondary;
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Get limited insights if showLimited is true
  const displayInsights = showLimited ? insights.slice(0, 2) : insights; // Show first 2 days for limited view
  
  // Calculate total number of insights for the button
  const totalInsights = insights.reduce((total, day) => total + day.insights.length, 0);

  return (
    <Card style={styles.container}>
      <View style={styles.contentContainer}>
        {displayInsights.map((dayInsight, dayIndex) => (
          <View key={dayInsight.id} style={styles.daySection}>
            {/* Date Header */}
            <View style={styles.dateHeader}>
              <View style={styles.dateLine} />
              <Text style={styles.dateText}>{formatDate(dayInsight.date)}</Text>
              <View style={styles.dateLine} />
            </View>

            {/* Insights for this day */}
            <View style={styles.insightsContainer}>
              {dayInsight.insights.map((insight, insightIndex) => (
                <View key={insightIndex} style={styles.insightCard}>
                  <View style={styles.insightHeader}>
                    <View style={[
                      styles.insightIcon, 
                      { backgroundColor: getInsightColor(insight.type) + '15' }
                    ]}>
                      <Ionicons 
                        name={insight.icon as any} 
                        size={16} 
                        color={getInsightColor(insight.type)} 
                      />
                    </View>
                    <BodyText style={styles.insightTitle}>{insight.title}</BodyText>
                  </View>
                  <CaptionText style={styles.insightMessage}>
                    {insight.message}
                  </CaptionText>
                </View>
              ))}
            </View>
          </View>
        ))}
        
        {/* View All Button - only show when limited */}
        {showLimited && onViewAllPress && (
          <TouchableOpacity style={styles.viewAllButton} onPress={onViewAllPress}>
            <View style={styles.viewAllContent}>
              <BodyText style={styles.viewAllText}>View All Insights</BodyText>
              <View style={styles.viewAllBadge}>
                <CaptionText style={styles.viewAllBadgeText}>{totalInsights}</CaptionText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.system.blue} />
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing[4],
    padding: 0,
    overflow: 'hidden',
  },

  contentContainer: {
    padding: spacing[4],
  },

  daySection: {
    marginBottom: spacing[5],
  },

  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },

  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral.separator,
  },

  dateText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.secondary,
    paddingHorizontal: spacing[3],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  insightsContainer: {
    gap: spacing[3],
  },

  insightCard: {
    backgroundColor: colors.neutral.background,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: colors.neutral.separator,
  },

  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[2],
  },

  insightTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    flex: 1,
  },

  insightMessage: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: 18,
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing[3],
    marginTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  viewAllContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  viewAllText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.system.blue,
    marginRight: spacing[2],
  },

  viewAllBadge: {
    backgroundColor: colors.system.blue,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewAllBadgeText: {
    fontSize: typography.sizes.xs - 1,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.cards,
  },
});