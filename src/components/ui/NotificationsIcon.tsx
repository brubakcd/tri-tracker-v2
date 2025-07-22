import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/tokens';

interface NotificationsIconProps {
  onPress: () => void;
  size?: number;
  hasNotifications?: boolean;
}

export default function NotificationsIcon({ onPress, size = 24, hasNotifications = false }: NotificationsIconProps) {
  const iconName = hasNotifications ? 'notifications' : 'notifications-outline';
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons 
        name={iconName} 
        size={size} 
        color={colors.neutral.text} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});