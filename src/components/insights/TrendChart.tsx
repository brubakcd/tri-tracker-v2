import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BodyText, CaptionText } from '../ui/Typography';
import { colors, spacing } from '../../styles/tokens';

interface TrendChartProps {
  title: string;
  data: {
    label: string;
    value: number;
    unit?: string;
  }[];
  trend: 'up' | 'down' | 'stable' | string;
  changeText: string;
}

export default function TrendChart({ title, data, trend, changeText }: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const trendColor = trend === 'up' ? colors.status.completed : 
                     trend === 'down' ? colors.status.missed : 
                     colors.neutral.secondary;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CaptionText style={styles.title}>{title}</CaptionText>
        <CaptionText style={[styles.change, { color: trendColor }]}>{changeText}</CaptionText>
      </View>
      
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: index === data.length - 1 ? colors.system.blue : colors.neutral.separator
                  }
                ]} 
              />
            </View>
            <CaptionText style={styles.label}>{item.label}</CaptionText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.cards,
    borderRadius: 12,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  
  title: {
    color: colors.neutral.secondary,
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    gap: spacing[2],
  },
  
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  
  barWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  bar: {
    width: '80%',
    backgroundColor: colors.neutral.separator,
    borderRadius: 4,
    minHeight: 4,
  },
  
  label: {
    fontSize: 10,
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },
});