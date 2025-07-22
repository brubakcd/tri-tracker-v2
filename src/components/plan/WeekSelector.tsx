import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Week {
  number: number;
  phase: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface WeekSelectorProps {
  weeks: Week[];
  currentWeek: number;
  selectedWeek: number;
  onWeekSelect: (weekNumber: number) => void;
}

export default function WeekSelector({ weeks, currentWeek, selectedWeek, onWeekSelect }: WeekSelectorProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCurrentWeekPress = () => {
    onWeekSelect(currentWeek);
    // Scroll to current week
    const currentWeekIndex = currentWeek - 1;
    scrollViewRef.current?.scrollTo({
      x: currentWeekIndex * 78, // Card width (70) + margin (8)
      animated: true,
    });
  };

  const getPhaseColors = (phase: string) => {
    switch (phase) {
      case 'Base Building':
        return { 
          bg: '#F8FAFC', 
          border: '#E2E8F0', 
          text: '#475569',
          accent: '#64748B'
        };
      case 'Build Phase':
        return { 
          bg: '#FFFBF5', 
          border: '#FED7AA', 
          text: '#92400E',
          accent: '#F59E0B'
        };
      case 'Peak & Taper':
        return { 
          bg: '#FAF5FF', 
          border: '#E9D5FF', 
          text: '#7C2D12',
          accent: '#A855F7'
        };
      default:
        return { 
          bg: '#F9FAFB', 
          border: '#E5E7EB', 
          text: '#6B7280',
          accent: '#9CA3AF'
        };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Training Weeks</Text>
        {selectedWeek !== currentWeek && (
          <TouchableOpacity style={styles.currentWeekButton} onPress={handleCurrentWeekPress}>
            <Ionicons name="calendar-outline" size={12} color="#007AFF" />
            <Text style={styles.currentWeekText}>Week {currentWeek}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.scrollWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
          decelerationRate="fast"
          snapToInterval={78}
          snapToAlignment="start"
        >
          {weeks.map((week) => {
            const phaseColors = getPhaseColors(week.phase);
            const isSelected = week.number === selectedWeek;
            const isCurrent = week.number === currentWeek;
            const isCompleted = week.isCompleted;
            
            return (
              <TouchableOpacity
                key={week.number}
                style={[
                  styles.weekItem,
                  {
                    backgroundColor: isSelected ? '#007AFF15' : phaseColors.bg,
                    borderColor: isSelected ? '#007AFF' : phaseColors.border,
                  },
                  isSelected && styles.weekItemSelected,
                ]}
                onPress={() => onWeekSelect(week.number)}
                activeOpacity={0.7}
              >
                <View style={styles.weekContent}>
                  {/* Status indicator at top right */}
                  {isCompleted && (
                    <View style={styles.statusContainer}>
                      <View style={styles.completedBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                      </View>
                    </View>
                  )}
                  {isCurrent && !isCompleted && (
                    <View style={styles.statusContainer}>
                      <View style={[styles.currentBadge, { backgroundColor: '#007AFF' }]}>
                        <View style={styles.currentDot} />
                      </View>
                    </View>
                  )}
                  
                  {/* Week number centered */}
                  <View style={styles.weekNumberContainer}>
                    <Text
                      style={[
                        styles.weekNumber,
                        { color: isSelected ? '#007AFF' : phaseColors.text }
                      ]}
                    >
                      {week.number}
                    </Text>
                  </View>
                  
                  {/* Phase name at bottom */}
                  <View style={styles.weekPhaseContainer}>
                    <Text
                      style={[
                        styles.weekPhase,
                        { color: isSelected ? '#007AFF' : phaseColors.text }
                      ]}
                      numberOfLines={2}
                    >
                      {week.phase.replace(' & ', '\n& ')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  currentWeekButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF30',
  },

  currentWeekText: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 3,
  },

  scrollWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  scrollView: {
    paddingLeft: 12,
  },

  scrollContainer: {
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },

  weekItem: {
    borderRadius: 12,
    marginRight: 8,
    width: 70,
    height: 80,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  weekContent: {
    flex: 1,
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  weekItemSelected: {
    shadowOpacity: 0.12,
    shadowRadius: 12,
    transform: [{ scale: 1.05 }],
  },

  statusContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },

  completedBadge: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  currentBadge: {
    borderRadius: 6,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  currentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  weekNumberContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  weekNumber: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  weekPhaseContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 22,
    paddingBottom: 2,
  },

  weekPhase: {
    fontSize: 9,
    lineHeight: 11,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});