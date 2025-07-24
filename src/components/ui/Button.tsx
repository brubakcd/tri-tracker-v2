import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { BodyText } from './Typography';
import { colors, componentTokens, spacing } from '../../styles/tokens';
import { LinearGradient, gradients } from '../../styles/gradients';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  gradient?: 'primary' | 'success' | 'swim' | 'bike' | 'run' | 'brick' | 'premium' | 'intensity-easy' | 'intensity-moderate' | 'intensity-hard' | 'intensity-threshold' | 'intensity-race';
}

export default function Button({ 
  title, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  gradient,
  style,
  ...props 
}: ButtonProps) {
  // Get gradient configuration if specified
  const getGradientConfig = () => {
    if (!gradient) return null;
    
    switch (gradient) {
      case 'primary':
        return gradients.ui.primaryButton;
      case 'success':
        return gradients.ui.success;
      case 'swim':
        return gradients.disciplines.swim;
      case 'bike':
        return gradients.disciplines.bike;
      case 'run':
        return gradients.disciplines.run;
      case 'brick':
        return gradients.disciplines.brick;
      case 'premium':
        return gradients.ui.darkPremium;
      case 'intensity-easy':
        return gradients.intensity.easy;
      case 'intensity-moderate':
        return gradients.intensity.moderate;
      case 'intensity-hard':
        return gradients.intensity.hard;
      case 'intensity-threshold':
        return gradients.intensity.threshold;
      case 'intensity-race':
        return gradients.intensity.race;
      default:
        return null;
    }
  };

  const gradientConfig = getGradientConfig();
  
  const buttonStyle = [
    styles.base,
    !gradient && styles[variant], // Only apply variant styles if no gradient
    styles[size],
    fullWidth && styles.fullWidth,
    gradient && styles.gradientContainer, // Special container style for gradient buttons
    style,
  ];

  // Determine text color based on gradient or variant
  const getTextColor = () => {
    if (gradient) {
      // For gradient buttons, use white text for better contrast
      if (gradient === 'premium') {
        return colors.neutral.cards; // White for dark premium
      }
      return colors.neutral.cards; // White for all other gradients
    }
    return variant === 'primary' ? colors.neutral.cards : colors.neutral.text;
  };

  const textColor = getTextColor();

  if (gradient && gradientConfig) {
    return (
      <TouchableOpacity style={buttonStyle} {...props}>
        <LinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          locations={gradientConfig.locations}
          style={[
            styles.gradientFill,
            styles[size],
            fullWidth && styles.fullWidth,
          ]}
        >
          <BodyText style={{ color: textColor, textAlign: 'center' }}>
            {title}
          </BodyText>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Default non-gradient button
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
  
  // Gradient-specific styles
  gradientContainer: {
    backgroundColor: 'transparent', // Remove background when using gradient
    overflow: 'hidden', // Ensure gradient respects border radius
  },
  
  gradientFill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: componentTokens.button.primary.borderRadius,
  },
});