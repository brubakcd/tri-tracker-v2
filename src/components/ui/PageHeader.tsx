import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../styles/tokens';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
}

export default function PageHeader({ title, onBackPress }: PageHeaderProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={typography.sizes.lg} color={colors.neutral.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: colors.neutral.cards,
  },
  
  header: {
    backgroundColor: colors.neutral.cards,
    height: 44,
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  
  backButton: {
    position: 'absolute',
    left: spacing[4],
    zIndex: 1,
    padding: spacing[1],
  },
  
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    textAlign: 'center',
  },
});