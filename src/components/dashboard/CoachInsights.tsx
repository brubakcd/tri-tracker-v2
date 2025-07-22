import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BodyText, CaptionText } from '../ui/Typography';
import { spacing } from '../../styles/tokens';

interface CoachInsightsProps {
  message: string;
  coachInitials?: string;
  attribution?: string;
}

export default function CoachInsights({ 
  message,
  coachInitials = "AI",
  attribution = "AI Coach"
}: CoachInsightsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.coachAvatar}>
        <BodyText style={styles.avatarText}>{coachInitials}</BodyText>
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          <View style={styles.bubbleTail} />
          <BodyText style={styles.messageText}>
            {message}
          </BodyText>
        </View>
        <CaptionText style={styles.attribution}>
          {attribution}
        </CaptionText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
    paddingVertical: spacing[1],
  },
  
  coachAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  
  messageContainer: {
    flex: 1,
  },
  
  messageBubble: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingVertical: spacing[4],
    paddingHorizontal: 18,
    marginBottom: spacing[2],
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  
  bubbleTail: {
    position: 'absolute',
    left: -6,
    top: 12,
    width: 12,
    height: 12,
    backgroundColor: '#1C1C1E',
    transform: [{ rotate: '45deg' }],
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftColor: 'rgba(0,0,0,0.08)',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomLeftRadius: 2,
  },
  
  messageText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    fontWeight: '400',
  },
  
  attribution: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
    fontWeight: '400',
  },
});