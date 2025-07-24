import { LinearGradient } from 'expo-linear-gradient';
import { colors } from './tokens';

// Type for gradient configuration
interface GradientConfig {
  colors: readonly string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  locations?: readonly number[];
}

// Gradient definitions with colors and positions
export const gradients = {
  // Discipline gradients - subtle and professional
  disciplines: {
    swim: {
      colors: ['#0EA5E9', '#0284C7', '#0369A1'] as const, // Light to deep blue
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    bike: {
      colors: ['#FB923C', '#F97316', '#EA580C'] as const, // Light to deep orange
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    run: {
      colors: ['#4ADE80', '#22C55E', '#16A34A'] as const, // Light to deep green
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    brick: {
      colors: ['#0EA5E9', '#22C55E', '#16A34A'] as const, // Blue to green transition
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.6, 1] as const,
    },
    rest: {
      colors: ['#9CA3AF', '#6B7280', '#4B5563'], // Light to deep gray
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1],
    },
  },

  // UI element gradients
  ui: {
    // Dark gradient for premium sections (like AI insights)
    darkPremium: {
      colors: ['#1F2937', '#111827', '#030712'] as const, // Dark grays
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
      locations: [0, 0.6, 1] as const,
    },
    // Subtle background gradient
    backgroundSubtle: {
      colors: ['#F9FAFB', '#F3F4F6', '#E5E7EB'], // Very light grays
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.5, 1],
    },
    // Card elevation gradient (for shadows)
    cardElevation: {
      colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.02)', 'rgba(0,0,0,0.04)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.7, 1],
    },
    // Primary button gradient
    primaryButton: {
      colors: ['#0EA5E9', '#0284C7', '#0369A1'] as const, // Blue gradient
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0.5 },
      locations: [0, 0.5, 1] as const,
    },
    // Success gradient
    success: {
      colors: ['#4ADE80', '#22C55E', '#16A34A'] as const,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
  },

  // Intensity-based gradients
  intensity: {
    easy: {
      colors: ['#86EFAC', '#4ADE80', '#22C55E'] as const, // Light greens
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    moderate: {
      colors: ['#FDE047', '#FACC15', '#EAB308'] as const, // Yellows
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    hard: {
      colors: ['#FCA5A5', '#F87171', '#EF4444'] as const, // Reds
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    threshold: {
      colors: ['#FB923C', '#F97316', '#EA580C'] as const, // Oranges
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
    race: {
      colors: ['#A78BFA', '#8B5CF6', '#7C3AED'] as const, // Purples
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1] as const,
    },
  },

  // Overlay gradients for text readability
  overlays: {
    darkTop: {
      colors: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.5, 1],
    },
    darkBottom: {
      colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.5, 1],
    },
    lightOverlay: {
      colors: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0, 0.5, 1],
    },
  },
};

// Helper function to get gradient props by key
export function getGradientProps(type: string, name: string) {
  const gradientType = gradients[type as keyof typeof gradients];
  if (!gradientType) return null;
  
  const gradient = gradientType[name as keyof typeof gradientType];
  if (!gradient) return null;
  
  return gradient;
}

// Helper to get discipline gradient
export function getDisciplineGradient(discipline: string) {
  return getGradientProps('disciplines', discipline) || gradients.disciplines.rest;
}

// Helper to get intensity gradient
export function getIntensityGradient(intensity: string) {
  const normalizedIntensity = intensity.toLowerCase();
  return getGradientProps('intensity', normalizedIntensity) || gradients.intensity.moderate;
}

// Color utilities for creating custom gradients
export function createGradientFromColor(baseColor: string, variation: 'light' | 'dark' = 'dark') {
  // This is a simplified version - in production you'd want a proper color manipulation library
  if (variation === 'dark') {
    return {
      colors: [baseColor, darkenColor(baseColor, 0.1), darkenColor(baseColor, 0.2)],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1],
    };
  } else {
    return {
      colors: [lightenColor(baseColor, 0.2), baseColor, darkenColor(baseColor, 0.1)],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      locations: [0, 0.5, 1],
    };
  }
}

// Simple color manipulation functions
function darkenColor(color: string, amount: number): string {
  // Convert hex to RGB, darken, then back to hex
  // This is simplified - use a proper color library in production
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 255) * (1 - amount));
  const g = Math.max(0, ((num >> 8) & 255) * (1 - amount));
  const b = Math.max(0, (num & 255) * (1 - amount));
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

function lightenColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 255) + (255 - ((num >> 16) & 255)) * amount);
  const g = Math.min(255, ((num >> 8) & 255) + (255 - ((num >> 8) & 255)) * amount);
  const b = Math.min(255, (num & 255) + (255 - (num & 255)) * amount);
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// Export LinearGradient for convenience
export { LinearGradient };