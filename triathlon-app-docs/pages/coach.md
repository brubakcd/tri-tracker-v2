# Coach Page Documentation

## Overview
AI Coach dashboard featuring recent insights, performance trends, training load analytics, goal progress tracking, and personalized recommendations.

## Component Composition
```
CoachPage
├── AppHeader (coach title)
├── Section (Recent Insights)
│   ├── SectionHeader
│   └── InsightCard × multiple
├── Section (Performance Trends)
│   ├── SectionHeader
│   └── TrendsCard
├── Section (Training Load Chart)
│   └── TrainingLoadChart
├── Section (Goal Progress)
│   ├── SectionHeader
│   └── GoalProgressCard
└── Section (Recommendations)
    ├── SectionHeader
    └── RecommendationsCard
```

## Component Reusability Analysis

### **Reused Components (✅ Existing)**
- **SectionHeader** - Used throughout for consistent section organization
- **CoachMessage** (base pattern) - Insights use the same avatar + bubble pattern
- **AppHeader** - Same header pattern as other pages
- **Card styling** - All cards follow established design system

### **New Components (🆕 Coach-Specific)**
- **InsightCard** - AI insights with timestamps
- **TrendsCard** - Performance trend analysis with arrows
- **TrainingLoadChart** - Simple bar chart visualization
- **GoalProgressCard** - Progress bars for race goals
- **RecommendationsCard** - Action-oriented AI suggestions

## Data Requirements

### Coach Page Data Structure
```javascript
const coachData = {
  insights: [
    {
      id: string,
      type: 'workout_analysis' | 'recovery' | 'nutrition' | 'performance',
      title: string,
      timestamp: Date,
      message: string,
      isRead: boolean
    }
  ],
  trends: {
    period: string, // 'Last 4 Weeks'
    metrics: [
      {
        discipline: 'swim' | 'bike' | 'run',
        name: string, // 'Swimming Pace'
        period: string, // 'Avg per 100m'
        change: {
          value: string, // '4s faster'
          direction: 'positive' | 'negative',
          percentage?: number
        }
      }
    ]
  },
  trainingLoad: {
    title: string,
    subtitle: string,
    weeks: [
      {
        week: string, // 'W2', 'W3', etc.
        load: number, // 0-100 percentage for bar height
        value?: number // Optional actual value
      }
    ]
  },
  goals: {
    raceType: string, // 'Olympic Distance Targets'
    subtitle: string,
    goals: [
      {
        id: string,
        discipline: 'swim' | 'bike' | 'run',
        name: string, // 'Swim 1500m'
        target: string, // 'Target: 28:00'
        progress: number, // 0-100 percentage
        current?: string // Current best time
      }
    ]
  },
  recommendations: [
    {
      id: string,
      title: string,
      description: string,
      priority: 'high' | 'medium' | 'low',
      category: 'volume' | 'technique' | 'recovery' | 'nutrition'
    }
  ]
}
```

## Component Implementations

### CoachPage Main Component
```javascript
const CoachPage = () => {
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoachData();
  }, []);

  const loadCoachData = async () => {
    try {
      const data = await fetchCoachAnalytics();
      setCoachData(data);
    } catch (error) {
      console.error('Error loading coach data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{
      maxWidth: '375px',
      margin: '0 auto',
      background: '#F2F2F7',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        background: '#F2F2F7',
        padding: '60px 24px 24px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          AI Coach
        </h1>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 24px 24px' }}>
        {/* Recent Insights */}
        <div style={{ marginBottom: '24px' }}>
          <SectionHeader 
            title="Recent Insights"
            actionText="View all"
            onAction={() => navigate('/insights')}
          />
          {coachData.insights.slice(0, 3).map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onClick={() => handleInsightClick(insight)}
            />
          ))}
        </div>

        {/* Performance Trends */}
        <div style={{ marginBottom: '24px' }}>
          <SectionHeader 
            title="Performance Trends"
            actionText="Details"
            onAction={() => navigate('/trends')}
          />
          <TrendsCard trends={coachData.trends} />
        </div>

        {/* Training Load Chart */}
        <div style={{ marginBottom: '24px' }}>
          <TrainingLoadChart data={coachData.trainingLoad} />
        </div>

        {/* Goal Progress */}
        <div style={{ marginBottom: '24px' }}>
          <SectionHeader 
            title="Goal Progress"
            actionText="Edit goals"
            onAction={() => navigate('/goals')}
          />
          <GoalProgressCard goals={coachData.goals} />
        </div>

        {/* Recommendations */}
        <div>
          <SectionHeader title="Recommendations" />
          <RecommendationsCard recommendations={coachData.recommendations} />
        </div>
      </div>
    </div>
  );
};
```

### InsightCard Component (🆕 Extends CoachMessage pattern)
```javascript
const InsightCard = ({ 
  insight, 
  onClick,
  className = '' 
}) => {
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div 
      className={`insights-card ${className}`}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
        border: '0.5px solid rgba(0,0,0,0.05)',
        marginBottom: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease'
      }}
    >
      {/* Header - Reuses CoachMessage avatar pattern */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '14px',
          background: '#1C1C1E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'white'
          }}>
            AI
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {insight.title}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93'
          }}>
            {formatRelativeTime(insight.timestamp)}
          </div>
        </div>
      </div>

      {/* Message - Reuses CoachMessage bubble pattern */}
      <div style={{
        background: '#1C1C1E',
        borderRadius: '14px',
        padding: '14px 16px',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '14px',
          color: 'white',
          lineHeight: '1.4'
        }}>
          {insight.message}
        </div>
      </div>
    </div>
  );
};
```

### TrendsCard Component (🆕 New)
```javascript
const TrendsCard = ({ 
  trends,
  className = '' 
}) => {
  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500',
      run: '#34C759'
    };
    return colors[discipline] || '#8E8E93';
  };

  const getTrendArrow = (direction) => {
    if (direction === 'positive') {
      return (
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '3px solid transparent',
          borderRight: '3px solid transparent',
          borderBottom: '4px solid #34C759'
        }} />
      );
    } else {
      return (
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '3px solid transparent',
          borderRight: '3px solid transparent',
          borderTop: '4px solid #FF3B30'
        }} />
      );
    }
  };

  return (
    <div className={`trends-card ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          {trends.period}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          Key performance indicators
        </div>
      </div>

      {/* Trend Items */}
      {trends.metrics.map((metric, index) => (
        <div key={index} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          marginBottom: index === trends.metrics.length - 1 ? '0' : '8px',
          background: '#FAFBFC',
          borderRadius: '8px',
          border: '1px solid #F0F0F0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              flexShrink: 0,
              background: getDisciplineColor(metric.discipline)
            }} />
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#000000',
                marginBottom: '2px'
              }}>
                {metric.name}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6D6D80'
              }}>
                {metric.period}
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '13px',
            fontWeight: '500',
            color: metric.change.direction === 'positive' ? '#34C759' : '#FF3B30'
          }}>
            {getTrendArrow(metric.change.direction)}
            <span>{metric.change.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
```

### TrainingLoadChart Component (🆕 New)
```javascript
const TrainingLoadChart = ({ 
  data,
  className = '' 
}) => {
  return (
    <div className={`load-chart ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          {data.title}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          {data.subtitle}
        </div>
      </div>

      {/* Chart Container */}
      <div style={{
        height: '120px',
        background: '#FAFBFC',
        borderRadius: '8px',
        border: '1px solid #F0F0F0',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px',
        gap: '8px'
      }}>
        {data.weeks.map((week, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              background: '#007AFF',
              borderRadius: '2px 2px 0 0',
              minHeight: '8px',
              height: `${week.load}%`,
              opacity: 0.8,
              transition: 'height 0.3s ease'
            }}
            title={week.value ? `Week ${week.week}: ${week.value}` : week.week}
          />
        ))}
      </div>

      {/* Chart Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        padding: '0 16px'
      }}>
        {data.weeks.map((week, index) => (
          <div key={index} style={{
            fontSize: '11px',
            color: '#8E8E93',
            textAlign: 'center',
            flex: 1
          }}>
            {week.week}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### GoalProgressCard Component (🆕 New)
```javascript
const GoalProgressCard = ({ 
  goals,
  className = '' 
}) => {
  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500',
      run: '#34C759'
    };
    return colors[discipline] || '#8E8E93';
  };

  return (
    <div className={`goals-card ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          {goals.raceType}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          {goals.subtitle}
        </div>
      </div>

      {/* Goal Items */}
      {goals.goals.map((goal, index) => (
        <div key={goal.id} style={{
          marginBottom: index === goals.goals.length - 1 ? '0' : '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000'
            }}>
              {goal.name}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6D6D80'
            }}>
              {goal.target}
            </div>
          </div>
          <div style={{
            height: '6px',
            background: '#F2F2F7',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: getDisciplineColor(goal.discipline),
              borderRadius: '3px',
              width: `${goal.progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};
```

### RecommendationsCard Component (🆕 New)
```javascript
const RecommendationsCard = ({ 
  recommendations,
  className = '' 
}) => {
  const getCategoryColor = (category) => {
    const colors = {
      volume: '#007AFF',
      technique: '#FF9500',
      recovery: '#34C759',
      nutrition: '#8E8E93'
    };
    return colors[category] || '#007AFF';
  };

  return (
    <div className={`recommendations-card ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          This Week's Focus
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          AI-generated training adjustments
        </div>
      </div>

      {/* Recommendation Items */}
      {recommendations.map((rec, index) => (
        <div key={rec.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '16px',
          marginBottom: index === recommendations.length - 1 ? '0' : '12px',
          background: '#FAFBFC',
          borderRadius: '10px',
          border: '1px solid #F0F0F0'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: getCategoryColor(rec.category),
            flexShrink: 0,
            marginTop: '6px'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '4px'
            }}>
              {rec.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#3C3C43',
              lineHeight: '1.4'
            }}>
              {rec.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Navigation Actions

### Primary Actions
- **View all** (insights) → Navigate to full insights history
- **Details** (trends) → Navigate to detailed performance analytics
- **Edit goals** → Navigate to goal management page

### Secondary Actions
- **Insight cards** → Detailed insight view with context
- **Chart interactions** → Hover states for data points
- **Recommendation actions** → Apply suggestion or dismiss

## State Management

### Required State
```javascript
const [coachData, setCoachData] = useState(null);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [selectedInsight, setSelectedInsight] = useState(null);
```

### Data Fetching
```javascript
const fetchCoachAnalytics = async () => {
  // Fetch from multiple endpoints
  const [insights, trends, goals, recommendations] = await Promise.all([
    fetchInsights(),
    fetchPerformanceTrends(),
    fetchGoalProgress(),
    fetchRecommendations()
  ]);
  
  return {
    insights,
    trends,
    trainingLoad: trends.trainingLoad,
    goals,
    recommendations
  };
};
```

## AI Integration

### Insight Generation
```javascript
const generateInsights = async (userData) => {
  const prompt = `
    Analyze the following training data and provide insights:
    ${JSON.stringify(userData)}
    
    Focus on:
    - Performance trends and improvements
    - Recovery patterns
    - Training effectiveness
    - Upcoming workout recommendations
    
    Respond with actionable insights in JSON format.
  `;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500
  });
  
  return JSON.parse(response.choices[0].message.content);
};
```

## Performance Considerations

### Data Optimization
- Cache insights for 1 hour
- Load trends data progressively
- Implement pull-to-refresh for real-time updates
- Optimize chart rendering for smooth animations

### Mobile Performance
- Lazy load chart components
- Implement skeleton loading states
- Optimize image and icon loading
- Progressive data loading for large datasets

## Responsive Behavior

### Mobile Adaptations (≤375px)
- Chart maintains aspect ratio
- Trend items stack properly
- Goal progress bars scale appropriately
- Padding adjustments: 24px → 16px

## Future Enhancements

### Advanced Analytics
- Interactive charts with zoom/pan
- Comparative analysis with other athletes
- Predictive performance modeling
- Custom metric tracking

### AI Improvements
- Conversational chat interface
- Voice-activated insights
- Proactive notifications
- Personalized coaching style adaptation

### Integration Features
- Export insights to PDF
- Share progress with coaches
- Integration with additional data sources
- Custom goal creation and tracking