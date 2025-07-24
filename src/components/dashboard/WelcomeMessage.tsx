import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WelcomeMessageProps {
  userName?: string;
}

export default function WelcomeMessage({ userName = 'Cole' }: WelcomeMessageProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: 'sunny-outline' };
    if (hour < 17) return { text: 'Good afternoon', icon: 'partly-sunny-outline' };
    return { text: 'Good evening', icon: 'moon-outline' };
  };

  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.greetingRow}>
          <Ionicons name={greeting.icon as any} size={24} color="#007AFF" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>{greeting.text}, {userName}.</Text>
            <Text style={styles.subtitle}>Let's get to training</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
});