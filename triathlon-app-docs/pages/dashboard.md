# Dashboard Page Documentation

## Overview
The main app dashboard featuring today's workout, weekly progress stats, AI coach insights, and upcoming training overview.

## Component Composition
```
Dashboard
├── AppHeader (greeting + motivation)
├── Section (Today's Workout)
│   ├── SectionHeader
│   └── TodaysWorkout
├── Section (This Week Stats)
│   ├── SectionHeader
│   └── StatsGrid
│       └── StatCard × 3
├── Section (Coach Insights)
│   └── CoachMessage
└── Section (Week Overview)
    ├── SectionHeader
    └── WeeklyWorkoutList
        └── WorkoutMiniItem × 7
```

## Data Requirements

### Dashboard Data Structure
```javascript
const dashboardData = {
  user: {
    name: string,
    greeting: string, // "Good morning", "Good afternoon"
    motivation: string // "Let's get to training"
  },
  todaysWorkout: {
    // See TodaysWorkout component data structure
  },
  weekStats: [
    { value: "3", label: "Completed", change: "+1 vs last week", changeType: "positive" },
    { value: "420", label: "Total Min", change: "+45 min", changeType: "positive" },
    { value: "2", label: "Remaining", change: "On track", changeType: "neutral" }
  ],
  coachInsight: {
    message: string,
    timestamp: Date
  },
  currentWeek: {
    // See WeeklyWorkoutList component data structure
  }
}
```

## Component Implementations

### AppHeader
```javascript
const AppHeader = ({ user, className = '' }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className={`header-section ${className}`} style={{
      background: '#F2F2F7',
      padding: '60px 24px 24px',
      position: 'relative'
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '4px',
        lineHeight: '1.2',
        color: '#000000'
      }}>
        {getGreeting()}, {user.name}.
      </div>
      <div style={{
        fontSize: '17px',
        fontWeight: '400',
        color: '#6D6D80'
      }}>
        Let's get to training
      </div>
    </div>
  );
};
```

### StatsGrid
```javascript
const StatsGrid = ({ stats, className = '' }) => {
  return (
    <div className={`quick-stats-grid ${className}`} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px'
    }}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          label={stat.label}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
};
```

### Dashboard Main Component
```javascript
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Fetch from Supabase
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
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
      <AppHeader user={dashboardData.user} />
      
      <div style={{ padding: '24px' }}>
        {/* Today's Workout */}
        <div style={{ marginBottom: '32px' }}>
          <SectionHeader 
            title="Today's Workout"
          />
          <TodaysWorkout 
            workout={dashboardData.todaysWorkout}
            onViewDetails={() => navigate('/workout-detail')}
          />
        </div>

        {/* This Week Stats */}
        <div style={{ marginBottom: '32px' }}>
          <SectionHeader 
            title="This Week"
            actionText="View all"
            onAction={() => navigate('/plan')}
          />
          <StatsGrid stats={dashboardData.weekStats} />
        </div>

        {/* Coach Insights */}
        <div style={{ marginBottom: '32px' }}>
          <CoachMessage 
            message={dashboardData.coachInsight.message}
            timestamp={dashboardData.coachInsight.timestamp}
          />
        </div>

        {/* Week Overview */}
        <div>
          <SectionHeader 
            title="Week Overview"
            actionText="View calendar"
            onAction={() => navigate('/plan')}
          />
          <WeeklyWorkoutList 
            week={dashboardData.currentWeek}
            onWorkoutClick={(workout) => navigate(`/workout/${workout.id}`)}
          />
        </div>
      </div>
    </div>
  );
};
```

## Responsive Behavior

### Mobile Adaptations (≤375px)
- Stats grid: 3 columns → 2 columns
- Today's workout metrics: Horizontal → Vertical stack
- Week overview: Maintains list format
- Padding adjustments: 24px → 16px

### CSS Media Queries
```css
@media (max-width: 375px) {
  .quick-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .workout-quick-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .quick-stat {
    border-right: none !important;
    border-bottom: 1px solid #F2F2F7;
    padding-bottom: 8px;
  }
  
  .quick-stat:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
```

## Navigation Actions

### Primary Actions
- **Today's Workout** → Navigate to WorkoutDetail
- **View all** (stats) → Navigate to Plan page
- **View calendar** → Navigate to Plan page with current week

### Secondary Actions
- **Workout in week overview** → Navigate to specific workout detail
- **Coach message** → Navigate to Coach page (future)

## State Management

### Required State
```javascript
const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [refreshing, setRefreshing] = useState(false);
```

### Data Fetching
- Initial load: Fetch all dashboard data
- Real-time updates: Subscribe to workout completion events
- Pull-to-refresh: Reload dashboard data
- Background sync: Update Strava data

## Performance Considerations
- Lazy load week overview workouts
- Cache coach insights for 1 hour
- Optimize image loading for user avatar
- Implement pull-to-refresh for data updates

## Future Enhancements
- Customizable dashboard widgets
- Weather integration for outdoor workouts
- Quick action buttons (complete workout, reschedule)
- Achievement notifications