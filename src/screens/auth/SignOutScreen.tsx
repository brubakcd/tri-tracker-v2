import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing } from '../../styles/tokens';
import Button from '../../components/ui/Button';
import { Heading1, Heading2, SecondaryText } from '../../components/ui/Typography';
import Card from '../../components/ui/Card';

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignOut'>;

export const SignOutScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>
                👋
              </Text>
            </View>
            
            <Text style={styles.title}>
              Sign Out?
            </Text>
            
            <Text style={styles.message}>
              Are you sure you want to sign out? You'll need to sign in again to access your training data.
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="secondary"
                style={styles.cancelButton}
              />
              <Button
                title="Sign Out"
                onPress={handleSignOut}
                variant="primary"
                style={styles.signOutButton}
              />
            </View>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -60,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  cardContent: {
    padding: 28,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#48484A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
  },
  signOutButton: {
    flex: 1,
  },
});