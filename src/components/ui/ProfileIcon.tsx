import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { colors, typography } from '../../styles/tokens';

interface ProfileIconProps {
  initials?: string;
  onPress: () => void;
  size?: number;
  imageSource?: ImageSourcePropType;
}

export default function ProfileIcon({ initials, onPress, size = 32, imageSource }: ProfileIconProps) {
  if (imageSource) {
    return (
      <TouchableOpacity style={[styles.imageContainer, { width: size, height: size }]} onPress={onPress}>
        <Image source={imageSource} style={[styles.image, { width: size, height: size }]} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

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

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    // Image styles are handled by the size prop
  },
});