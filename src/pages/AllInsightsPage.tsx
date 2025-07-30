import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DailyInsights } from '../components/insights';
import { colors, spacing } from '../styles/tokens';

// Type definitions for navigation
type InsightsStackParamList = {
  InsightsHome: undefined;
  AllInsights: {
    insights: Array<{
      id: string;
      date: Date;
      insights: Array<{
        type: 'performance' | 'progress' | 'achievement' | 'recommendation';
        title: string;
        message: string;
        icon: string;
      }>;
    }>;
  };
  Profile: undefined;
};

type AllInsightsNavigationProp = StackNavigationProp<InsightsStackParamList, 'AllInsights'>;
type AllInsightsRouteProp = RouteProp<InsightsStackParamList, 'AllInsights'>;

interface AllInsightsPageProps {
  navigation: AllInsightsNavigationProp;
  route: AllInsightsRouteProp;
}

export default function AllInsightsPage({ route }: AllInsightsPageProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const { insights } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DailyInsights 
          insights={insights} 
          showLimited={false}
        />
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
  
  content: {
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
});