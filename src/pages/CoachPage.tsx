import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, BodyTextLarge, CaptionText } from '../components/ui/Typography';
import Card from '../components/ui/Card';
import { spacing, colors, typography } from '../styles/tokens';
import { getAIInteractionsByUserId, getLatestInsight, getDailyMotivation } from '../data';

interface CoachPageProps {
  navigation: any;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function CoachPage({ navigation }: CoachPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI triathlon coach. I'm here to help you optimize your training, answer questions, and keep you motivated on your journey to race day. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Get AI insights
  const latestInsight = getLatestInsight('user_1');
  const dailyMotivation = getDailyMotivation('user_1');

  // Quick action prompts
  const quickActions = [
    { icon: 'fitness', text: 'Analyze my progress', color: colors.system.blue },
    { icon: 'nutrition', text: 'Nutrition advice', color: colors.system.green },
    { icon: 'bed', text: 'Recovery tips', color: colors.system.purple },
    { icon: 'calendar', text: 'Adjust schedule', color: colors.system.orange },
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages([...messages, userMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing your request. Based on your recent training data, here's my recommendation...",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>AI Coach</Text>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <CaptionText style={styles.statusText}>Online</CaptionText>
            </View>
          </View>
          <CaptionText style={styles.headerSubtitle}>Your personal triathlon assistant</CaptionText>
        </View>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Motivation Card */}
        {dailyMotivation && messages.length === 1 && (
          <Card style={styles.motivationCard}>
            <View style={styles.motivationHeader}>
              <Ionicons name="sparkles" size={20} color={colors.system.yellow} />
              <BodyText style={styles.motivationTitle}>Daily Motivation</BodyText>
            </View>
            <CaptionText style={styles.motivationText}>{dailyMotivation.content}</CaptionText>
          </Card>
        )}

        {/* Latest Insight Card */}
        {latestInsight && messages.length === 1 && (
          <Card style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name="bulb-outline" size={20} color={colors.system.blue} />
              <BodyText style={styles.insightTitle}>Latest Insight</BodyText>
            </View>
            <CaptionText style={styles.insightText}>{latestInsight.content}</CaptionText>
          </Card>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper
            ]}
          >
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color={colors.primary} />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}

        {/* Quick Actions - shown only after initial message */}
        {messages.length === 1 && (
          <View style={styles.quickActionsContainer}>
            <CaptionText style={styles.quickActionsTitle}>Quick Actions</CaptionText>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction(action.text)}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                    <Ionicons name={action.icon as any} size={20} color={action.color} />
                  </View>
                  <CaptionText style={styles.quickActionText}>{action.text}</CaptionText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything about your training..."
            placeholderTextColor={colors.neutral.secondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxHeight={100}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? colors.neutral.white : colors.neutral.secondary} 
            />
          </TouchableOpacity>
        </View>
        <CaptionText style={styles.disclaimer}>
          AI suggestions are for guidance only. Always consult with professionals for medical advice.
        </CaptionText>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  header: {
    backgroundColor: colors.neutral.cards,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  headerContent: {
    gap: spacing[1],
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  headerSubtitle: {
    color: colors.neutral.secondary,
  },

  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    backgroundColor: colors.system.green + '20',
    borderRadius: 12,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.system.green,
  },

  statusText: {
    color: colors.system.green,
    fontSize: 11,
    fontWeight: '600',
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },

  motivationCard: {
    marginBottom: spacing[4],
    backgroundColor: colors.system.yellow + '10',
    borderWidth: 1,
    borderColor: colors.system.yellow + '30',
  },

  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },

  motivationTitle: {
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  motivationText: {
    lineHeight: 18,
  },

  insightCard: {
    marginBottom: spacing[4],
    backgroundColor: colors.system.blue + '10',
    borderWidth: 1,
    borderColor: colors.system.blue + '30',
  },

  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },

  insightTitle: {
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
  },

  insightText: {
    lineHeight: 18,
  },

  messageWrapper: {
    marginBottom: spacing[3],
  },

  userMessageWrapper: {
    alignItems: 'flex-end',
  },

  aiMessageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[2],
  },

  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageBubble: {
    maxWidth: '80%',
    padding: spacing[3],
    borderRadius: 16,
  },

  userMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },

  aiMessage: {
    backgroundColor: colors.neutral.cards,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral.separator,
  },

  messageText: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },

  userMessageText: {
    color: colors.neutral.white,
  },

  aiMessageText: {
    color: colors.neutral.text,
  },

  quickActionsContainer: {
    marginTop: spacing[6],
  },

  quickActionsTitle: {
    marginBottom: spacing[3],
    textAlign: 'center',
  },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },

  quickActionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.neutral.cards,
    borderRadius: 12,
    padding: spacing[3],
    alignItems: 'center',
    gap: spacing[2],
    borderWidth: 1,
    borderColor: colors.neutral.separator,
  },

  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
  },

  inputContainer: {
    backgroundColor: colors.neutral.cards,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.separator,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[2],
    marginBottom: spacing[2],
  },

  textInput: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    borderRadius: 20,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    paddingTop: spacing[2] + 2,
    fontSize: typography.sizes.sm,
    color: colors.neutral.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.neutral.separator,
  },

  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: colors.neutral.separator,
  },

  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    color: colors.neutral.secondary,
    marginBottom: spacing[1],
  },
});