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

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.getParent()?.replace('MainApp');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
            Welcome Back
          </Text>
          <Text style={styles.subtitle}>
            Continue your training journey
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formContainer}>
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
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleSignIn}
              style={styles.signInButton}
            />
          </View>

        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>
              Sign Up
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
    paddingBottom: spacing[8],
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing[6] + spacing[1],
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1] + spacing[1]/2,
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
    marginBottom: spacing[5],
    ...shadows.lg,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 25,
  },
  formContainer: {
    padding: spacing[5],
  },
  input: {
    marginBottom: spacing[3],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[4],
    marginTop: spacing[1],
  },
  forgotPasswordText: {
    color: colors.system.teal,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  signInButton: {
    backgroundColor: colors.neutral.text,
    borderRadius: borderRadius.base + 2,
    paddingVertical: spacing[3] + spacing[1],
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: colors.system.gray,
    fontSize: typography.sizes.sm,
  },
  signUpLink: {
    color: colors.system.teal,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});