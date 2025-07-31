import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/tokens';

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function SelectionModal({
  visible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
}: SelectionModalProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.neutral.text} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                selectedValue === option.value && styles.optionRowSelected
              ]}
              onPress={() => handleSelect(option.value)}
            >
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionLabel,
                  selectedValue === option.value && styles.optionLabelSelected
                ]}>
                  {option.label}
                </Text>
                {option.description && (
                  <Text style={[
                    styles.optionDescription,
                    selectedValue === option.value && styles.optionDescriptionSelected
                  ]}>
                    {option.description}
                  </Text>
                )}
              </View>
              {selectedValue === option.value && (
                <Ionicons name="checkmark-circle" size={24} color={colors.neutral.text} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.neutral.cards,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
  },

  closeButton: {
    padding: spacing[2],
    marginRight: -spacing[2],
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },

  optionRow: {
    backgroundColor: colors.neutral.cards,
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.base,
  },

  optionRowSelected: {
    borderWidth: 2,
    borderColor: colors.neutral.text,
    padding: spacing[4] - 2, // Adjust for border
  },

  optionContent: {
    flex: 1,
    marginRight: spacing[3],
  },

  optionLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  optionLabelSelected: {
    color: colors.neutral.text,
  },

  optionDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
    lineHeight: typography.sizes.sm * 1.4,
  },

  optionDescriptionSelected: {
    color: colors.neutral.text + 'CC',
  },
});