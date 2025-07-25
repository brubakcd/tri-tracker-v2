import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CaptionText } from '../ui/Typography';
import { colors, spacing, typography, borderRadius } from '../../styles/tokens';

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
    borderRadius: borderRadius.md,
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
    fontSize: typography.sizes.xs - 1,
    letterSpacing: 0.5,
    fontWeight: typography.weights.medium,
  },
  
  change: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
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
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
  
  label: {
    fontSize: typography.sizes.xs - 2,
    color: colors.neutral.secondary,
    marginTop: spacing[1],
  },
});