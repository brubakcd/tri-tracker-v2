import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../styles/tokens';

interface SettingsRowProps {
  label: string;
  value: string;
  onPress: () => void;
  isLast?: boolean;
}

export default function SettingsRow({ label, value, onPress, isLast = false }: SettingsRowProps) {
  return (
    <TouchableOpacity 
      style={[styles.row, isLast && styles.lastRow]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: spacing[3],
  },

  rowLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    flex: 1,
  },

  rowValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal,
    color: colors.neutral.secondary,
    textAlign: 'right',
    flex: 1,
  },

  lastRow: {
    borderBottomWidth: 0,
  },
});