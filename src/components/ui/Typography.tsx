import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors, typography, createTextStyle } from '../../styles/tokens';

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
}

// Heading components
export function Heading1({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.h1, style]} {...props}>
      {children}
    </Text>
  );
}

export function Heading2({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.h2, style]} {...props}>
      {children}
    </Text>
  );
}

export function Heading3({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.h3, style]} {...props}>
      {children}
    </Text>
  );
}

// Body text components
export function BodyText({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.body, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyTextLarge({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.bodyLarge, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyTextSmall({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.bodySmall, style]} {...props}>
      {children}
    </Text>
  );
}

// Specialized text components
export function CaptionText({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.caption, style]} {...props}>
      {children}
    </Text>
  );
}

export function SecondaryText({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.secondary, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: createTextStyle('3xl', 'bold', colors.neutral.text),
  h2: createTextStyle('2xl', 'bold', colors.neutral.text),
  h3: createTextStyle('xl', 'semibold', colors.neutral.text),
  
  body: createTextStyle('base', 'normal', colors.neutral.text),
  bodyLarge: createTextStyle('lg', 'normal', colors.neutral.text),
  bodySmall: createTextStyle('sm', 'normal', colors.neutral.text),
  
  caption: createTextStyle('xs', 'medium', colors.neutral.secondary),
  secondary: createTextStyle('base', 'normal', colors.neutral.secondary),
});