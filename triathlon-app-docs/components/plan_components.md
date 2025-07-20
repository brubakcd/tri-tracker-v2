# Plan Components Documentation

## Overview
Specialized components for training plan display, navigation, and management. These components handle the complex training plan structure and provide intuitive navigation through weeks and phases.

## Components

### PlanOverviewCard
**Purpose:** Hero component showing plan summary, progress, and race countdown
**Used in:** Plan page header, Profile plan summary
**Extends:** StatCard pattern for metrics

#### Implementation
```javascript
const PlanOverviewCard = ({ 
  plan, 
  progress, 
  raceCountdown, 
  currentPhase,
  className = '' 
}) => {
  return (
    <div className={`plan-overview ${className}`} style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      border: '0.5px solid rgba(0,0,0,0.04)',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '17px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          {plan.name}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          {plan.subtitle}
        </div>
      </div>

      {/* Race Countdown */}
      <div style={{
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#FF9500',
          marginBottom: '2px'
        }}>
          {raceCountdown.weeks}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6D6D80',
          fontWeight: '500'
        }}>
          weeks until race
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
          {plan.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#FAFBFC',
        borderRadius: '10px',
        border: '1px solid #F0F0F0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#000000'
          }}>
            Training Progress
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6D6D80'
          }}>
            Week {plan.currentWeek} of {plan.totalWeeks}
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
            background: '#FF9500',
            borderRadius: '3px',
            width: `${progress.percentage}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Stats - Reuses StatCard pattern */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid #F2F2F7',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #F2F2F7' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {progress.completed}
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Completed
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #F2F2F7' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {progress.remaining}
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Remaining
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
            {progress.percentage}%
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: '400' }}>
            Complete
          </div>
        </div>
      </div>
      
      {/* Current Phase */}
      <div style={{
        padding: '16px',
        background: '#FAFBFC',
        borderRadius: '10px',
        border: '1px solid #F0F0F0',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '2px'
        }}>
          Current: {currentPhase.name}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6D6D80'
        }}>
          {currentPhase.description}
        </div>
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
const planOverview = {
  plan: {
    id: string,
    name: string,
    subtitle: string,
    description: string,
    totalWeeks: number,
    currentWeek: number
  },
  raceCountdown: {
    weeks: number,
    days: number
  },
  progress: {
    completed: string,
    remaining: string,
    percentage: number
  },
  currentPhase: {
    name: string,
    description: string
  }
}
```

---

### FilterPills
**Purpose:** Horizontal scrolling filter interface with multiple variants
**Used in:** Plan page phases, Week navigation, Coach page filters, Profile filters
**Variants:** phase, week, default

#### Implementation
```javascript
const FilterPills = ({ 
  filters, 
  activeFilter, 
  onFilterChange,
  variant = 'default',
  className = '' 
}) => {
  const getFilterStyle = (filter, isActive) => {
    let backgroundColor = 'white';
    let textColor = '#3C3C43';
    let borderColor = '#E5E5EA';
    
    // Handle different status types for week variant
    if (variant === 'week' && filter.status) {
      if (filter.status === 'completed') {
        backgroundColor = '#34C759';
        textColor = 'white';
        borderColor = '#34C759';
      } else if (filter.status === 'current' || isActive) {
        backgroundColor = '#007AFF';
        textColor = 'white';
        borderColor = '#007AFF';
      }
    } else if (isActive) {
      backgroundColor = '#007AFF';
      textColor = 'white';
      borderColor = '#007AFF';
    }

    return { backgroundColor, textColor, borderColor };
  };

  return (
    <div className={`filter-pills ${className}`} style={{
      display: 'flex',
      gap: variant === 'week' ? '8px' : '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {filters.map((filter) => {
        const isActive = filter.id === activeFilter;
        const { backgroundColor, textColor, borderColor } = getFilterStyle(filter, isActive);

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            style={{
              padding: variant === 'week' ? '8px 12px' : '8px 16px',
              borderRadius: variant === 'week' ? '16px' : '20px',
              fontSize: variant === 'week' ? '13px' : '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              border: `1px solid ${borderColor}`,
              background: backgroundColor,
              color: textColor,
              flexShrink: 0,
              minWidth: variant === 'week' ? '48px' : 'auto',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isActive && filter.status !== 'completed') {
                e.target.style.background = '#F8F9FA';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && filter.status !== 'completed') {
                e.target.style.background = backgroundColor;
              }
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
```

#### Data Structure
```javascript
const filters = [
  {
    id: string,
    label: string,
    status?: 'completed' | 'current' | 'upcoming' // For week variant
  }
]
```

---

### WeekCard
**Purpose:** Weekly training overview with workout previews and metrics
**Used in:** Plan page, Profile training history
**Extends:** WorkoutCard pattern with additional complexity

#### Implementation
```javascript
const WeekCard = ({ 
  week, 
  phase,
  onClick,
  isCurrentWeek = false,
  className = '' 
}) => {
  const getPhaseColor = (phaseName) => {
    const colors = {
      base: '#007AFF',
      build: '#FF9500',
      peak: '#FF3B30',
      recovery: '#34C759',
      taper: '#8E8E93'
    };
    return colors[phaseName] || colors.base;
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: { bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
      current: { bg: 'rgba(0, 122, 255, 0.1)', color: '#007AFF' },
      upcoming: { bg: '#F2F2F7', color: '#8E8E93' }
    };
    return styles[status] || styles.upcoming;
  };

  const getDisciplineColor = (discipline) => {
    const colors = {
      swim: '#007AFF',
      bike: '#FF9500',
      run: '#34C759',
      brick: 'conic-gradient(#007AFF 0deg 120deg, #FF9500 120deg 240deg, #34C759 240deg 360deg)'
    };
    return colors[discipline] || colors.run;
  };

  const statusStyle = getStatusStyle(week.status);
  const phaseColor = getPhaseColor(phase);

  return (
    <div 
      className={`week-card ${className} ${isCurrentWeek ? 'current' : ''}`}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: isCurrentWeek ? '0 3px 12px rgba(0,122,255,0.15)' : '0 3px 12px rgba(0,0,0,0.05)',
        border: isCurrentWeek ? '1px solid #007AFF' : '0.5px solid rgba(0,0,0,0.05)',
        marginBottom: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
    >
      {/* Week Header */}
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
        <div style={{
          flex: 1,
          minWidth: 0
        }}>
          <div style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '2px'
          }}>
            Week {week.number}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80'
          }}>
            {week.dateRange}
          </div>
        </div>
        <div style={{
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '12px',
          background: statusStyle.bg,
          color: statusStyle.color,
          fontWeight: '400',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          {week.status === 'current' ? 'In Progress' : 
           week.status === 'completed' ? 'Completed' : 'Upcoming'}
        </div>
      </div>

      {/* Workout Previews */}
      <div style={{ marginBottom: '16px' }}>
        {week.workoutPreviews?.map((workout, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: index === week.workoutPreviews.length - 1 ? '0' : '8px'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              flexShrink: 0,
              background: getDisciplineColor(workout.discipline)
            }} />
            <span style={{
              fontSize: '14px',
              color: '#3C3C43',
              lineHeight: '1.3'
            }}>
              {workout.description}
            </span>
          </div>
        ))}
      </div>

      {/* Week Metrics - Reuses WorkoutCard metric pattern */}
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
            {week.metrics.totalTime}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            {week.status === 'completed' ? 'Total Time' : 'Target Time'}
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
            {week.metrics.distance}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            Distance
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
            {week.metrics.completion}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8E8E93',
            fontWeight: '400'
          }}>
            {week.status === 'completed' ? 'Completed' : 
             week.status === 'current' ? 'Progress' : 'Planned'}
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Data Structure
```javascript
const week = {
  id: string,
  number: number,
  phase: 'base' | 'build' | 'peak' | 'taper' | 'recovery',
  dateRange: string,
  status: 'completed' | 'current' | 'upcoming',
  workoutPreviews: [
    {
      discipline: 'swim' | 'bike' | 'run' | 'brick',
      count: number,
      description: string
    }
  ],
  metrics: {
    totalTime: string,
    distance: string,
    completion: string
  }
}
```

---

### PhaseDivider
**Purpose:** Visual separator between training phases
**Used in:** Plan page phase transitions
**Variants:** default, with-icon

#### Implementation
```javascript
const PhaseDivider = ({ 
  text, 
  icon,
  className = '' 
}) => {
  return (
    <div className={`phase-divider ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '32px 0 24px'
    }}>
      <div style={{
        flex: 1,
        height: '1px',
        background: '#E5E5EA'
      }} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: icon ? '8px' : '0',
        fontSize: '14px',
        color: '#8E8E93',
        fontWeight: '500',
        padding: '0 4px',
        whiteSpace: 'nowrap'
      }}>
        {icon && (
          <div style={{
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
        )}
        {text}
      </div>
      <div style={{
        flex: 1,
        height: '1px',
        background: '#E5E5EA'
      }} />
    </div>
  );
};
```

---

### PhaseSection
**Purpose:** Container component for grouping weeks by training phase
**Used in:** Plan page phase organization
**Variants:** collapsed, expanded

#### Implementation
```javascript
const PhaseSection = ({ 
  phase, 
  weeks,
  activePhaseFilter,
  onWeekClick,
  collapsed = false,
  className = '' 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  
  // Hide if filtered out
  if (activePhaseFilter !== 'all' && activePhaseFilter !== phase.id) {
    return null;
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`phase-section ${className}`} style={{
      marginBottom: '32px'
    }}>
      {/* Phase Header */}
      <div style={{
        marginBottom: '16px',
        cursor: 'pointer'
      }} onClick={handleToggleCollapse}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1C1C1E',
              marginBottom: '4px'
            }}>
              {phase.name}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6D6D80'
            }}>
              {phase.subtitle}
            </div>
          </div>
          {/* Collapse/Expand Icon */}
          <div style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.15s ease'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRight: '2px solid #8E8E93',
              borderBottom: '2px solid #8E8E93',
              transform: 'rotate(45deg)'
            }} />
          </div>
        </div>
      </div>

      {/* Week Cards */}
      {!isCollapsed && weeks.map((week) => (
        <WeekCard
          key={week.id}
          week={week}
          phase={phase.id}
          onClick={() => onWeekClick(week)}
          isCurrentWeek={week.status === 'current'}
        />
      ))}
      
      {/* Collapsed Summary */}
      {isCollapsed && (
        <div style={{
          background: '#FAFBFC',
          borderRadius: '10px',
          padding: '16px',
          border: '1px solid #F0F0F0'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6D6D80',
            textAlign: 'center'
          }}>
            {weeks.length} weeks • Click to expand
          </div>
        </div>
      )}
    </div>
  );
};
```

---

### PlanNavigation
**Purpose:** Week-to-week navigation within plan views
**Used in:** Plan page, Weekly view navigation
**Variants:** arrows, pills, timeline

#### Implementation
```javascript
const PlanNavigation = ({ 
  currentWeek,
  totalWeeks,
  onWeekChange,
  variant = 'arrows',
  className = '' 
}) => {
  const canGoPrevious = currentWeek > 1;
  const canGoNext = currentWeek < totalWeeks;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onWeekChange(currentWeek - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onWeekChange(currentWeek + 1);
    }
  };

  if (variant === 'arrows') {
    return (
      <div className={`plan-navigation ${className}`} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0'
      }}>
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: canGoPrevious ? '#007AFF' : '#8E8E93',
            fontSize: '14px',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: canGoPrevious ? 'pointer' : 'not-allowed'
          }}
        >
          <div style={{
            width: '6px',
            height: '6px',
            borderLeft: `1.5px solid ${canGoPrevious ? '#007AFF' : '#8E8E93'}`,
            borderBottom: `1.5px solid ${canGoPrevious ? '#007AFF' : '#8E8E93'}`,
            transform: 'rotate(45deg)'
          }} />
          Previous Week
        </button>
        
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1C1C1E'
        }}>
          Week {currentWeek} of {totalWeeks}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: canGoNext ? '#007AFF' : '#8E8E93',
            fontSize: '14px',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: canGoNext ? 'pointer' : 'not-allowed'
          }}
        >
          Next Week
          <div style={{
            width: '6px',
            height: '6px',
            borderRight: `1.5px solid ${canGoNext ? '#007AFF' : '#8E8E93'}`,
            borderTop: `1.5px solid ${canGoNext ? '#007AFF' : '#8E8E93'}`,
            transform: 'rotate(45deg)'
          }} />
        </button>
      </div>
    );
  }

  // Add other variants as needed
  return null;
};
```

## Integration Patterns

### Plan Page Integration
```javascript
// Example of how components work together on Plan Page
<PlanPage>
  <PlanOverviewCard {...planData} />
  <FilterPills variant="phase" filters={phaseFilters} onFilterChange={handlePhaseFilter} />
  <FilterPills variant="week" filters={weekFilters} onFilterChange={handleWeekFilter} />
  
  {phases.map((phase, index) => (
    <div key={phase.id}>
      {index > 0 && <PhaseDivider text={`${phase.name} Begins`} />}
      <PhaseSection 
        phase={phase}
        weeks={phase.weeks}
        activePhaseFilter={activePhaseFilter}
        onWeekClick={handleWeekClick}
      />
    </div>
  ))}
</PlanPage>
```

### Weekly View Integration
```javascript
// Components used in Weekly view page
<WeeklyView>
  <WeekOverviewCard week={weekData} /> // Simplified version of WeekCard
  <CoachInsightsCard insights={weekInsights} />
  <PlanNavigation currentWeek={week.number} onWeekChange={handleWeekChange} />
</WeeklyView>
```

## State Management Patterns

### Plan Page State
```javascript
const PlanPage = () => {
  const [planData, setPlanData] = useState(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState('all');
  const [activeWeekFilter, setActiveWeekFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter handlers
  const handlePhaseFilter = (phaseId) => {
    setActivePhaseFilter(phaseId);
    // Optionally scroll to phase section
    if (phaseId !== 'all') {
      scrollToPhase(phaseId);
    }
  };

  const handleWeekFilter = (weekId) => {
    setActiveWeekFilter(weekId);
    scrollToWeek(weekId);
  };

  // Navigation handlers
  const handleWeekClick = (week) => {
    navigate(`/week/${week.id}`);
  };

  const jumpToCurrent = () => {
    const currentWeekId = `w${planData.plan.currentWeek}`;
    setActiveWeekFilter(currentWeekId);
    scrollToWeek(currentWeekId);
  };

  return (
    // Component JSX
  );
};
```

### Filter State Management
```javascript
// Helper hook for managing filter state
const useFilters = (initialFilters) => {
  const [activeFilter, setActiveFilter] = useState(initialFilters[0]?.id || null);
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (filterId) => {
    setActiveFilter(filterId);
  };

  const addFilter = (filter) => {
    setFilters(prev => [...prev, filter]);
  };

  const removeFilter = (filterId) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  };

  return {
    activeFilter,
    filters,
    updateFilter,
    addFilter,
    removeFilter
  };
};
```

## Responsive Design Patterns

### Mobile Adaptations
```css
/* Plan components responsive styles */
@media (max-width: 375px) {
  .plan-overview-stats,
  .week-card-metrics {
    flex-direction: column;
    gap: 12px;
  }
  
  .plan-stat,
  .week-metric {
    border-right: none !important;
    border-bottom: 1px solid #F2F2F7;
    padding-bottom: 8px;
  }
  
  .plan-stat:last-child,
  .week-metric:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .filter-pills {
    gap: 6px;
  }
  
  .phase-section {
    margin-bottom: 24px;
  }
}
```

### Horizontal Scroll Optimization
```javascript
// Custom hook for horizontal scroll management
const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollToActive = (activeIndex, itemWidth = 60) => {
    if (scrollRef.current) {
      const scrollPosition = activeIndex * itemWidth - (scrollRef.current.offsetWidth / 2);
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  return { scrollRef, scrollToActive };
};

// Usage in FilterPills
const FilterPills = ({ filters, activeFilter, onFilterChange }) => {
  const { scrollRef, scrollToActive } = useHorizontalScroll();
  
  useEffect(() => {
    const activeIndex = filters.findIndex(f => f.id === activeFilter);
    if (activeIndex >= 0) {
      scrollToActive(activeIndex);
    }
  }, [activeFilter]);

  return (
    <div ref={scrollRef} className="filter-pills">
      {/* Filter buttons */}
    </div>
  );
};
```

## Performance Optimization

### Virtual Scrolling for Long Plans
```javascript
const VirtualizedPlanView = ({ phases, onWeekClick }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const itemHeight = 200; // Approximate week card height
        const containerHeight = containerRef.current.offsetHeight;
        
        const start = Math.floor(scrollTop / itemHeight);
        const end = Math.min(
          start + Math.ceil(containerHeight / itemHeight) + 2,
          phases.reduce((acc, phase) => acc + phase.weeks.length, 0)
        );
        
        setVisibleRange({ start, end });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [phases]);

  return (
    <div ref={containerRef} style={{ height: '100vh', overflow: 'auto' }}>
      {/* Render only visible weeks */}
    </div>
  );
};
```

### Memoization Patterns
```javascript
// Memoized week cards for performance
const MemoizedWeekCard = React.memo(WeekCard, (prevProps, nextProps) => {
  return (
    prevProps.week.id === nextProps.week.id &&
    prevProps.week.status === nextProps.week.status &&
    prevProps.isCurrentWeek === nextProps.isCurrentWeek
  );
});

// Memoized filter pills
const MemoizedFilterPills = React.memo(FilterPills, (prevProps, nextProps) => {
  return (
    prevProps.activeFilter === nextProps.activeFilter &&
    JSON.stringify(prevProps.filters) === JSON.stringify(nextProps.filters)
  );
});
```

## Animation and Transitions

### Phase Collapse Animation
```javascript
const AnimatedPhaseSection = ({ phase, collapsed, children }) => {
  const [height, setHeight] = useState(collapsed ? 0 : 'auto');
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(collapsed ? 0 : contentHeight);
    }
  }, [collapsed]);

  return (
    <div style={{
      overflow: 'hidden',
      height: height,
      transition: 'height 0.3s ease-in-out'
    }}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
```

### Filter Transition Effects
```javascript
const AnimatedFilterPills = ({ filters, activeFilter, onFilterChange }) => {
  const [previousActive, setPreviousActive] = useState(activeFilter);

  useEffect(() => {
    if (previousActive !== activeFilter) {
      setPreviousActive(activeFilter);
    }
  }, [activeFilter, previousActive]);

  return (
    <div className="filter-pills">
      {filters.map((filter) => {
        const isActive = filter.id === activeFilter;
        const wasActive = filter.id === previousActive;
        
        return (
          <button
            key={filter.id}
            className={`filter-pill ${isActive ? 'active' : ''} ${wasActive ? 'was-active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            style={{
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.2s ease-out'
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
```

## Accessibility Features

### Keyboard Navigation
```javascript
const AccessibleFilterPills = ({ filters, activeFilter, onFilterChange }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const pillRefs = useRef([]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = Math.min(focusedIndex + 1, filters.length - 1);
        setFocusedIndex(nextIndex);
        pillRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prevIndex);
        pillRefs.current[prevIndex]?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onFilterChange(filters[focusedIndex].id);
        break;
    }
  };

  return (
    <div 
      role="tablist" 
      aria-label="Plan filters"
      onKeyDown={handleKeyDown}
    >
      {filters.map((filter, index) => (
        <button
          key={filter.id}
          ref={el => pillRefs.current[index] = el}
          role="tab"
          aria-selected={filter.id === activeFilter}
          aria-controls={`panel-${filter.id}`}
          tabIndex={index === focusedIndex ? 0 : -1}
          onClick={() => onFilterChange(filter.id)}
          onFocus={() => setFocusedIndex(index)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
```

### Screen Reader Support
```javascript
const AccessibleWeekCard = ({ week, ...props }) => {
  const statusText = {
    completed: 'Completed',
    current: 'Currently in progress',
    upcoming: 'Upcoming'
  }[week.status];

  return (
    <div
      role="button"
      aria-label={`Week ${week.number}, ${week.dateRange}, ${statusText}`}
      aria-describedby={`week-${week.id}-details`}
      tabIndex={0}
      {...props}
    >
      <div id={`week-${week.id}-details`} className="sr-only">
        {week.workoutPreviews.map(w => w.description).join(', ')}
      </div>
      {/* Week card content */}
    </div>
  );
};
```

## Testing Patterns

### Component Testing
```javascript
// Example test for WeekCard component
describe('WeekCard', () => {
  const mockWeek = {
    id: 'week-1',
    number: 1,
    dateRange: 'Jan 1-7',
    status: 'completed',
    workoutPreviews: [
      { discipline: 'swim', description: '3 swim sessions' }
    ],
    metrics: {
      totalTime: '5h',
      distance: '50km',
      completion: '5/5'
    }
  };

  it('renders week information correctly', () => {
    render(<WeekCard week={mockWeek} phase="base" />);
    
    expect(screen.getByText('Week 1')).toBeInTheDocument();
    expect(screen.getByText('Jan 1-7')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<WeekCard week={mockWeek} phase="base" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockWeek);
  });

  it('applies current week styling', () => {
    render(<WeekCard week={mockWeek} phase="base" isCurrentWeek={true} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveStyle('border: 1px solid #007AFF');
  });
});
```

### Integration Testing
```javascript
// Example integration test for filter functionality
describe('Plan Page Filtering', () => {
  it('filters phases correctly', async () => {
    render(<PlanPage />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Base Building')).toBeInTheDocument();
    });
    
    // Click build phase filter
    fireEvent.click(screen.getByText('Build'));
    
    // Check that base phase is hidden
    expect(screen.queryByText('Base Building')).not.toBeInTheDocument();
    expect(screen.getByText('Build Phase')).toBeInTheDocument();
  });
});
```

## Future Enhancements

### Advanced Features
- **Plan Comparison:** Side-by-side view of different training plans
- **Custom Phase Creation:** Allow users to create custom training phases
- **Workout Templates:** Pre-built workout libraries for different disciplines
- **Progress Predictions:** AI-powered completion estimates
- **Social Sharing:** Share plan progress with coaches or training partners

### Performance Improvements
- **Plan Caching:** Cache plan data for offline viewing
- **Progressive Loading:** Load weeks as user scrolls
- **Background Sync:** Update plan data in background
- **Optimistic Updates:** Update UI immediately, sync later

### Accessibility Enhancements
- **Voice Navigation:** Voice commands for plan navigation
- **High Contrast Mode:** Enhanced visibility options
- **Large Text Support:** Scalable typography
- **Gesture Support:** Touch gestures for mobile navigation