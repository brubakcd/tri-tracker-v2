import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/tokens';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Heading1, SecondaryText, BodyText } from '../../components/ui/Typography';
import Card from '../../components/ui/Card';

type NavigationProp = any;

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = () => {
    navigation.getParent()?.replace('MainApp');
  };

  const handleSignIn = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Create Account
          </Text>
          <Text style={styles.subtitle}>
            Join thousands of athletes training smarter
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formContainer}>
            <Input
              label="FIRST NAME"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              style={styles.input}
            />

            <Input
              label="LAST NAME"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              style={styles.input}
            />

            <Input
              label="EMAIL ADDRESS"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <Input
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              style={styles.input}
            />

            <Input
              label="CONFIRM PASSWORD"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
              style={styles.input}
            />

            <Button
              title="Create Account"
              onPress={handleSignUp}
              style={styles.signUpButton}
            />
          </View>

        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.system.gray6,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[6],
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing[5],
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[4],
    ...shadows.lg,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 25,
  },
  formContainer: {
    padding: spacing[5],
  },
  input: {
    marginBottom: spacing[2] + spacing[1],
  },
  signUpButton: {
    backgroundColor: colors.neutral.text,
    borderRadius: borderRadius.base + 2,
    paddingVertical: spacing[3] + spacing[1],
    marginTop: spacing[1] + spacing[1]/2,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: colors.system.gray,
    fontSize: typography.sizes.sm,
  },
  signInLink: {
    color: colors.system.teal,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});