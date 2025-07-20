# Core Components Documentation

## Overview
Essential reusable components that form the foundation of the app. These components are used across multiple pages and provide consistent UI patterns.

## Components

### WorkoutCard
**Purpose:** Standard workout display component with discipline indicator, title, and metrics
**Used in:** Dashboard lists, Plan timeline, Profile history
**Variants:** default, mini, completed

#### Implementation
```javascript
const WorkoutCard = ({ 
  workout,
  variant = 'default',
  onAction,
  className = ''
}) => {
  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500', 
      run: '#34C759',
      brick: 'conic-gradient(#007AFF 0deg 120deg, #FF9500 120deg 240deg, #34C759 240deg 360deg)'
    };
    return colors[discipline] || colors.run;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      scheduled: { bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
      completed: { bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
      missed: { bg: 'rgba(255, 59, 48, 0.1)', color: '#FF3B30' },
      skipped: { bg: 'rgba(142, 142, 147, 0.1)', color: '#8E8E93' }
    };
    return statusColors[status] || { bg: '#F2F2F7', color: '#8E8E93' };
  };

  const statusStyle = getStatusColor(workout.status);
  const disciplineColor = getDisciplineColor(workout.discipline);

  return (
    <div 
      className={`workout-card ${className}`}
      onClick={onAction}
      style={{
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
        border: '0.5px solid rgba(0,0,0,0.05)',
        cursor: onAction ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
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
            color: '#000000',
            marginBottom: '2px'
          }}>
            {workout.title}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80'
          }}>
            {formatDate(workout.scheduledDate)}
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
          {workout.status}
        </div>
      </div>
      
      {/* Metrics */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid #F2F2F7'
      }}>
        <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #F2F2F7' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {workout.metrics?.heartRate || 'Zone 2'}
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Heart Rate
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #F2F2F7' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {workout.metrics?.duration || '60 min'}
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Duration
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {workout.metrics?.distance || '10 km'}
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Distance
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
const workout = {
  id: string,
  title: string,
  discipline: 'swim' | 'bike' | 'run' | 'brick',
  scheduledDate: Date,
  status: 'scheduled' | 'completed' | 'missed' | 'skipped',
  metrics: {
    heartRate: string,
    duration: string,
    distance: string
  }
}
```

---

### TodaysWorkout
**Purpose:** Enhanced workout card for dashboard hero component with description and details link
**Used in:** Dashboard main feature
**Extends:** WorkoutCard pattern

#### Implementation
```javascript
const TodaysWorkout = ({ 
  workout,
  onViewDetails,
  onStart,
  className = ''
}) => {
  // Reuses WorkoutCard styling and logic
  
  return (
    <div className={`todays-workout ${className}`} style={{
      background: 'white',
      borderRadius: '16px', // Slightly larger than WorkoutCard
      padding: '20px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)', // Enhanced shadow
      border: '0.5px solid rgba(0,0,0,0.04)',
      cursor: onViewDetails ? 'pointer' : 'default',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      {/* Header - Identical to WorkoutCard */}
      {/* Brief Description - NEW */}
      {workout.description && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            fontSize: '15px',
            color: '#3C3C43',
            lineHeight: '1.3',
            margin: 0
          }}>
            {workout.description}
          </p>
        </div>
      )}
      
      {/* Metrics - Identical to WorkoutCard */}
      
      {/* View Details Link - NEW */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        color: '#007AFF',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        <span>View workout details</span>
        <div style={{
          width: '6px',
          height: '6px',
          borderRight: '1.5px solid #007AFF',
          borderTop: '1.5px solid #007AFF',
          transform: 'rotate(45deg)'
        }} />
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
// Extends WorkoutCard data structure
const workout = {
  // ...WorkoutCard fields
  description: string // Brief workout description
}
```

---

### StatCard
**Purpose:** Display key metrics with change indicators
**Used in:** Dashboard stats, Plan analytics, Profile metrics
**Variants:** small, medium, large

#### Implementation
```javascript
const StatCard = ({ 
  value, 
  label, 
  change, 
  changeType = 'neutral',
  size = 'medium',
  className = '' 
}) => {
  const getChangeColor = (type) => {
    const colors = {
      positive: '#34C759',
      negative: '#FF3B30', 
      neutral: '#8E8E93'
    };
    return colors[type] || colors.neutral;
  };

  const getSizeStyles = (size) => {
    const sizes = {
      small: { padding: '12px', fontSize: '16px' },
      medium: { padding: '16px', fontSize: '18px' },
      large: { padding: '20px', fontSize: '20px' }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles(size);

  return (
    <div className={`stat-card ${className}`} style={{
      background: 'white',
      borderRadius: '12px',
      padding: sizeStyles.padding,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '0.5px solid rgba(0,0,0,0.04)',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: sizeStyles.fontSize,
        fontWeight: '600',
        color: '#000000',
        marginBottom: '4px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#8E8E93',
        fontWeight: '400'
      }}>
        {label}
      </div>
      {change && (
        <div style={{
          fontSize: '11px',
          marginTop: '2px',
          fontWeight: '500',
          color: getChangeColor(changeType)
        }}>
          {change}
        </div>
      )}
    </div>
  );
};
```

#### Data Structure
```javascript
const stat = {
  value: string | number,
  label: string,
  change?: string,
  changeType?: 'positive' | 'negative' | 'neutral'
}
```

---

### SectionHeader
**Purpose:** Consistent section headers with optional action buttons
**Used in:** All pages for section organization
**Variants:** default, with-action

#### Implementation
```javascript
const SectionHeader = ({ 
  title, 
  actionText, 
  onAction,
  className = '' 
}) => {
  return (
    <div className={`section-header ${className}`} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#1C1C1E',
        margin: 0
      }}>
        {title}
      </h2>
      {actionText && (
        <button
          onClick={onAction}
          style={{
            fontSize: '14px',
            color: '#007AFF',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
```

---

### CoachMessage
**Purpose:** AI coach message display with avatar and attribution
**Used in:** Dashboard insights, Coach page chat, Weekly view guidance

#### Implementation
```javascript
const CoachMessage = ({ 
  message, 
  attribution = 'AI Coach',
  timestamp,
  variant = 'default', // 'default', 'compact'
  className = '' 
}) => {
  const getAvatarSize = (variant) => {
    return variant === 'compact' ? '24px' : '32px';
  };

  const avatarSize = getAvatarSize(variant);

  return (
    <div className={`coach-insights ${className}`} style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '4px 0'
    }}>
      <div style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: `calc(${avatarSize} / 2)`,
        background: '#1C1C1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '2px'
      }}>
        <div style={{
          fontSize: variant === 'compact' ? '10px' : '12px',
          fontWeight: '600',
          color: 'white'
        }}>
          AI
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          background: '#1C1C1E',
          borderRadius: '16px',
          padding: variant === 'compact' ? '12px 14px' : '16px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '0.5px solid rgba(0,0,0,0.08)',
          position: 'relative',
          marginBottom: '6px'
        }}>
          <div style={{
            fontSize: variant === 'compact' ? '13px' : '15px',
            color: 'white',
            lineHeight: '1.4',
            fontWeight: '400'
          }}>
            {message}
          </div>
        </div>
        <div style={{
          fontSize: '12px',
          color: '#8E8E93',
          textAlign: 'right',
          fontWeight: '400'
        }}>
          {attribution}
          {timestamp && (
            <span style={{ marginLeft: '8px' }}>
              {formatRelativeTime(timestamp)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
const message = {
  id: string,
  text: string,
  timestamp?: Date,
  type?: 'insight' | 'motivation' | 'adjustment'
}
```

---

### WeeklyWorkoutList
**Purpose:** Display 7-day workout overview with progress
**Used in:** Dashboard overview, Plan page weekly drill-down
**Variants:** with-progress, compact

#### Implementation
```javascript
const WeeklyWorkoutList = ({ 
  week, 
  currentDay,
  onWorkoutClick,
  showProgress = true,
  variant = 'default',
  className = '' 
}) => {
  return (
    <div className={`week-overview ${className}`} style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      border: '0.5px solid rgba(0,0,0,0.04)'
    }}>
      {/* Progress Header */}
      {showProgress && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '4px'
          }}>
            Week {week.weekNumber} • {week.phase}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80'
          }}>
            {week.progress.completed} of {week.progress.total} workouts complete
          </div>
        </div>
      )}
      
      {/* Workout Items */}
      {week.workouts.map((workout, index) => (
        <WorkoutMiniItem
          key={workout.id}
          workout={workout}
          isToday={workout.day.isToday}
          onClick={() => onWorkoutClick && onWorkoutClick(workout)}
          style={{
            borderBottom: index === week.workouts.length - 1 ? 'none' : '1px solid #F8F9FA',
            paddingBottom: index === week.workouts.length - 1 ? '0' : '12px'
          }}
        />
      ))}
    </div>
  );
};
```

---

### WorkoutMiniItem
**Purpose:** Single workout row display for lists and timelines
**Used in:** WeeklyWorkoutList, Plan timeline, Dashboard weekly overview

#### Implementation
```javascript
const WorkoutMiniItem = ({ 
  workout, 
  isToday = false,
  onClick,
  className = '' 
}) => {
  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500',
      run: '#34C759',
      rest: '#8E8E93',
      brick: '#FF9500'
    };
    return colors[discipline] || colors.rest;
  };

  return (
    <div 
      className={`workout-item ${className}`}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid #F8F9FA',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Day */}
      <div style={{
        width: '32px',
        textAlign: 'center',
        flexShrink: 0
      }}>
        <div style={{
          fontSize: '11px',
          color: '#8E8E93',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '2px'
        }}>
          {workout.day.name}
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: isToday ? '#007AFF' : '#000000'
        }}>
          {workout.day.number}
        </div>
      </div>
      
      {/* Discipline Dot */}
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        flexShrink: 0,
        background: getDisciplineColor(workout.discipline)
      }} />
      
      {/* Workout Info */}
      <div style={{
        flex: 1,
        minWidth: 0
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#000000',
          marginBottom: '2px'
        }}>
          {workout.title}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6D6D80'
        }}>
          {workout.description}
        </div>
      </div>
      
      {/* Duration */}
      <div style={{
        fontSize: '13px',
        color: '#8E8E93',
        fontWeight: '400',
        whiteSpace: 'nowrap'
      }}>
        {workout.duration}
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
const workoutMini = {
  id: string,
  day: {
    name: string, // 'Mon', 'Tue', etc.
    number: number,
    isToday: boolean
  },
  discipline: 'swim' | 'bike' | 'run' | 'rest' | 'brick',
  title: string,
  description: string,
  duration: string,
  status: 'scheduled' | 'completed' | 'missed' | 'skipped'
}
```

## Utility Functions

### Date Formatting
```javascript
const formatDate = (date) => {
  if (!date) return 'No date';
  const today = new Date();
  const workoutDate = new Date(date);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (workoutDate.toDateString() === today.toDateString()) {
    return `Today, ${workoutDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else if (workoutDate.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow, ${workoutDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else {
    return workoutDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }
};

const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
```

## Component Guidelines

### Consistency Rules
1. **Always use design system colors** - No hardcoded colors outside the defined palette
2. **Maintain spacing standards** - Use spacing scale for all margins/padding
3. **Follow typography hierarchy** - Use defined font sizes and weights
4. **Implement hover states** - All interactive elements need hover feedback
5. **Include loading states** - Components should handle loading gracefully

### Accessibility
- Proper semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management

### Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid inline function creation in render
- Lazy load non-critical components