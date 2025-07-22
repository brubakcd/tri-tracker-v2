import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { BodyTextSmall } from './Typography';
import { colors, componentTokens, spacing } from '../../styles/tokens';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({ 
  label, 
  error, 
  fullWidth = true,
  style,
  ...props 
}: InputProps) {
  const inputStyle = [
    styles.input,
    fullWidth && styles.fullWidth,
    error && styles.error,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <BodyTextSmall style={styles.label}>
          {label}
        </BodyTextSmall>
      )}
      <TextInput
        style={inputStyle}
        placeholderTextColor={colors.neutral.secondary}
        {...props}
      />
      {error && (
        <BodyTextSmall style={styles.errorText}>
          {error}
        </BodyTextSmall>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3],
  },
  
  label: {
    marginBottom: spacing[1],
    color: colors.neutral.text,
  },
  
  input: {
    ...componentTokens.input,
    color: colors.neutral.text,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  error: {
    borderColor: colors.status.missed,
    borderWidth: 1,
  },
  
  errorText: {
    color: colors.status.missed,
    marginTop: spacing[1],
  },
});