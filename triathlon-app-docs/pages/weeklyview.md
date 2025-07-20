# Weekly View Documentation

## Overview
Detailed weekly training plan view showing week overview, AI coach insights, and individual daily workout cards with completion status.

## Component Composition
```
WeeklyView
├── HeaderWithBack (navigation)
├── WeekOverviewCard (summary)
├── CoachInsights (weekly guidance)
└── DailyWorkouts
    ├── SectionHeader
    └── DailyWorkoutCard × 7
```

## Data Requirements

### Weekly Data Structure
```javascript
const weeklyData = {
  week: {
    id: string,
    number: number,
    phase: 'base' | 'build' | 'peak' | 'taper' | 'recovery',
    dateRange: string, // 'July 7-13'
    status: 'completed' | 'current' | 'upcoming',
    title: string, // 'Base Building Focus'
    subtitle: string, // 'Aerobic development with threshold introduction'
    description: string,
    metrics: {
      targetVolume: string, // '7.5h'
      totalWorkouts: number, // 10
      completed: string // '3/10'
    }
  },
  coachInsights: {
    title: string, // 'Week 8 Focus'
    subtitle: string, // 'Key training objectives and guidance'
    message: string,
    notes: string[] // Array of bullet points
  },
  dailyWorkouts: [
    {
      id: string,
      day: string, // 'Monday'
      date: string, // 'July 7'
      discipline: 'swim' | 'bike' | 'run' | 'rest' | 'brick',
      title: string, // 'Morning Swim'
      description: string,
      status: 'completed' | 'scheduled' | 'rest',
      isToday: boolean,
      metrics: {
        heartRate: string, // 'Zone 2'
        duration: string, // '45 min'
        distance: string // '2000m'
      }
    }
  ]
}
```

## Component Implementations

### WeeklyView Main Component
```javascript
const WeeklyView = ({ weekId }) => {
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadWeeklyData(weekId);
  }, [weekId]);

  const loadWeeklyData = async (id) => {
    try {
      const data = await fetchWeeklyData(id);
      setWeeklyData(data);
    } catch (error) {
      console.error('Error loading weekly data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/plan');
  };

  const handleWorkoutClick = (workout) => {
    navigate(`/workout/${workout.id}`);
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
        <HeaderWithBack 
          onBack={handleBack}
          backText="Training Plan"
        />
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Week {weeklyData.week.number}
        </h1>
        
        <WeekOverviewCard week={weeklyData.week} />
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 24px 24px' }}>
        {/* Coach Insights */}
        <CoachInsightsCard 
          insights={weeklyData.coachInsights}
          style={{ marginBottom: '24px' }}
        />

        {/* Daily Workouts */}
        <div>
          <SectionHeader title="This Week's Workouts" />
          {weeklyData.dailyWorkouts.map((workout) => (
            <DailyWorkoutCard
              key={workout.id}
              workout={workout}
              onClick={() => handleWorkoutClick(workout)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

### WeekOverviewCard Component
```javascript
const WeekOverviewCard = ({ week, className = '' }) => {
  const getPhaseColor = (phase) => {
    const colors = {
      base: '#007AFF',
      build: '#FF9500',
      peak: '#FF3B30',
      recovery: '#34C759',
      taper: '#8E8E93'
    };
    return colors[phase] || colors.base;
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: { bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
      current: { bg: 'rgba(0, 122, 255, 0.1)', color: '#007AFF' },
      upcoming: { bg: '#F2F2F7', color: '#8E8E93' }
    };
    return styles[status] || styles.upcoming;
  };

  const phaseColor = getPhaseColor(week.phase);
  const statusStyle = getStatusStyle(week.status);

  return (
    <div className={`week-overview ${className}`} style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      border: '0.5px solid rgba(0,0,0,0.04)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          flexShrink: 0,
          background: phaseColor
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '2px'
          }}>
            {week.title}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80'
          }}>
            {week.subtitle}
          </div>
        </div>
        <div style={{
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '12px',
          background: statusStyle.bg,
          color: statusStyle.color,
          fontWeight: '400'
        }}>
          {week.status === 'current' ? 'In Progress' : 
           week.status === 'completed' ? 'Completed' : 'Upcoming'}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontSize: '15px',
          color: '#3C3C43',
          lineHeight: '1.4',
          margin: 0
        }}>
          {week.description}
        </p>
      </div>

      {/* Metrics */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid #F2F2F7'
      }}>
        <div style={{
          textAlign: 'center',
          flex: 1,
          borderRight: '1px solid #F2F2F7'
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {week.metrics.targetVolume}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            Target Volume
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          flex: 1,
          borderRight: '1px solid #F2F2F7'
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {week.metrics.totalWorkouts}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            Workouts
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {week.metrics.completed}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            {week.status === 'completed' ? 'Completed' : 'Progress'}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### CoachInsightsCard Component
```javascript
const CoachInsightsCard = ({ insights, className = '' }) => {
  return (
    <div className={`coach-insights ${className}`} style={{
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
          {insights.title}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          {insights.subtitle}
        </div>
      </div>

      {/* Coach Message */}
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
        <div style={{
          background: '#1C1C1E',
          borderRadius: '14px',
          padding: '14px 16px',
          position: 'relative',
          flex: 1
        }}>
          <div style={{
            fontSize: '14px',
            color: 'white',
            lineHeight: '1.4'
          }}>
            {insights.message}
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div style={{
        background: '#FAFBFC',
        borderRadius: '10px',
        padding: '16px',
        border: '1px solid #F0F0F0'
      }}>
        {insights.notes.map((note, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: index === insights.notes.length - 1 ? '0' : '12px'
          }}>
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#8E8E93',
              marginTop: '6px',
              flexShrink: 0
            }} />
            <div style={{
              fontSize: '14px',
              color: '#3C3C43',
              lineHeight: '1.4'
            }}>
              {note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### DailyWorkoutCard Component
```javascript
const DailyWorkoutCard = ({ workout, onClick, className = '' }) => {
  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500',
      run: '#34C759',
      rest: '#8E8E93',
      brick: 'conic-gradient(#007AFF 0deg 120deg, #FF9500 120deg 240deg, #34C759 240deg 360deg)'
    };
    return colors[discipline] || colors.rest;
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: { bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
      scheduled: { bg: 'rgba(0, 122, 255, 0.1)', color: '#007AFF' },
      rest: { bg: 'rgba(142, 142, 147, 0.1)', color: '#8E8E93' }
    };
    return styles[status] || styles.scheduled;
  };

  const isRestDay = workout.discipline === 'rest';
  const isCompleted = workout.status === 'completed';
  const disciplineColor = getDisciplineColor(workout.discipline);
  const statusStyle = getStatusStyle(workout.status);

  return (
    <div 
      className={`daily-workout ${className} ${isCompleted ? 'completed' : ''} ${isRestDay ? 'rest-day' : ''}`}
      onClick={onClick}
      style={{
        background: isCompleted ? '#FAFBFC' : isRestDay ? '#FAFBFC' : 'white',
        border: isRestDay ? '1px dashed #E5E5EA' : isCompleted ? '0.5px solid rgba(52, 199, 89, 0.2)' : '0.5px solid rgba(0,0,0,0.05)',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
        marginBottom: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 3px 12px rgba(0,0,0,0.05)';
        }
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          flexShrink: 0,
          background: disciplineColor
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '17px',
            fontWeight: '600',
            color: isRestDay ? '#8E8E93' : '#000000',
            marginBottom: '2px'
          }}>
            {workout.title}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80'
          }}>
            {workout.day}, {workout.date}{workout.isToday ? ' • Today' : ''}{isCompleted ? ' • Completed' : ''}
          </div>
        </div>
        <div style={{
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '12px',
          background: statusStyle.bg,
          color: statusStyle.color,
          fontWeight: '400',
          textTransform: 'capitalize'
        }}>
          {workout.status === 'rest' ? 'Rest' : 
           workout.status === 'completed' ? 'Completed' : 'Scheduled'}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontSize: '14px',
          color: isRestDay ? '#8E8E93' : '#3C3C43',
          lineHeight: '1.3',
          fontStyle: isRestDay ? 'italic' : 'normal',
          margin: 0
        }}>
          {workout.description}
        </p>
      </div>

      {/* Metrics */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid #F2F2F7'
      }}>
        <div style={{
          textAlign: 'center',
          flex: 1,
          borderRight: '1px solid #F2F2F7'
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {workout.metrics.heartRate}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            {isRestDay ? 'Intensity' : 'Target HR'}
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          flex: 1,
          borderRight: '1px solid #F2F2F7'
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {workout.metrics.duration}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            {isRestDay ? 'Optional' : 'Duration'}
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '4px'
          }}>
            {workout.metrics.distance}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            Distance
          </div>
        </div>
      </div>
    </div>
  );
};
```

## Navigation Actions

### Primary Actions
- **Back Button** → Navigate to Plan page
- **Daily Workout Click** → Navigate to WorkoutDetail

### Secondary Actions
- **Coach Message** → Navigate to Coach page (future)

## Responsive Behavior

### Mobile Adaptations (≤375px)
- Week overview metrics stack vertically
- Daily workout metrics stack vertically
- Padding adjustments: 24px → 16px

## State Management

### Required State
```javascript
const [weeklyData, setWeeklyData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## Performance Considerations
- Pre-load adjacent weeks for smooth navigation
- Cache weekly data for offline viewing
- Optimize coach insights for quick loading

## Future Enhancements
- Swipe between weeks
- Quick workout actions (complete, skip, reschedule)
- Week summary statistics
- Progress visualization