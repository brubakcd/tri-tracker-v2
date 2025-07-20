# Triathlon Training App - Product Requirements Document

## Product Overview
AI-powered triathlon training app that creates personalized day-by-day training plans, integrates with Strava for progress tracking, and provides intelligent coaching insights.

**Core Value Proposition:** Takes your race goal → generates a plan → tracks your Strava workouts against that plan → gives you AI insights on progress.

## MVP Scope
Focus on delivering a functioning app that users can download and use for triathlon training with these essential features:

### Core Features
- ✅ Personalized plan generation based on race date and current fitness level
- ✅ Strava integration for automatic workout import and matching
- ✅ Workout rescheduling with simple plan adjustment
- ✅ Basic AI coaching insights (automated, not chat initially)
- ✅ Progress tracking (planned vs actual performance)
- ✅ Push notifications for scheduled workouts

### Explicitly Out of Scope (Post-MVP)
- ❌ Recovery tracking (RPE, sleep, HRV)
- ❌ Equipment management (handled by Strava)
- ❌ Weather integration
- ❌ Social features and sharing
- ❌ Conversational AI chat
- ❌ Offline workout download

## Technical Architecture

### Tech Stack
- **Frontend:** React/React Native
- **Backend:** Supabase (PostgreSQL + real-time + auth)
- **AI:** OpenAI API (GPT-4 for plan generation and insights)
- **Data Integration:** Strava API (OAuth + webhooks)
- **Deployment:** TBD (Vercel/Netlify for web, App Store for mobile)

### Database Schema (Supabase)
```sql
-- Core tables for MVP
users (id, email, strava_athlete_id, strava_tokens, created_at)
races (id, user_id, name, race_date, race_type, fitness_level, weekly_hours)
training_plans (id, race_id, plan_data, weeks_to_race, generated_at)
workouts (id, plan_id, scheduled_date, discipline, workout_data, week_number)
completed_workouts (id, workout_id, user_id, strava_activity_id, activity_data)
ai_interactions (id, user_id, interaction_type, request_data, response_data)
```

### Design System Standards
```javascript
// Color palette
disciplines: { swim: '#007AFF', bike: '#FF9500', run: '#34C759', brick: 'gradient' }
status: { completed: '#34C759', scheduled: '#007AFF', missed: '#FF3B30', rest: '#8E8E93' }
neutral: { background: '#F2F2F7', cards: 'white', text: '#1C1C1E', secondary: '#6D6D80' }

// Typography scale
sizes: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '30px' }
weights: { normal: '400', medium: '500', semibold: '600', bold: '700' }

// Spacing scale  
spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px' }
```

## App Architecture & Navigation

### Page Structure
```
App Navigation:
├── Dashboard (main entry point)
├── Plan Page (training plan overview)
├── Weekly View (detailed week breakdown)  
├── Workout Detail (individual workout view)
├── Coach Page (AI insights and analytics)
└── Profile Page (settings - future)
```

### Component Reusability Matrix
| Component | Dashboard | Plan | Weekly | Detail | Coach | Usage |
|-----------|-----------|------|--------|--------|--------|--------|
| **WorkoutCard** | ✅ Lists | ✅ Timeline | ✅ Daily | ❌ | ❌ | Foundation component |
| **TodaysWorkout** | ✅ Hero | ❌ | ❌ | ❌ | ❌ | Dashboard centerpiece |
| **StatCard** | ✅ Week stats | ✅ Plan metrics | ✅ Overview | ❌ | ❌ | Metrics display |
| **FilterPills** | ❌ | ✅ Phases/Weeks | ❌ | ❌ | ❌ | Navigation aid |
| **CoachMessage** | ✅ Insights | ❌ | ✅ Weekly | ✅ Notes | ✅ Base pattern | AI communication |
| **WeeklyWorkoutList** | ✅ Overview | ✅ Drill-down | ❌ | ❌ | ❌ | Week organization |
| **SectionHeader** | ✅ All | ✅ All | ✅ All | ✅ All | ✅ All | Universal headers |
| **InsightCard** | ❌ | ❌ | ❌ | ❌ | ✅ Main | AI insights display |
| **TrendsCard** | ❌ | ❌ | ❌ | ❌ | ✅ Analytics | Performance trends |
| **TrainingLoadChart** | ❌ | ❌ | ❌ | ❌ | ✅ Visualization | Data charts |

### User Flow & Navigation
```
Entry: Dashboard → Today's Workout focus
Primary: Dashboard → Plan Page → Weekly View → Workout Detail
Secondary: Dashboard → Direct workout detail from today's workout
```

## Development Implementation Plan

### Phase 1: Foundation & Core UI (Weeks 1-2)
**Goal:** Establish design system and build core reusable components

#### Week 1: Project Setup & Design System
- [ ] Initialize React project with proper structure
- [ ] Set up Supabase project and configure environment
- [ ] Implement design system (colors, typography, spacing)
- [ ] Create base utility components (Button, Card, Input, Loading)
- [ ] Set up routing structure and basic navigation

#### Week 2: Core Workout Components  
- [ ] Build **WorkoutCard** component (foundation for entire app)
- [ ] Build **TodaysWorkout** component (enhanced WorkoutCard)
- [ ] Build **StatCard** component (metrics display)
- [ ] Build **SectionHeader** component (consistent headers)
- [ ] Create basic page layouts and containers

**Deliverable:** Core component library with consistent styling

---

### Phase 2: Dashboard & Authentication (Weeks 2-3)
**Goal:** Create main app interface and user authentication

#### Week 2-3: Dashboard Implementation
- [ ] Set up Supabase authentication (email + OAuth preparation)
- [ ] Build **Dashboard** page with all sections
- [ ] Implement **CoachMessage** component for AI insights
- [ ] Build **WeeklyWorkoutList** and **WorkoutMiniItem** components
- [ ] Create mock data structure for development
- [ ] Implement basic navigation between pages

**Deliverable:** Functional dashboard with navigation and mock data

---

### Phase 3: Training Plan System (Weeks 3-4)
**Goal:** Build plan overview and week navigation

#### Week 3: Plan Page Foundation
- [ ] Build **PlanOverviewCard** component (hero component)
- [ ] Implement **FilterPills** component (reusable filtering)
- [ ] Build **WeekCard** component for plan timeline
- [ ] Create **PhaseDivider** component for organization
- [ ] Implement **Plan Page** with phase organization

#### Week 4: Weekly Detail View
- [ ] Build **Weekly View** page
- [ ] Implement **WeekOverviewCard** (week summary)
- [ ] Build **CoachInsightsCard** for weekly guidance
- [ ] Create **DailyWorkoutCard** component
- [ ] Add navigation between Plan → Weekly → Workout views

**Deliverable:** Complete plan navigation with weekly breakdowns

---

### Phase 4: Workout Details & AI Integration (Weeks 4-5)
**Goal:** Detailed workout views and basic AI functionality

#### Week 4-5: Workout Detail System
- [ ] Build **WorkoutDetail** page
- [ ] Implement **WorkoutOverviewCard** (detailed version)
- [ ] Create **WorkoutStructureCard** for exercise breakdown
- [ ] Build **CoachNotesCard** for AI guidance
- [ ] Implement **ActionButtons** for workout management

#### Week 5: Basic AI Integration
- [ ] Set up OpenAI API integration
- [ ] Create training plan generation prompts
- [ ] Implement basic AI coaching insights
- [ ] Build plan generation from race goals
- [ ] Error handling and fallbacks for AI failures

**Deliverable:** Complete workout detail system with AI plan generation

---

### Phase 5: Coach Analytics & Strava (Weeks 5-6)
**Goal:** AI insights dashboard and Strava integration

#### Week 5-6: Coach Page Implementation  
- [ ] Build **Coach Page** with analytics dashboard
- [ ] Implement **InsightCard** component (extends CoachMessage)
- [ ] Create **TrendsCard** for performance analysis
- [ ] Build **TrainingLoadChart** for data visualization
- [ ] Implement **GoalProgressCard** and **RecommendationsCard**

#### Week 6: Strava Integration
- [ ] Set up Strava OAuth flow
- [ ] Implement activity data fetching
- [ ] Build workout matching logic (planned vs actual)
- [ ] Create **CompletedWorkout** component for comparisons
- [ ] Set up webhook system for real-time sync
- [ ] Implement data synchronization and caching

**Deliverable:** Complete AI coach dashboard with Strava integration

---

### Phase 6: Polish & Testing (Weeks 6-7)
**Goal:** Optimize performance and prepare for user testing

#### Week 6: Performance & Optimization
- [ ] Implement loading states for all components
- [ ] Add error handling and user feedback
- [ ] Optimize API calls and caching
- [ ] Implement push notifications
- [ ] Mobile responsiveness testing and fixes

#### Week 7: Testing & Launch Preparation
- [ ] Component testing for critical paths
- [ ] User flow testing (onboarding → plan → tracking)
- [ ] Performance optimization
- [ ] Bug fixes and polish
- [ ] Deployment setup and environment configuration

**Deliverable:** Production-ready MVP app

---

## Success Metrics & Validation

### Key Performance Indicators
- **Engagement:** Daily active users, session duration
- **Core Function:** Workout completion rate, plan adherence percentage  
- **Integration:** Strava sync success rate, AI interaction engagement
- **Retention:** 7-day and 30-day user retention
- **Quality:** App store ratings, user feedback scores

### User Testing Goals
- Users can complete onboarding and generate a plan in <5 minutes
- Users understand today's workout and can navigate to details
- Users can successfully reschedule workouts
- Strava integration works reliably for 90%+ of users
- AI insights are perceived as helpful and accurate

## Post-MVP Roadmap

### Phase 7: Enhanced Features (Month 2)
- Advanced AI analytics and predictive insights
- Enhanced workout rescheduling (drag & drop)
- Conversational AI coach chat
- Profile page with detailed statistics

### Phase 8: Advanced Analytics (Month 3)
- Performance trend analysis and comparisons
- Training load management and optimization
- Race prediction modeling
- Detailed progress visualization and reporting

### Phase 9: Social & Sharing (Month 4)
- Training partner features and collaboration
- Plan sharing capabilities with coaches
- Community challenges and leaderboards
- Advanced coach collaboration tools

## Risk Mitigation

### Technical Risks
- **AI API costs:** Implement caching and template-based generation
- **Strava rate limits:** Smart batching and local caching
- **Database performance:** Proper indexing and query optimization
- **Mobile performance:** Progressive loading and optimization

### Product Risks  
- **User adoption:** Focus on core value prop and smooth onboarding
- **Feature creep:** Stick to MVP scope, resist adding features
- **Competition:** Emphasize AI personalization as differentiator
- **Retention:** Ensure AI insights provide real value

## Technical Requirements

### Environment Variables
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_STRAVA_CLIENT_ID=
REACT_APP_STRAVA_CLIENT_SECRET=
REACT_APP_OPENAI_API_KEY=
```

### Development Standards
- **File naming:** PascalCase for components, camelCase for utilities
- **Component structure:** Consistent props, PropTypes, error boundaries
- **API integration:** Proper error handling, loading states, caching
- **Testing:** Unit tests for utilities, integration tests for flows
- **Performance:** React.memo for expensive components, lazy loading

### Documentation References
- **Pages:** `pages/Dashboard.md`, `pages/PlanPage.md`, `pages/WeeklyView.md`, `pages/WorkoutDetail.md`, `pages/CoachPage.md`
- **Components:** `components/CoreComponents.md`, `components/PlanComponents.md`
- **API Integration:** Detailed in individual page documentation

---

*This PRD serves as the strategic guide. Refer to individual documentation files for detailed implementation specifics.*