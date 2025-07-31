import { useEffect, RefObject } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

/**
 * Simplified hook for tab press scroll-to-top
 * Uses a different approach that might be more reliable
 */
export function useSimpleTabPressScroll(scrollViewRef: RefObject<ScrollView>) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Listen to the focus event instead of tabPress
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Small delay to ensure the screen is fully rendered
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      }, 100);
    });

    // Also listen to tabPress for when user taps the already-focused tab
    const unsubscribeTabPress = (navigation as any).addListener('tabPress', (e: any) => {
      // Only scroll if we're already focused (meaning user tapped the active tab)
      if (isFocused && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    });

    return () => {
      unsubscribeFocus();
      unsubscribeTabPress();
    };
  }, [navigation, isFocused, scrollViewRef]);
}