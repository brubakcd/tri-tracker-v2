# Shared Onboarding & Edit Pattern

## Overview
This document outlines the approach for sharing onboarding pages between the initial user setup flow and the edit/manage functionality in the app. This pattern provides consistency, reduces code duplication, and improves maintainability.

## UX Pattern
Users can view all their captured details on the **Manage Plan** page in organized cards. Clicking on any section opens the corresponding onboarding page in "edit mode" to modify those specific details.

## Benefits
- **Consistency**: Same UI/UX for initial setup and editing
- **DRY Principle**: Single source of truth for forms and validation
- **Maintainability**: Changes only need to be made in one place
- **Familiarity**: Users already know how the forms work
- **Development Efficiency**: No need for separate edit screens

## Plan Details Structure

### Personal Information
- Full Name
- Email Address
- Age/Date of Birth
- Gender (optional)
- Location (optional)

### Race Information
- Race Name
- Race Location
- Race Distance (Sprint, Olympic, Half Ironman, Ironman)
- Race Date
- Goal/Target Finish Time
- Race Priority (A-race, B-race, C-race)

### Training Preferences
- Training Days Per Week (3-6 days)
- Available Training Days (M/T/W/T/F/S/S)
- Preferred Long Workout Day (typically Saturday or Sunday)
- Training Volume/Intensity Preference (Conservative, Moderate, Aggressive)
- Plan Start Date
- Preferred Training Difficulty (Beginner, Intermediate, Advanced)

### Fitness & Health
- Current Fitness Level/Experience
  - Swimming ability
  - Cycling ability  
  - Running ability
- Previous Injuries/Limitations
- Current Health Status
- Recovery Preferences

### Equipment & Access
- Pool Access (Yes/No, Frequency)
- Gym Access (Yes/No)
- Equipment Owned
  - Road bike / Triathlon bike
  - Trainer / Smart trainer
  - Wetsuit
  - Heart rate monitor
  - Power meter
  - etc.

### Notification Preferences
- Workout reminders
- Plan updates
- Motivational messages
- Weekly summaries

## Technical Implementation

### Component Props
Each onboarding component should accept:
```typescript
interface OnboardingPageProps {
  mode: 'onboarding' | 'edit';
  initialData?: any;
  onComplete: (data: any) => void;
  onSkip?: () => void;
}
```

### Navigation Flow
- **Onboarding Mode**: Proceeds to next onboarding step
- **Edit Mode**: Returns to Manage Plan page with updated data

### State Management
- Pre-populate forms with current user data in edit mode
- Handle different save behaviors (create vs update)
- Sync changes back to main app state

### Card Interaction Pattern
Each card section on Manage Plan page:
1. Displays current values in a clean, readable format
2. Shows chevron (>) indicator for editability
3. On tap, navigates to corresponding onboarding page
4. Returns to Manage Plan with updated values

## Comparison with Competitors

### Runna App Structure (Reference)
- Race details
- Ability level
- Estimated race time / goal
- Number of days per week
- Available days of the week
- Preferred long workout day
- Plan start date
- Race date
- Training volume
- Difficulty

### Our Enhanced Structure
Builds upon Runna's foundation but adds:
- Injury/health considerations
- Equipment access details
- Personal information management
- Notification preferences
- More granular fitness level assessment

## Future Considerations
- Bulk edit functionality for related settings
- Quick toggles for common changes (available days, training volume)
- Plan regeneration triggers when key parameters change
- Integration with wearable devices for automatic fitness level updates