import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../styles/tokens';

interface ProfileIconProps {
  initials: string;
  onPress: () => void;
  size?: number;
}

export default function ProfileIcon({ initials, onPress, size = 32 }: ProfileIconProps) {
  return (
    <TouchableOpacity style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]} onPress={onPress}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  initials: {
    fontWeight: typography.weights.bold,
    color: colors.neutral.background,
  },
});