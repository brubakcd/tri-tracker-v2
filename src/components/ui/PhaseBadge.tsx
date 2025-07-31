import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../styles/tokens';

interface PhaseBadgeProps {
  phase: string;
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export default function PhaseBadge({ 
  phase, 
  size = 'medium',
  style 
}: PhaseBadgeProps) {
  
  const getPhaseColor = (phaseName: string) => {
    switch (phaseName.toLowerCase()) {
      case 'base building': return colors.system.blue;
      case 'build phase': return colors.system.orange;
      case 'peak & taper': return colors.system.purple;
      default: return colors.primary;
    }
  };

  const phaseColor = getPhaseColor(phase);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: {
            paddingHorizontal: spacing[2],
            paddingVertical: spacing[1] / 2,
          },
          text: {
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.medium,
          }
        };
      case 'large':
        return {
          container: {
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[2],
          },
          text: {
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.semibold,
          }
        };
      default: // medium
        return {
          container: {
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[1],
          },
          text: {
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.semibold,
          }
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View 
      style={[
        styles.container,
        sizeStyles.container,
        { backgroundColor: phaseColor + '20' },
        style
      ]}
    >
      <Text style={[sizeStyles.text, { color: phaseColor }]}>
        {phase}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
});