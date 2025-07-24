import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Cache the logo source
const logoSource = require('../../../assets/delta_black.png');

export default function AuthHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image 
        source={logoSource}
        style={styles.logo}
        resizeMode="contain"
        fadeDuration={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingTop: 8,
    zIndex: 1000,
  },
  logo: {
    width: 32,
    height: 32,
  },
});