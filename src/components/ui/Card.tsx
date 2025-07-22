import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, componentTokens, spacing, shadows } from '../../styles/tokens';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  style,
  ...props 
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[`padding_${padding}`],
    style,
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: componentTokens.card.backgroundColor,
    borderRadius: componentTokens.card.borderRadius,
  },
  
  // Variants
  default: {
    ...shadows.base,
  },
  
  elevated: {
    ...shadows.lg,
  },
  
  outlined: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  
  // Padding variants
  padding_none: {
    padding: 0,
  },
  
  padding_small: {
    padding: spacing[2],
  },
  
  padding_medium: {
    padding: componentTokens.card.padding,
  },
  
  padding_large: {
    padding: spacing[6],
  },
});