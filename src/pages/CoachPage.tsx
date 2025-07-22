import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Heading1, SecondaryText } from '../components/ui/Typography';
import { spacing } from '../styles/tokens';

export default function CoachPage() {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Heading1 style={styles.title}>AI Coach</Heading1>
          <SecondaryText>Insights and analytics to help you race faster, longer and stronger.</SecondaryText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    paddingTop: spacing[6],
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
  },
  
  header: {
    marginBottom: spacing[6],
  },
  
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: spacing[2],
  },
});