# Triathlon Training App - Implementation Plan

## Development Strategy
**UI-First Approach with Mock Data → Backend Integration → Polish**

Start with frontend components and realistic mock data to validate UX and data structures before committing to backend implementation. This allows for faster iteration and clearer backend requirements.

---

## Phase 1: Foundation Setup (Week 1)
**Goal:** Establish project structure and design system

### 1.1 Project Initialization
- [x] Create React app with proper folder structure
- [x] Set up routing (React Router)
- [x] Configure development environment
- [x] Initialize git repository

### 1.2 Design System Implementation
- [x] Create design tokens file (colors, typography, spacing)
- [x] Build base utility components:
  - [x] Button variants (primary, secondary, outline)
  - [x] Card component with variants
  - [x] Input components
  - [x] Loading states and spinners
- [x] Set up consistent layout containers

### 1.3 Mock Data Structure
- [x] Create realistic mock data files:
  - [x] `mockUsers.js` - User profiles and preferences
  - [x] `mockRaces.js` - Race goals and details
  - [x] `mockTrainingPlans.js` - Training plan structure
  - [x] `mockWorkouts.js` - 3 weeks of detailed training workouts
  - [x] `mockCompletedWorkouts.js` - Completed Strava-like activities
  - [x] `mockAIInteractions.js` - AI coaching messages and insights

**Deliverable:** Clean project with design system and mock data

---

## Phase 2: Core Components (Week 2)
**Goal:** Build reusable components that form the app foundation

### 2.1 Workout Components
- [x] **WorkoutCard** - Main workout display component
  - [x] Discipline icons and colors
  - [x] Duration, intensity, description
  - [x] Status indicators (scheduled, completed, missed)
  - [x] Click handlers for navigation
- [x] **TodaysWorkout** - Enhanced hero version of WorkoutCard
- [x] **WorkoutMiniItem** - Compact version for lists

### 2.2 Data Display Components
- [ ] **StatCard** - Metrics display with icon and value
- [ ] **SectionHeader** - Consistent page section headers
- [ ] **CoachMessage** - AI insight display component
- [ ] **FilterPills** - Navigation and filtering pills

### 2.3 Component Testing
- [ ] Test components with mock data
- [ ] Verify responsive behavior
- [ ] Validate design system consistency

**Deliverable:** Core component library working with mock data

---

## Phase 3: Dashboard Implementation (Week 3)
**Goal:** Create main app interface with full functionality using mock data

### 3.1 Dashboard Layout
- [ ] **TodaysWorkout** hero section
- [ ] **WeeklyStats** overview cards
- [ ] **UpcomingWorkouts** list
- [ ] **CoachInsights** section
- [ ] **WeeklyProgress** summary

### 3.2 Navigation Setup
- [ ] Basic routing between pages
- [ ] Navigation bar/menu
- [ ] Page transitions

### 3.3 State Management
- [ ] Set up context or state management
- [ ] Connect components to mock data
- [ ] Implement basic interactions (workout status changes)

**Deliverable:** Functional dashboard with realistic interactions

---

## Phase 4: Plan & Weekly Views (Week 4)
**Goal:** Build training plan overview and detailed weekly views

### 4.1 Plan Page Components
- [ ] **PlanOverviewCard** - Race goal and plan summary
- [ ] **FilterPills** - Phase/week navigation
- [ ] **WeekCard** - Week summary in timeline
- [ ] **PhaseDivider** - Training phase separators

### 4.2 Weekly View Components
- [ ] **WeekOverviewCard** - Week statistics and summary
- [ ] **CoachInsightsCard** - Weekly AI guidance
- [ ] **DailyWorkoutCard** - Day-by-day workout breakdown
- [ ] **WeekNavigation** - Previous/next week controls

### 4.3 Navigation Flow
- [ ] Dashboard → Plan Page
- [ ] Plan Page → Weekly View
- [ ] Weekly View → Workout Detail

**Deliverable:** Complete plan navigation with mock training data

---

## Phase 5: Workout Detail & Basic Interactions (Week 5)
**Goal:** Detailed workout views and workout management features

### 5.1 Workout Detail Components
- [ ] **WorkoutOverviewCard** - Comprehensive workout info
- [ ] **WorkoutStructureCard** - Exercise breakdown and intervals
- [ ] **CoachNotesCard** - Workout-specific AI guidance
- [ ] **ActionButtons** - Complete, reschedule, skip actions

### 5.2 Workout Management
- [ ] Mark workout as completed
- [ ] Simple rescheduling functionality
- [ ] Workout notes and modifications
- [ ] Navigation back to plan/weekly views

### 5.3 Data Validation
- [ ] Test all user flows with mock data
- [ ] Validate data structure meets UI needs
- [ ] Refine mock data based on component requirements

**Deliverable:** Complete workout management system with mock data

---

## Phase 6: Coach Analytics Page (Week 6)
**Goal:** AI insights dashboard and analytics views

### 6.1 Coach Page Components
- [ ] **InsightCard** - Enhanced AI coaching messages
- [ ] **TrendsCard** - Performance trend displays
- [ ] **TrainingLoadChart** - Weekly/monthly load visualization
- [ ] **GoalProgressCard** - Race preparation progress
- [ ] **RecommendationsCard** - AI-generated suggestions

### 6.2 Analytics Implementation
- [ ] Mock analytics data and trends
- [ ] Chart components (consider Chart.js or similar)
- [ ] Progress calculations and displays
- [ ] Interactive analytics features

**Deliverable:** Complete coach analytics dashboard

---

## Phase 7: Backend Integration (Week 7-8)
**Goal:** Replace mock data with real backend services

### 7.1 Supabase Setup
- [ ] Create Supabase project
- [ ] Implement database schema from PRD
- [ ] Set up authentication (email/password initially)
- [ ] Create API service layer

### 7.2 Data Migration
- [ ] Replace mock data with API calls
- [ ] Implement loading states
- [ ] Add error handling and fallbacks
- [ ] Test with real data

### 7.3 Core Functionality
- [ ] User registration and login
- [ ] Race goal creation
- [ ] Training plan storage and retrieval
- [ ] Workout completion tracking

**Deliverable:** App working with real backend data

---

## Phase 8: AI Integration (Week 9)
**Goal:** Implement OpenAI-powered features

### 8.1 Training Plan Generation
- [ ] Set up OpenAI API integration
- [ ] Create plan generation prompts
- [ ] Implement plan creation from race goals
- [ ] Add fallbacks for AI failures

### 8.2 Coaching Insights
- [ ] Progress analysis prompts
- [ ] Weekly coaching message generation
- [ ] Workout-specific guidance
- [ ] Performance trend analysis

**Deliverable:** AI-powered plan generation and coaching

---

## Phase 9: Strava Integration (Week 10)
**Goal:** Connect with Strava for activity tracking

### 9.1 Strava OAuth
- [ ] Set up Strava OAuth flow
- [ ] Handle authentication and token management
- [ ] User profile and activity permissions

### 9.2 Activity Sync
- [ ] Import historical activities
- [ ] Match activities to planned workouts
- [ ] Real-time sync with webhooks
- [ ] Handle sync errors and conflicts

**Deliverable:** Full Strava integration with activity matching

---

## Phase 10: Polish & Testing (Week 11-12)
**Goal:** Production readiness and optimization

### 10.1 Performance Optimization
- [ ] React.memo for expensive components
- [ ] API call optimization and caching
- [ ] Mobile responsiveness improvements
- [ ] Loading state refinements

### 10.2 User Experience Polish
- [ ] Error message improvements
- [ ] Success feedback and animations
- [ ] Push notification setup
- [ ] Onboarding flow optimization

### 10.3 Testing & Deployment
- [ ] Component testing for critical paths
- [ ] User flow testing
- [ ] Production deployment setup
- [ ] Environment configuration

**Deliverable:** Production-ready MVP

---

## File Organization Strategy

```
src/
├── components/
│   ├── ui/              # Base design system components
│   ├── workout/         # Workout-related components
│   ├── plan/            # Training plan components
│   ├── coach/           # AI coaching components
│   └── layout/          # Layout and navigation
├── pages/               # Main page components
├── services/            # API and external service integration
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── data/                # Mock data files (Phase 1-6)
└── styles/              # Design system and global styles
```

## Success Checkpoints

**Phase 1-2:** Core components working in isolation
**Phase 3-4:** Dashboard and plan navigation functional
**Phase 5-6:** Complete UI with mock data
**Phase 7-8:** Backend integration successful
**Phase 9-10:** Full feature set with Strava
**Phase 11-12:** Production ready

## Risk Mitigation

- **UI Changes:** Mock data approach allows cheap iteration
- **Backend Delays:** UI can be fully developed and tested first
- **API Integration Issues:** Fallbacks and error handling built in
- **Scope Creep:** Stick to PRD MVP scope throughout development

---

*This implementation plan prioritizes getting a working UI quickly while building toward full functionality. Each phase has clear deliverables and can be demo'd to stakeholders.*