import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI triathlon coach. I'm here to help you optimize your training, answer questions, and keep you motivated on your journey to race day. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Optional: maintain scroll position when keyboard hides
      // You can remove this if you don't want any behavior on keyboard hide
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Scroll to top on tab press
  useEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;

    const unsubscribe = (parent as any).addListener('tabPress', () => {
      if (navigation.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);


  // Get AI insights
  const latestInsight = getLatestInsight('user_1');
  const dailyMotivation = getDailyMotivation('user_1');

  // Quick action prompts
  const quickActions = [
    { icon: 'fitness', text: 'Analyze my progress', color: colors.system.blue },
    { icon: 'timer', text: 'Pacing strategy', color: colors.system.green },
    { icon: 'bed', text: 'Recovery tips', color: colors.system.purple },
    { icon: 'calendar', text: 'Adjust schedule', color: colors.system.orange },
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

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
      scrollToBottom();
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing your request. Based on your recent training data, here's my recommendation...",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        scrollToBottom();
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
    scrollToBottom();
  };

  return (
    <View style={styles.container}>
      {/* Hero Section - Full Width Header */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
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

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.chatContentContainer}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>

          {/* Quick Actions - positioned at bottom to align with input */}
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
        </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything about your training..."
            placeholderTextColor={colors.neutral.secondary}
            value={inputText}
            onChangeText={setInputText}
            onFocus={() => {
              // Scroll to bottom when input is focused
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? colors.neutral.cards : colors.neutral.secondary} 
            />
          </TouchableOpacity>
        </View>
        <CaptionText style={styles.disclaimer}>
          AI suggestions are for guidance only. Always consult with professionals for medical advice.
        </CaptionText>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  heroSection: {
    backgroundColor: colors.neutral.cards,
    paddingTop: 50, // Extend into status bar area
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  heroContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2], // Additional padding for text positioning
  },

  keyboardAvoidingView: {
    flex: 1,
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

  chatContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[4],
    flexGrow: 1,
    justifyContent: 'flex-end',
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
    backgroundColor: colors.neutral.text,
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
    color: colors.neutral.cards,
  },

  aiMessageText: {
    color: colors.neutral.text,
  },

  quickActionsContainer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    paddingTop: spacing[3],
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
    paddingBottom: spacing[4], // Increased bottom padding
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
    backgroundColor: colors.neutral.text,
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
    marginBottom: 0, // Remove bottom margin to reduce gap
  },
});