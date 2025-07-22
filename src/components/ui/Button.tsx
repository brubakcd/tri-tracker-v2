import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { BodyText } from './Typography';
import { colors, componentTokens, spacing } from '../../styles/tokens';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function Button({ 
  title, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  style,
  ...props 
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textColor = variant === 'primary' ? colors.neutral.cards : colors.system.blue;

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      <BodyText style={{ color: textColor, textAlign: 'center' }}>
        {title}
      </BodyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: componentTokens.button.primary.borderRadius,
  },
  
  // Variants
  primary: {
    backgroundColor: componentTokens.button.primary.backgroundColor,
  },
  
  secondary: {
    backgroundColor: colors.neutral.background,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  
  outline: componentTokens.button.secondary,
  
  // Sizes
  small: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  
  medium: {
    paddingVertical: componentTokens.button.primary.paddingVertical,
    paddingHorizontal: componentTokens.button.primary.paddingHorizontal,
  },
  
  large: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
  },
  
  fullWidth: {
    width: '100%',
  },
});