import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, CaptionText } from '../ui/Typography';
import Card from '../ui/Card';
import { colors, spacing } from '../../styles/tokens';

interface PersonalRecord {
  discipline: 'swim' | 'bike' | 'run' | string;
  metric: string;
  value: string;
  date: string;
  improvement?: string;
}

interface PersonalRecordsProps {
  records: PersonalRecord[];
}

export default function PersonalRecords({ records }: PersonalRecordsProps) {
  const getIcon = (discipline: string): keyof typeof Ionicons.glyphMap => {
    switch (discipline) {
      case 'swim': return 'water';
      case 'bike': return 'bicycle';
      case 'run': return 'walk';
      default: return 'fitness';
    }
  };
  
  const getColor = (discipline: string): string => {
    switch (discipline) {
      case 'swim': return colors.disciplines.swim;
      case 'bike': return colors.disciplines.bike;
      case 'run': return colors.disciplines.run;
      default: return colors.neutral.secondary;
    }
  };
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={16} color={colors.system.yellow} />
        <BodyText style={styles.title}>Personal Records</BodyText>
      </View>
      
      {records.map((record, index) => (
        <View key={index} style={[styles.record, index === records.length - 1 && styles.lastRecord]}>
          <View style={[styles.iconContainer, { backgroundColor: getColor(record.discipline) + '20' }]}>
            <Ionicons name={getIcon(record.discipline)} size={16} color={getColor(record.discipline)} />
          </View>
          
          <View style={styles.recordContent}>
            <View style={styles.recordHeader}>
              <BodyText style={styles.metric}>{record.metric}</BodyText>
              {record.improvement && (
                <CaptionText style={styles.improvement}>+{record.improvement}</CaptionText>
              )}
            </View>
            <View style={styles.recordDetails}>
              <BodyText style={styles.value}>{record.value}</BodyText>
              <CaptionText style={styles.date}>{record.date}</CaptionText>
            </View>
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    marginHorizontal: spacing[4],
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingBottom: spacing[3],
    marginBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },
  
  lastRecord: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  recordContent: {
    flex: 1,
  },
  
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  
  metric: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral.text,
  },
  
  improvement: {
    fontSize: 12,
    color: colors.status.completed,
    fontWeight: '600',
  },
  
  recordDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  
  date: {
    fontSize: 12,
    color: colors.neutral.secondary,
  },
});