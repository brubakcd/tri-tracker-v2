import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing } from '../../styles/tokens';
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
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#48484A',
    textAlign: 'center',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 6,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  signInLink: {
    color: '#5AC8FA',
    fontSize: 14,
    fontWeight: '500',
  },
});