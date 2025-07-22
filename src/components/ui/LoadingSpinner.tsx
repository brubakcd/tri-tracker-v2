import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { BodyText } from './Typography';
import { colors, spacing } from '../../styles/tokens';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  centered?: boolean;
}

export default function LoadingSpinner({ 
  size = 'large', 
  color = colors.system.blue,
  text,
  centered = true 
}: LoadingSpinnerProps) {
  const containerStyle = [
    styles.container,
    centered && styles.centered,
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <BodyText style={styles.text}>
          {text}
        </BodyText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  
  text: {
    marginTop: spacing[2],
    color: colors.neutral.secondary,
    textAlign: 'center',
  },
});