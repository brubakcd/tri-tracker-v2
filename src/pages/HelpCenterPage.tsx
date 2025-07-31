import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/tokens';
import { PageHeader } from '../components/ui';

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: 'rocket-outline' as const,
      articles: [
        'Setting up your first training plan',
        'Understanding training phases',
        'Connecting your devices',
        'Setting your race goals'
      ]
    },
    {
      title: 'Training Plans',
      icon: 'fitness-outline' as const,
      articles: [
        'How are training plans created?',
        'Modifying your training schedule',
        'Understanding workout intensity',
        'Tracking your progress'
      ]
    },
    {
      title: 'Workouts & Activities',
      icon: 'stopwatch-outline' as const,
      articles: [
        'Recording workout data',
        'Understanding workout metrics',
        'Swimming pool vs open water',
        'Brick workout guidelines'
      ]
    },
    {
      title: 'Analytics & Insights',
      icon: 'analytics-outline' as const,
      articles: [
        'Reading your performance data',
        'Understanding training load',
        'Recovery recommendations',
        'Race day predictions'
      ]
    },
    {
      title: 'Account & Billing',
      icon: 'card-outline' as const,
      articles: [
        'Managing your subscription',
        'Updating payment methods',
        'Downloading your data',
        'Cancelling your account'
      ]
    },
    {
      title: 'Troubleshooting',
      icon: 'build-outline' as const,
      articles: [
        'App not syncing data',
        'Workout not recording',
        'Login and password issues',
        'Performance and crashes'
      ]
    }
  ];

  const handleCategoryPress = (category: string) => {
    console.log(`${category} category pressed`);
  };

  const handleArticlePress = (article: string) => {
    console.log(`${article} article pressed`);
  };

  const handleSearchHelp = () => {
    console.log('Search help pressed');
  };

  const handleContactSupport = () => {
    console.log('Contact support pressed');
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Help Center" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Help */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.searchContainer} onPress={handleSearchHelp}>
            <Ionicons name="search-outline" size={20} color={colors.neutral.secondary} />
            <Text style={styles.searchText}>Search help articles...</Text>
          </TouchableOpacity>
        </View>

        {/* Help Categories */}
        {helpCategories.map((category, index) => (
          <View key={category.title} style={styles.sectionContainer}>
            <View style={styles.cardContainer}>
              <TouchableOpacity 
                style={styles.categoryHeader}
                onPress={() => handleCategoryPress(category.title)}
              >
                <View style={styles.categoryTitleRow}>
                  <Ionicons name={category.icon} size={24} color={colors.neutral.text} />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
              </TouchableOpacity>
              
              <View style={styles.articlesContainer}>
                {category.articles.map((article, articleIndex) => (
                  <TouchableOpacity
                    key={article}
                    style={[
                      styles.articleRow,
                      articleIndex === category.articles.length - 1 && styles.lastArticle
                    ]}
                    onPress={() => handleArticlePress(article)}
                  >
                    <Text style={styles.articleText}>{article}</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.neutral.secondary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Contact Support */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.supportButton} onPress={handleContactSupport}>
              <View style={styles.supportContent}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.neutral.text} />
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>Still need help?</Text>
                  <Text style={styles.supportDescription}>Contact our support team</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.neutral.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Quick Links */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Frequently Asked</Text>
            </View>
            
            <TouchableOpacity style={styles.faqRow} onPress={() => handleArticlePress('How do I sync my watch?')}>
              <Text style={styles.faqText}>How do I sync my watch?</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.faqRow} onPress={() => handleArticlePress('Can I modify my training plan?')}>
              <Text style={styles.faqText}>Can I modify my training plan?</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.faqRow} onPress={() => handleArticlePress('How is my training load calculated?')}>
              <Text style={styles.faqText}>How is my training load calculated?</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.neutral.secondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            
            <TouchableOpacity style={[styles.faqRow, styles.lastFaq]} onPress={() => handleArticlePress('What if I miss a workout?')}>
              <Text style={styles.faqText}>What if I miss a workout?</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.neutral.secondary} />
            </TouchableOpacity>
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

  searchContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.base,
  },

  searchText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.secondary,
    marginLeft: spacing[3],
  },

  cardContainer: {
    backgroundColor: colors.neutral.cards,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  categoryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.text,
    marginLeft: spacing[3],
  },

  articlesContainer: {
    paddingHorizontal: spacing[4],
  },

  articleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.separator,
  },

  lastArticle: {
    borderBottomWidth: 0,
  },

  articleText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    flex: 1,
  },

  supportButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
  },

  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  supportText: {
    marginLeft: spacing[3],
    flex: 1,
  },

  supportTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.text,
    marginBottom: spacing[1],
  },

  supportDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.secondary,
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

  faqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },

  lastFaq: {
    borderBottomWidth: 0,
  },

  faqText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.text,
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.separator,
    marginHorizontal: spacing[4],
  },
});