# Workout Detail Documentation

## Overview
Comprehensive individual workout view featuring workout overview, detailed structure breakdown, AI coach notes, and action buttons for workout management.

## Component Composition
```
WorkoutDetail
├── HeaderWithBack (navigation)
├── WorkoutOverviewCard (summary)
├── WorkoutStructureCard (detailed breakdown)
├── CoachNotesCard (AI guidance)
└── ActionButtons (import/complete)
```

## Data Requirements

### Workout Detail Data Structure
```javascript
const workoutDetailData = {
  workout: {
    id: string,
    title: string, // 'Bike Interval Training'
    discipline: 'swim' | 'bike' | 'run' | 'brick',
    type: string, // 'Cycling • Intervals'
    status: 'scheduled' | 'completed' | 'missed' | 'skipped',
    scheduledDate: Date,
    description: string, // Detailed workout description
    metrics: {
      heartRate: string, // 'Zone 4'
      duration: string, // '90 min'
      distance: string // '40 km'
    },
    structure: [
      {
        name: string, // 'Warm-up', 'Main Set', 'Cool-down'
        duration: string, // '15 min'
        details: [
          {
            label: string, // 'Easy spin'
            value: string // 'Zone 1-2'
          }
        ],
        description: string // Detailed instructions
      }
    ],
    coachMessage: string,
    notes: string[] // Array of bullet points
  }
}
```

## Component Implementations

### WorkoutDetail Main Component
```javascript
const WorkoutDetail = ({ workoutId }) => {
  const [workoutData, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkoutData(workoutId);
  }, [workoutId]);

  const loadWorkoutData = async (id) => {
    try {
      const data = await fetchWorkoutData(id);
      setWorkoutData(data);
    } catch (error) {
      console.error('Error loading workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleImport = async () => {
    try {
      // Import workout to training device/app
      await importWorkoutToDevice(workoutData.workout);
      // Show success feedback
    } catch (error) {
      console.error('Error importing workout:', error);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await markWorkoutComplete(workoutData.workout.id);
      // Update local state and show feedback
      setWorkoutData(prev => ({
        ...prev,
        workout: { ...prev.workout, status: 'completed' }
      }));
    } catch (error) {
      console.error('Error marking complete:', error);
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
        padding: '60px 24px 16px'
      }}>
        <HeaderWithBack onBack={handleBack} />
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 24px 24px' }}>
        {/* Workout Overview */}
        <WorkoutOverviewCard 
          workout={workoutData.workout}
          style={{ marginBottom: '24px' }}
        />

        {/* Workout Structure */}
        <WorkoutStructureCard 
          structure={workoutData.workout.structure}
          style={{ marginBottom: '24px' }}
        />

        {/* Coach Notes */}
        <CoachNotesCard 
          message={workoutData.workout.coachMessage}
          notes={workoutData.workout.notes}
          style={{ marginBottom: '24px' }}
        />

        {/* Action Buttons */}
        <ActionButtons 
          onImport={handleImport}
          onMarkComplete={handleMarkComplete}
          workoutStatus={workoutData.workout.status}
        />
      </div>
    </div>
  );
};
```

### WorkoutOverviewCard Component
```javascript
const WorkoutOverviewCard = ({ workout, className = '' }) => {
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

  const disciplineColor = getDisciplineColor(workout.discipline);
  const statusStyle = getStatusColor(workout.status);

  return (
    <div className={`workout-overview ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header - Reuses WorkoutCard pattern */}
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
            {workout.type}
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

      {/* Description */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontSize: '15px',
          color: '#3C3C43',
          lineHeight: '1.4',
          margin: 0
        }}>
          {workout.description}
        </p>
      </div>

      {/* Metrics - Reuses WorkoutCard pattern */}
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
            Target HR
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
            Duration
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

### WorkoutStructureCard Component
```javascript
const WorkoutStructureCard = ({ structure, className = '' }) => {
  return (
    <div className={`workout-breakdown ${className}`} style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
      border: '0.5px solid rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>
          Workout Structure
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          Detailed breakdown of today's session
        </div>
      </div>
      
      {/* Structure Sections */}
      {structure?.map((section, index) => (
        <div key={index} style={{
          marginBottom: index === structure.length - 1 ? '0' : '20px'
        }}>
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#000000'
            }}>
              {section.name}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6D6D80',
              fontWeight: '500'
            }}>
              {section.duration}
            </div>
          </div>
          
          {/* Section Details */}
          <div style={{
            background: '#FAFBFC',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid #F0F0F0'
          }}>
            {/* Detail Items */}
            {section.details?.map((detail, detailIndex) => (
              <div key={detailIndex} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: detailIndex === section.details.length - 1 ? '0' : '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#3C3C43',
                  fontWeight: '400'
                }}>
                  {detail.label}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000000'
                }}>
                  {detail.value}
                </span>
              </div>
            ))}
            
            {/* Section Description */}
            {section.description && (
              <div style={{
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #F0F0F0',
                fontSize: '13px',
                color: '#6D6D80',
                lineHeight: '1.3'
              }}>
                {section.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
```

### CoachNotesCard Component
```javascript
const CoachNotesCard = ({ message, notes, className = '' }) => {
  return (
    <div className={`coach-notes ${className}`} style={{
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
          Coach Notes
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6D6D80'
        }}>
          Specific guidance for this workout
        </div>
      </div>

      {/* Coach Message - Reuses CoachMessage pattern */}
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
            {message}
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div style={{
        background: '#FAFBFC',
        borderRadius: '10px',
        padding: '16px',
        border: '1px solid #F0F0F0'
      }}>
        {notes?.map((note, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: index === notes.length - 1 ? '0' : '12px'
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

### ActionButtons Component
```javascript
const ActionButtons = ({ 
  onImport, 
  onMarkComplete, 
  workoutStatus,
  className = '' 
}) => {
  const isCompleted = workoutStatus === 'completed';
  
  return (
    <div className={`action-section ${className}`} style={{
      padding: '16px 0',
      display: 'flex',
      gap: '12px'
    }}>
      <button
        onClick={onImport}
        disabled={isCompleted}
        style={{
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: '600',
          flex: 1,
          cursor: isCompleted ? 'not-allowed' : 'pointer',
          background: isCompleted ? '#F2F2F7' : '#007AFF',
          color: isCompleted ? '#8E8E93' : 'white',
          transition: 'all 0.15s ease',
          opacity: isCompleted ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (!isCompleted) {
            e.target.style.background = '#0056CC';
          }
        }}
        onMouseLeave={(e) => {
          if (!isCompleted) {
            e.target.style.background = '#007AFF';
          }
        }}
      >
        {isCompleted ? 'Workout Completed' : 'Import Workout'}
      </button>
      
      {!isCompleted && (
        <button
          onClick={onMarkComplete}
          style={{
            border: '1px solid #E5E5EA',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            flex: 1,
            cursor: 'pointer',
            background: '#F2F2F7',
            color: '#1C1C1E',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#E8E8ED';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#F2F2F7';
          }}
        >
          Mark Complete
        </button>
      )}
    </div>
  );
};
```

### HeaderWithBack Component
```javascript
const HeaderWithBack = ({ onBack, backText = 'Back', className = '' }) => {
  return (
    <button
      onClick={onBack}
      className={`back-button ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#007AFF',
        fontSize: '16px',
        fontWeight: '400',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '16px'
      }}
    >
      <div style={{
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderLeft: '1.5px solid #007AFF',
          borderBottom: '1.5px solid #007AFF',
          transform: 'rotate(45deg)'
        }} />
      </div>
      <span>{backText}</span>
    </button>
  );
};
```

## Navigation Actions

### Primary Actions
- **Back Button** → Navigate to previous page (Weekly view or Dashboard)
- **Import Workout** → Send workout to training device/app
- **Mark Complete** → Update workout status to completed

### Secondary Actions
- **Coach Message** → Navigate to Coach page (future)

## Responsive Behavior

### Mobile Adaptations (≤375px)
- Workout overview metrics stack vertically
- Action buttons maintain side-by-side layout
- Padding adjustments: 24px → 16px

### CSS Media Queries
```css
@media (max-width: 375px) {
  .workout-overview .overview-metrics,
  .workout-breakdown .detail-items {
    flex-direction: column;
    gap: 12px;
  }
  
  .overview-metric,
  .detail-item {
    border-right: none !important;
    border-bottom: 1px solid #F2F2F7;
    padding-bottom: 8px;
  }
  
  .overview-metric:last-child,
  .detail-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
```

## State Management

### Required State
```javascript
const [workoutData, setWorkoutData] = useState(null);
const [loading, setLoading] = useState(true);
const [importing, setImporting] = useState(false);
const [completing, setCompleting] = useState(false);
const [error, setError] = useState(null);
```

### Action Handlers
```javascript
const handleImport = async () => {
  setImporting(true);
  try {
    // Import logic here
    await importWorkoutToDevice(workoutData.workout);
    // Show success feedback
    showToast('Workout imported successfully');
  } catch (error) {
    setError('Failed to import workout');
  } finally {
    setImporting(false);
  }
};

const handleMarkComplete = async () => {
  setCompleting(true);
  try {
    await markWorkoutComplete(workoutData.workout.id);
    setWorkoutData(prev => ({
      ...prev,
      workout: { ...prev.workout, status: 'completed' }
    }));
    showToast('Workout marked as complete');
  } catch (error) {
    setError('Failed to mark workout complete');
  } finally {
    setCompleting(false);
  }
};
```

## API Integration

### Data Fetching
```javascript
const fetchWorkoutData = async (workoutId) => {
  const { data, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_data,
      training_plans (
        plan_data
      )
    `)
    .eq('id', workoutId)
    .single();
    
  if (error) throw error;
  
  return {
    workout: transformWorkoutData(data)
  };
};
```

### Import Integration
```javascript
const importWorkoutToDevice = async (workout) => {
  // Convert workout to .fit or other training file format
  const workoutFile = generateWorkoutFile(workout);
  
  // Send to user's preferred training platform
  // This could be Garmin Connect, TrainingPeaks, etc.
  const response = await fetch('/api/export-workout', {
    method: 'POST',
    body: JSON.stringify({
      workout: workoutFile,
      format: 'fit',
      platform: 'garmin'
    })
  });
  
  if (!response.ok) throw new Error('Import failed');
};
```

## Performance Considerations
- Pre-load workout structure for smooth scrolling
- Cache coach notes for offline viewing
- Optimize workout file generation
- Implement progressive loading for large workouts

## Future Enhancements
- Real-time workout tracking integration
- Custom workout modifications
- Workout sharing capabilities
- Performance analytics comparison
- Video exercise demonstrations