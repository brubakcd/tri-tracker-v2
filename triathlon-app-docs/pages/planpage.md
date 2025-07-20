# Plan Page Documentation

## Overview
Training plan overview page featuring plan summary, phase filtering, week navigation, and detailed weekly breakdowns organized by training phases.

## Component Composition
```
PlanPage
├── AppHeader (plan title)
├── PlanOverviewCard (hero component)
├── Section (Phase Filters)
│   ├── SectionHeader
│   └── FilterPills (phases)
├── Section (Week Navigation)
│   ├── SectionHeader
│   └── FilterPills (weeks)
├── PhaseSection (Base Building)
│   ├── PhaseHeader
│   ├── WeekCard × multiple
│   └── PhaseDivider
├── PhaseSection (Build Phase)
│   ├── PhaseHeader
│   └── WeekCard × multiple
└── ... (additional phases)
```

## Data Requirements

### Plan Data Structure
```javascript
const planData = {
  plan: {
    id: string,
    name: string, // 'Olympic Triathlon Plan'
    subtitle: string, // '16-week structured training program'
    description: string,
    totalWeeks: number,
    currentWeek: number,
    raceDate: Date
  },
  raceCountdown: {
    weeks: number,
    days: number
  },
  progress: {
    completed: string, // '52h'
    remaining: string, // '64h'
    percentage: number // 50
  },
  currentPhase: {
    name: string, // 'Base Building Phase'
    description: string, // 'Week 8 of 10 • Focus on aerobic development'
    weekRange: string // 'Week 8 of 10'
  },
  phases: [
    {
      id: string,
      name: string, // 'Base Building'
      subtitle: string, // 'Weeks 6-10 • Aerobic development and volume building'
      color: string, // Phase color code
      weeks: Week[],
      isCurrentPhase: boolean
    }
  ],
  filters: {
    phases: [
      { id: 'all', label: 'All Phases' },
      { id: 'base', label: 'Base' },
      { id: 'build', label: 'Build' },
      { id: 'peak', label: 'Peak' },
      { id: 'taper', label: 'Taper' }
    ],
    weeks: [
      { id: 'w1', label: 'W1', status: 'completed' },
      { id: 'w2', label: 'W2', status: 'completed' },
      { id: 'w8', label: 'W8', status: 'current' },
      { id: 'w9', label: 'W9', status: 'upcoming' }
    ]
  }
}
```

### Week Data Structure
```javascript
const week = {
  id: string,
  number: number,
  phase: 'base' | 'build' | 'peak' | 'taper' | 'recovery',
  dateRange: string, // 'July 7-13'
  status: 'completed' | 'current' | 'upcoming',
  workoutPreviews: [
    {
      discipline: 'swim' | 'bike' | 'run' | 'brick',
      count: number,
      description: string // '3 swim sessions • Open water prep'
    }
  ],
  metrics: {
    totalTime: string, // '7.5h'
    distance: string, // '92 km'
    completion: string // '3/10' or 'Completed'
  }
}
```

## Component Implementations

### PlanPage Main Component
```javascript
const PlanPage = () => {
  const [planData, setPlanData] = useState(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState('all');
  const [activeWeekFilter, setActiveWeekFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanData();
  }, []);

  const loadPlanData = async () => {
    try {
      const data = await fetchPlanData();
      setPlanData(data);
      setActiveWeekFilter(`w${data.plan.currentWeek}`);
    } catch (error) {
      console.error('Error loading plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhaseFilter = (phaseId) => {
    setActivePhaseFilter(phaseId);
    // Scroll to phase section or filter phases
  };

  const handleWeekFilter = (weekId) => {
    setActiveWeekFilter(weekId);
    // Scroll to specific week
    scrollToWeek(weekId);
  };

  const handleWeekClick = (week) => {
    navigate(`/week/${week.id}`);
  };

  const scrollToWeek = (weekId) => {
    const element = document.getElementById(`week-${weekId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jumpToCurrent = () => {
    scrollToWeek(`w${planData.plan.currentWeek}`);
    setActiveWeekFilter(`w${planData.plan.currentWeek}`);
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
          Training Plan
        </h1>
        
        <PlanOverviewCard 
          plan={planData.plan}
          progress={planData.progress}
          raceCountdown={planData.raceCountdown}
          currentPhase={planData.currentPhase}
        />
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 24px 24px' }}>
        {/* Phase Filters */}
        <div style={{ marginBottom: '24px' }}>
          <SectionHeader title="Phases" />
          <FilterPills
            filters={planData.filters.phases}
            activeFilter={activePhaseFilter}
            onFilterChange={handlePhaseFilter}
            variant="phase"
          />
        </div>

        {/* Week Navigation */}
        <div style={{ marginBottom: '24px' }}>
          <SectionHeader 
            title="Weeks"
            actionText="Jump to current"
            onAction={jumpToCurrent}
          />
          <FilterPills
            filters={planData.filters.weeks}
            activeFilter={activeWeekFilter}
            onFilterChange={handleWeekFilter}
            variant="week"
          />
        </div>

        {/* Phase Sections */}
        {planData.phases.map((phase, index) => (
          <div key={phase.id}>
            {index > 0 && (
              <PhaseDivider text={`${phase.name} Begins`} />
            )}
            <PhaseSection
              phase={phase}
              activePhaseFilter={activePhaseFilter}
              onWeekClick={handleWeekClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
```

### PhaseSection Component
```javascript
const PhaseSection = ({ 
  phase, 
  activePhaseFilter, 
  onWeekClick 
}) => {
  // Hide if filtered out
  if (activePhaseFilter !== 'all' && activePhaseFilter !== phase.id) {
    return null;
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
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

      {phase.weeks.map((week) => (
        <WeekCard
          key={week.id}
          week={week}
          phase={phase.id}
          onClick={() => onWeekClick(week)}
          isCurrentWeek={week.status === 'current'}
          id={`week-w${week.number}`}
        />
      ))}
    </div>
  );
};
```

## Filter System

### Phase Filtering
- **All Phases** - Show all phase sections
- **Specific Phase** - Show only selected phase section
- **Visual Feedback** - Active filter highlighted in blue

### Week Navigation
- **Completed Weeks** - Green background
- **Current Week** - Blue background
- **Upcoming Weeks** - Gray background
- **Jump to Current** - Quick navigation action

### Filter Implementation
```javascript
const FilterPills = ({ 
  filters, 
  activeFilter, 
  onFilterChange,
  variant = 'default',
  className = '' 
}) => {
  return (
    <div className={`filter-pills ${className}`} style={{
      display: 'flex',
      gap: variant === 'week' ? '8px' : '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      WebkitOverflowScrolling: 'touch'
    }}>
      {filters.map((filter) => {
        const isActive = filter.id === activeFilter;
        const isCompleted = filter.status === 'completed';
        const isCurrent = filter.status === 'current';
        
        let backgroundColor = 'white';
        let textColor = '#3C3C43';
        let borderColor = '#E5E5EA';
        
        if (isActive || isCurrent) {
          backgroundColor = '#007AFF';
          textColor = 'white';
          borderColor = '#007AFF';
        } else if (isCompleted) {
          backgroundColor = '#34C759';
          textColor = 'white';
          borderColor = '#34C759';
        }

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
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
```

## Navigation Actions

### Primary Actions
- **Week Card Click** → Navigate to WeeklyView
- **Jump to Current** → Scroll to current week
- **Phase Filters** → Show/hide phase sections

### Secondary Actions
- **Plan Overview Stats** → Detailed analytics (future)
- **Week Pills** → Quick week navigation

## Responsive Behavior

### Mobile Adaptations (≤375px)
- Horizontal scrolling filters maintained
- Plan overview metrics stack vertically
- Week card metrics stack vertically
- Padding adjustments: 24px → 16px

## State Management

### Required State
```javascript
const [planData, setPlanData] = useState(null);
const [activePhaseFilter, setActivePhaseFilter] = useState('all');
const [activeWeekFilter, setActiveWeekFilter] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## Performance Considerations
- Lazy load week cards outside viewport
- Implement virtual scrolling for long plans
- Cache plan data locally
- Optimize phase filter animations

## Future Enhancements
- Drag and drop week rescheduling
- Phase progress indicators
- Export plan to calendar
- Plan comparison view