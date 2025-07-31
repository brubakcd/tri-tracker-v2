import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';

export default function ContactSupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('cole.bennett@email.com');

  const supportCategories = [
    'General',
    'Technical Issue',
    'Billing',
    'Feature Request',
    'Bug Report',
    'Account'
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Missing Information', 'Please fill in both subject and message fields.');
      return;
    }

    // Here you would normally send the support request
    Alert.alert(
      'Message Sent',
      'Your support request has been submitted. We\'ll get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => {
        setSubject('');
        setMessage('');
        setSelectedCategory('General');
      }}]
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Contact Support" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Form */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Send us a Message</Text>
            </View>

            {/* Category Selection */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScroll}
                contentContainerStyle={styles.categoriesContent}
              >
                {supportCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipSelected
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Email Field */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Subject Field */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>Subject</Text>
              <TextInput
                style={styles.textInput}
                value={subject}
                onChangeText={setSubject}
                placeholder="Brief description of your issue"
              />
            </View>

            {/* Message Field */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>Message</Text>
              <TextInput
                style={[styles.textInput, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Please describe your issue in detail. Include any error messages or steps to reproduce the problem."
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Response Time Info */}
        <View style={styles.sectionContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color={colors.neutral.text} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Response Time</Text>
              <Text style={styles.infoDescription}>We typically respond within 24 hours. For urgent issues, please use live chat during business hours.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },

  sectionContainer: {
    marginBottom: spacing[6],
    marginHorizontal: spacing[4],
  },


  cardContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

  cardHeader: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  formSection: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[2],
  },

  categoriesScroll: {
    marginHorizontal: -spacing[4],
  },

  categoriesContent: {
    paddingHorizontal: spacing[4],
  },

  categoryChip: {
    backgroundColor: colors.neutral.background,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginRight: spacing[2],
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },

  categoryChipSelected: {
    backgroundColor: colors.neutral.text,
    borderColor: colors.neutral.text,
  },

  categoryChipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
  },

  categoryChipTextSelected: {
    color: colors.neutral.background,
  },

  textInput: {
    backgroundColor: colors.neutral.background,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },

  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: colors.neutral.text,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
    margin: spacing[4],
  },

  submitButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.background,
  },

  infoCard: {
    backgroundColor: colors.neutral.separator + '20',
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },

  infoText: {
    marginLeft: spacing[3],
    flex: 1,
  },

  infoTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  infoDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: typography.sizes.sm * 1.4,
  },
});