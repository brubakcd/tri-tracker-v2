// Design Tokens - Based on PRD specifications
// This is the single source of truth for all design values

export const colors = {
  // Discipline colors
  disciplines: {
    swim: '#007AFF',
    bike: '#FF9500', 
    run: '#34C759',
    brick: 'linear-gradient(45deg, #007AFF, #34C759)', // Will need special handling for gradients
  },
  
  // Status colors
  status: {
    completed: '#34C759',
    scheduled: '#007AFF', 
    missed: '#FF3B30',
    rest: '#8E8E93',
  },
  
  // Neutral colors
  neutral: {
    background: '#F2F2F7',
    cards: '#FFFFFF',
    text: '#1C1C1E',
    secondary: '#6D6D80',
    border: '#C6C6C8',
    separator: '#EFEFF4',
  },
  
  // System colors (iOS-style)
  system: {
    blue: '#007AFF',
    red: '#FF3B30',
    orange: '#FF9500',
    yellow: '#FFCC00',
    green: '#34C759',
    purple: '#AF52DE',
    pink: '#FF2D92',
    indigo: '#5856D6',
    teal: '#5AC8FA',
    gray: '#8E8E93',
    gray2: '#AEAEB2',
    gray3: '#C7C7CC',
    gray4: '#D1D1D6',
    gray5: '#E5E5EA',
    gray6: '#F2F2F7',
  }
};

export const typography = {
  // Font sizes (React Native uses numbers, not strings with px)
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  
  // Font weights
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights (multipliers)
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Font families
  families: {
    system: 'System', // React Native default system font
  }
};

export const spacing = {
  // Spacing scale (React Native uses numbers)
  1: 4,
  2: 8, 
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6, // Android
  },
};

// Component-specific token combinations
export const componentTokens = {
  card: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    ...shadows.base,
  },
  
  button: {
    primary: {
      backgroundColor: colors.system.blue,
      borderRadius: borderRadius.base,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: colors.system.blue,
      borderWidth: 1,
      borderRadius: borderRadius.base,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
    },
  },
  
  input: {
    backgroundColor: colors.neutral.cards,
    borderColor: colors.neutral.border,
    borderWidth: 1,
    borderRadius: borderRadius.base,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    fontSize: typography.sizes.base,
  },
};

// Convenience functions for common patterns
export const createTextStyle = (size: keyof typeof typography.sizes, weight: keyof typeof typography.weights, color: string) => ({
  fontSize: typography.sizes[size],
  fontWeight: typography.weights[weight],
  color: color,
  fontFamily: typography.families.system,
});

export const createSpacingStyle = (top?: number, right?: number, bottom?: number, left?: number) => {
  if (right === undefined && bottom === undefined && left === undefined) {
    return { margin: top };
  }
  return {
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left,
  };
};