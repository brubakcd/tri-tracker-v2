// Mock data matching Supabase 'workouts' table schema
// 3 weeks of realistic triathlon training (weeks 1, 2, 3 of base phase)

// Helper function to get dates relative to today
const getDateFromToday = (daysFromToday) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString();
};

export const mockWorkouts = [
  // WEEK 1 - Base Building
  {
    id: 'workout_1_1',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-13), // Monday last week
    discipline: 'swim',
    week_number: 1,
    workout_data: {
      title: 'Easy Swim - Technique Focus',
      description: 'Build your aerobic base with easy swimming',
      duration: '45 min',
      distance: '1200m',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Warm-up',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '300m easy freestyle' },
            { label: 'Focus', value: 'Smooth, relaxed stroke' }
          ],
          description: '300m easy freestyle, focusing on stroke technique'
        },
        {
          name: 'Main Set',
          duration: '25 min',
          details: [
            { label: 'Distance', value: '800m' },
            { label: 'Structure', value: '8 x 100m on 2:00' },
            { label: 'Pace', value: 'Comfortable aerobic' }
          ],
          description: '8 x 100m freestyle on 2:00 rest, focus on consistent pace'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '100m easy' },
            { label: 'Style', value: 'Choice of stroke' }
          ],
          description: '100m easy choice of stroke'
        }
      ],
      coach_notes: [
        'Focus on technique over speed in this base phase',
        'Breathing should be comfortable throughout',
        'If struggling with pace, increase rest interval'
      ],
      target_metrics: {
        heart_rate: 'Zone 1-2 (65-75% max HR)',
        perceived_effort: '3-4 out of 10',
        stroke_count: 'Track strokes per 25m'
      }
    },
    created_at: getDateFromToday(-13)
  },
  {
    id: 'workout_1_2',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-12), // Tuesday
    discipline: 'run',
    week_number: 1,
    workout_data: {
      title: 'Easy Run',
      description: 'Aerobic base building run',
      duration: '40 min',
      distance: '6 km',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Warm-up',
          duration: '10 min',
          details: [
            { label: 'Pace', value: 'Very easy, conversational' },
            { label: 'Focus', value: 'Gradual warm-up' }
          ],
          description: 'Start very easy and gradually warm up'
        },
        {
          name: 'Main Run',
          duration: '25 min',
          details: [
            { label: 'Pace', value: 'Comfortable aerobic' },
            { label: 'Effort', value: 'Could hold conversation' }
          ],
          description: 'Steady, comfortable pace - you should be able to chat'
        },
        {
          name: 'Cool-down',
          duration: '5 min',
          details: [
            { label: 'Pace', value: 'Very easy walk/jog' }
          ],
          description: 'Easy walk or very slow jog'
        }
      ],
      coach_notes: [
        'This should feel easy - resist going too fast',
        'Focus on consistent effort, not pace',
        'Walk breaks are fine if needed'
      ],
      target_metrics: {
        heart_rate: 'Zone 1-2 (65-75% max HR)',
        pace: '5:30-6:00/km',
        cadence: '170-180 steps/min'
      }
    },
    created_at: getDateFromToday(-12)
  },
  {
    id: 'workout_1_3',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-11), // Wednesday
    discipline: 'bike',
    week_number: 1,
    workout_data: {
      title: 'Endurance Ride',
      description: 'Steady aerobic ride building base fitness',
      duration: '75 min',
      distance: '30 km',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Warm-up',
          duration: '15 min',
          details: [
            { label: 'Power', value: 'Easy spinning' },
            { label: 'Cadence', value: '85-95 RPM' }
          ],
          description: 'Easy spinning to warm up legs and cardiovascular system'
        },
        {
          name: 'Main Set',
          duration: '50 min',
          details: [
            { label: 'Effort', value: 'Steady, comfortable' },
            { label: 'Power', value: 'Zone 2 (65-75% FTP)' },
            { label: 'Focus', value: 'Smooth pedaling' }
          ],
          description: 'Steady effort you could maintain for hours'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Power', value: 'Very easy' },
            { label: 'Focus', value: 'Spin out legs' }
          ],
          description: 'Easy spinning to flush legs'
        }
      ],
      coach_notes: [
        'Practice nutrition - take water every 15-20 minutes',
        'Focus on smooth, circular pedaling motion',
        'Stay relaxed in upper body'
      ],
      target_metrics: {
        heart_rate: 'Zone 2 (70-80% max HR)',
        power: 'Zone 2 (65-75% FTP)',
        cadence: '85-95 RPM'
      }
    },
    created_at: getDateFromToday(-11)
  },
  {
    id: 'workout_1_4',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-10), // Thursday
    discipline: 'run',
    week_number: 1,
    workout_data: {
      title: 'Recovery Run',
      description: 'Short, easy recovery run',
      duration: '25 min',
      distance: '3.5 km',
      intensity: 'Zone 1',
      structure: [
        {
          name: 'Easy Run',
          duration: '25 min',
          details: [
            { label: 'Pace', value: 'Very comfortable' },
            { label: 'Effort', value: 'Could sing while running' }
          ],
          description: 'Very easy pace, focus on recovery'
        }
      ],
      coach_notes: [
        'This should feel almost too easy',
        'Focus on form and relaxation',
        'Skip if legs feel heavy or tired'
      ],
      target_metrics: {
        heart_rate: 'Zone 1 (60-70% max HR)',
        pace: '6:00-6:30/km',
        effort: '2-3 out of 10'
      }
    },
    created_at: getDateFromToday(-10)
  },
  {
    id: 'workout_1_5',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-9), // Friday - Rest Day
    discipline: 'rest',
    week_number: 1,
    workout_data: {
      title: 'Rest Day',
      description: 'Complete rest or light stretching',
      duration: '0 min',
      intensity: 'Recovery',
      structure: [
        {
          name: 'Rest',
          duration: 'All day',
          details: [
            { label: 'Activity', value: 'None required' },
            { label: 'Optional', value: 'Light stretching, foam rolling' }
          ],
          description: 'Take the day off training'
        }
      ],
      coach_notes: [
        'Rest is when adaptation happens',
        'Light stretching or foam rolling is beneficial',
        'Focus on nutrition and hydration'
      ]
    },
    created_at: getDateFromToday(-9)
  },
  {
    id: 'workout_1_6',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-8), // Saturday
    discipline: 'bike',
    week_number: 1,
    workout_data: {
      title: 'Long Ride',
      description: 'Longer endurance ride to build aerobic capacity',
      duration: '90 min',
      distance: '35 km',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Warm-up',
          duration: '20 min',
          details: [
            { label: 'Power', value: 'Gradual build' },
            { label: 'Focus', value: 'Prepare for longer effort' }
          ],
          description: 'Gradual warm-up preparing for sustained effort'
        },
        {
          name: 'Main Set',
          duration: '60 min',
          details: [
            { label: 'Effort', value: 'Steady, sustainable' },
            { label: 'Power', value: 'Zone 2' },
            { label: 'Practice', value: 'Race nutrition' }
          ],
          description: 'Steady endurance pace, practice race nutrition'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Power', value: 'Easy spinning' }
          ],
          description: 'Easy cool-down'
        }
      ],
      coach_notes: [
        'This is your longest ride of the week',
        'Practice eating and drinking every 20 minutes',
        'Focus on maintaining steady effort, not speed'
      ],
      target_metrics: {
        heart_rate: 'Zone 2 (70-80% max HR)',
        power: 'Zone 2 (65-75% FTP)',
        nutrition: 'Every 20 minutes'
      }
    },
    created_at: getDateFromToday(-8)
  },
  {
    id: 'workout_1_7',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-7), // Sunday
    discipline: 'run',
    week_number: 1,
    workout_data: {
      title: 'Long Run',
      description: 'Aerobic base building long run',
      duration: '60 min',
      distance: '9 km',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Warm-up',
          duration: '10 min',
          details: [
            { label: 'Pace', value: 'Easy, gradual' }
          ],
          description: 'Start easy and gradually increase to comfortable'
        },
        {
          name: 'Main Run',
          duration: '45 min',
          details: [
            { label: 'Pace', value: 'Comfortable aerobic' },
            { label: 'Effort', value: 'Conversational' }
          ],
          description: 'Steady, comfortable pace you could maintain longer'
        },
        {
          name: 'Cool-down',
          duration: '5 min',
          details: [
            { label: 'Pace', value: 'Easy walk' }
          ],
          description: 'Walk and stretch'
        }
      ],
      coach_notes: [
        'Your longest run of the week',
        'Practice race day nutrition if over 90 minutes',
        'Focus on building time on feet'
      ],
      target_metrics: {
        heart_rate: 'Zone 2 (70-80% max HR)',
        pace: '5:45-6:15/km',
        effort: '4-5 out of 10'
      }
    },
    created_at: getDateFromToday(-7)
  },

  // WEEK 2 - Current Week (Base Building continues)
  {
    id: 'workout_2_1',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-6), // Monday this week
    discipline: 'swim',
    week_number: 2,
    workout_data: {
      title: 'Technique + Short Intervals',
      description: 'Technique work with short speed intervals',
      duration: '50 min',
      distance: '1400m',
      intensity: 'Zone 1-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '12 min',
          details: [
            { label: 'Distance', value: '400m' },
            { label: 'Structure', value: '200m easy + 4x50m drill' }
          ],
          description: '200m easy swim + 4x50m technique drills'
        },
        {
          name: 'Main Set',
          duration: '28 min',
          details: [
            { label: 'Distance', value: '900m' },
            { label: 'Structure', value: '6x100m + 6x50m' },
            { label: 'Pace', value: '100m steady, 50m faster' }
          ],
          description: '6x100m on 2:15 steady + 6x50m on 1:10 faster effort'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '100m easy' }
          ],
          description: '100m easy choice'
        }
      ],
      coach_notes: [
        'Focus on technique during the 100m repeats',
        'Push the pace slightly on the 50m intervals',
        'Good preparation for race intensity'
      ],
      target_metrics: {
        heart_rate: '100m: Zone 2, 50m: Zone 3',
        pace: '100m: comfortable, 50m: 85% effort',
        technique: 'Focus on high elbow catch'
      }
    },
    created_at: getDateFromToday(-6)
  },
  {
    id: 'workout_2_2',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-5), // Tuesday
    discipline: 'run',
    week_number: 2,
    workout_data: {
      title: 'Base Run + Strides',
      description: 'Easy run with short accelerations',
      duration: '45 min',
      distance: '7 km',
      intensity: 'Zone 1-2',
      structure: [
        {
          name: 'Easy Run',
          duration: '35 min',
          details: [
            { label: 'Pace', value: 'Comfortable aerobic' },
            { label: 'Focus', value: 'Consistent effort' }
          ],
          description: 'Steady, comfortable base pace'
        },
        {
          name: 'Strides',
          duration: '10 min',
          details: [
            { label: 'Structure', value: '4x20 seconds' },
            { label: 'Effort', value: 'Gradual acceleration' },
            { label: 'Recovery', value: '90 seconds easy' }
          ],
          description: '4x20 second strides with 90 second easy recovery'
        }
      ],
      coach_notes: [
        'Strides help with neuromuscular development',
        'Accelerate gradually, don\'t sprint',
        'Focus on good running form'
      ],
      target_metrics: {
        heart_rate: 'Base: Zone 2, Strides: Zone 4-5',
        pace: 'Base: 5:45/km, Strides: 4:00/km',
        form: 'High cadence, relaxed'
      }
    },
    created_at: getDateFromToday(-5)
  },
  {
    id: 'workout_2_3',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-4), // Wednesday
    discipline: 'bike',
    week_number: 2,
    workout_data: {
      title: 'Tempo Intervals',
      description: 'Steady-state intervals at tempo pace',
      duration: '80 min',
      distance: '32 km',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '20 min',
          details: [
            { label: 'Power', value: 'Gradual build to Zone 2' },
            { label: 'Include', value: '3x1 min at tempo' }
          ],
          description: 'Progressive warm-up with short tempo efforts'
        },
        {
          name: 'Main Set',
          duration: '45 min',
          details: [
            { label: 'Structure', value: '3x12 min at tempo' },
            { label: 'Recovery', value: '3 min easy between' },
            { label: 'Power', value: 'Zone 3 (76-90% FTP)' }
          ],
          description: '3x12 minutes at tempo with 3 minute recoveries'
        },
        {
          name: 'Cool-down',
          duration: '15 min',
          details: [
            { label: 'Power', value: 'Easy Zone 1' }
          ],
          description: 'Easy spinning to recover'
        }
      ],
      coach_notes: [
        'Tempo should feel "comfortably hard"',
        'You should be able to complete all 3 intervals',
        'Focus on smooth, consistent power'
      ],
      target_metrics: {
        heart_rate: 'Zone 3 (81-90% max HR)',
        power: 'Zone 3 (76-90% FTP)',
        cadence: '90-100 RPM'
      }
    },
    created_at: getDateFromToday(-4)
  },
  {
    id: 'workout_2_4',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-3), // Thursday
    discipline: 'run',
    week_number: 2,
    workout_data: {
      title: 'Easy Run',
      description: 'Recovery-paced easy run',
      duration: '30 min',
      distance: '4.5 km',
      intensity: 'Zone 1',
      structure: [
        {
          name: 'Easy Run',
          duration: '30 min',
          details: [
            { label: 'Pace', value: 'Very comfortable' },
            { label: 'Focus', value: 'Recovery from yesterday' }
          ],
          description: 'Easy-paced run focusing on active recovery'
        }
      ],
      coach_notes: [
        'Active recovery from bike workout',
        'Keep effort very low',
        'Skip if legs feel heavy'
      ],
      target_metrics: {
        heart_rate: 'Zone 1 (60-70% max HR)',
        pace: '6:15-6:45/km',
        effort: '2-3 out of 10'
      }
    },
    created_at: getDateFromToday(-3)
  },
  {
    id: 'workout_2_5',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-2), // Friday
    discipline: 'swim',
    week_number: 2,
    workout_data: {
      title: 'Endurance Swim',
      description: 'Steady aerobic swim session',
      duration: '40 min',
      distance: '1200m',
      intensity: 'Zone 2',
      structure: [
        {
          name: 'Warm-up',
          duration: '8 min',
          details: [
            { label: 'Distance', value: '200m easy' }
          ],
          description: '200m easy freestyle'
        },
        {
          name: 'Main Set',
          duration: '25 min',
          details: [
            { label: 'Distance', value: '900m' },
            { label: 'Structure', value: '3x300m on 6:00' },
            { label: 'Pace', value: 'Steady, sustainable' }
          ],
          description: '3x300m on 6:00 rest - steady pace you could hold longer'
        },
        {
          name: 'Cool-down',
          duration: '7 min',
          details: [
            { label: 'Distance', value: '100m easy' }
          ],
          description: '100m easy backstroke or choice'
        }
      ],
      coach_notes: [
        'Focus on consistent pacing across all 300m sets',
        'This should feel like race pace effort',
        'Good practice for sustained swimming'
      ],
      target_metrics: {
        heart_rate: 'Zone 2 (70-80% max HR)',
        pace: 'Consistent across sets',
        breathing: 'Bilateral every 3-5 strokes'
      }
    },
    created_at: getDateFromToday(-2)
  },
  {
    id: 'workout_2_6',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(-1), // Saturday
    discipline: 'bike',
    week_number: 2,
    workout_data: {
      title: 'Progressive Long Ride',
      description: 'Build effort throughout the ride',
      duration: '105 min',
      distance: '42 km',
      intensity: 'Zone 1-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '20 min',
          details: [
            { label: 'Power', value: 'Easy Zone 1-2' }
          ],
          description: 'Easy start building to comfortable'
        },
        {
          name: 'Progressive Build',
          duration: '75 min',
          details: [
            { label: 'Structure', value: '25min Z2 + 25min Z2-3 + 25min Z3' },
            { label: 'Focus', value: 'Gradual intensity increase' }
          ],
          description: 'Progressive build: 25min Z2, 25min Z2-3, 25min Z3'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Power', value: 'Easy Zone 1' }
          ],
          description: 'Easy spinning'
        }
      ],
      coach_notes: [
        'Practice negative split pacing',
        'Each 25min section should feel slightly harder',
        'Good preparation for race day pacing'
      ],
      target_metrics: {
        heart_rate: 'Z2→Z2-3→Z3 progression',
        power: '65%→80%→85% FTP progression',
        nutrition: 'Every 20 minutes'
      }
    },
    created_at: getDateFromToday(-1)
  },
  {
    id: 'workout_2_7',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(0), // Today - Sunday
    discipline: 'brick',
    week_number: 2,
    workout_data: {
      title: 'Brick Workout: Bike + Run',
      description: 'Practice transition from bike to run',
      duration: '75 min',
      distance: '25km bike + 4km run',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Bike Portion',
          duration: '60 min',
          details: [
            { label: 'Distance', value: '25km' },
            { label: 'Effort', value: 'Race pace last 20 minutes' },
            { label: 'Focus', value: 'Prepare legs for run' }
          ],
          description: '40min steady + 20min at race pace'
        },
        {
          name: 'Transition',
          duration: '2 min',
          details: [
            { label: 'Practice', value: 'Quick bike-to-run change' },
            { label: 'Focus', value: 'Efficient movement' }
          ],
          description: 'Quick transition practice'
        },
        {
          name: 'Run Portion',
          duration: '13 min',
          details: [
            { label: 'Distance', value: '4km' },
            { label: 'Pace', value: 'Race pace after settling' },
            { label: 'Focus', value: 'Running off the bike' }
          ],
          description: '4km at target race pace'
        }
      ],
      coach_notes: [
        'First brick workout - expect legs to feel heavy initially',
        'Focus on quick, efficient transition',
        'Run pace will feel harder off the bike - this is normal'
      ],
      target_metrics: {
        bike_power: 'Zone 2-3 (race effort)',
        run_pace: 'Target race pace',
        transition: 'Under 2 minutes'
      }
    },
    created_at: getDateFromToday(0)
  },

  // WEEK 3 - Next Week (Base Building final week)
  {
    id: 'workout_3_1',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(1), // Monday next week
    discipline: 'swim',
    week_number: 3,
    workout_data: {
      title: 'Build Set + Speed',
      description: 'Progressive build with speed work',
      duration: '55 min',
      distance: '1600m',
      intensity: 'Zone 1-4',
      structure: [
        {
          name: 'Warm-up',
          duration: '15 min',
          details: [
            { label: 'Distance', value: '500m' },
            { label: 'Structure', value: '300m easy + 4x50m build' }
          ],
          description: '300m easy + 4x50m build (easy to fast)'
        },
        {
          name: 'Main Set',
          duration: '30 min',
          details: [
            { label: 'Distance', value: '1000m' },
            { label: 'Structure', value: '5x200m descending' },
            { label: 'Pace', value: 'Each 200m faster than previous' }
          ],
          description: '5x200m on 4:00 - descending pace (each faster)'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '100m easy' }
          ],
          description: '100m easy choice'
        }
      ],
      coach_notes: [
        'Start conservatively on first 200m',
        'Each repeat should be 2-3 seconds faster',
        'Focus on maintaining stroke technique as speed increases'
      ],
      target_metrics: {
        heart_rate: 'Zone 2→4 progression',
        pace: 'Descending by 2-3 sec per 200m',
        stroke_rate: 'Increase gradually'
      }
    },
    created_at: getDateFromToday(1)
  },
  {
    id: 'workout_3_2',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(2), // Tuesday
    discipline: 'run',
    week_number: 3,
    workout_data: {
      title: 'Tempo Run',
      description: 'Sustained tempo effort',
      duration: '50 min',
      distance: '8 km',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '15 min',
          details: [
            { label: 'Structure', value: 'Easy + 4x20sec strides' },
            { label: 'Focus', value: 'Prepare for tempo effort' }
          ],
          description: '10min easy + 4x20sec strides with recovery'
        },
        {
          name: 'Tempo',
          duration: '20 min',
          details: [
            { label: 'Pace', value: 'Comfortably hard' },
            { label: 'Effort', value: 'Could hold for an hour' },
            { label: 'Focus', value: 'Steady, controlled' }
          ],
          description: '20 minutes at tempo pace'
        },
        {
          name: 'Cool-down',
          duration: '15 min',
          details: [
            { label: 'Pace', value: 'Easy, relaxed' }
          ],
          description: 'Easy cool-down and stretching'
        }
      ],
      coach_notes: [
        'Tempo should feel "comfortably hard"',
        'You should be able to say 2-3 words at a time',
        'Focus on consistent pacing throughout'
      ],
      target_metrics: {
        heart_rate: 'Zone 3 (81-90% max HR)',
        pace: '5:00-5:20/km',
        effort: '6-7 out of 10'
      }
    },
    created_at: getDateFromToday(2)
  },
  {
    id: 'workout_3_3',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(3), // Wednesday
    discipline: 'bike',
    week_number: 3,
    workout_data: {
      title: 'Sweet Spot Intervals',
      description: 'High Zone 2 / low Zone 3 intervals',
      duration: '85 min',
      distance: '35 km',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '20 min',
          details: [
            { label: 'Power', value: 'Progressive to Zone 2' },
            { label: 'Include', value: '3x2min sweet spot' }
          ],
          description: 'Progressive warm-up with sweet spot openers'
        },
        {
          name: 'Main Set',
          duration: '50 min',
          details: [
            { label: 'Structure', value: '4x10min sweet spot' },
            { label: 'Recovery', value: '5min easy between' },
            { label: 'Power', value: '88-94% FTP' }
          ],
          description: '4x10min at sweet spot with 5min recoveries'
        },
        {
          name: 'Cool-down',
          duration: '15 min',
          details: [
            { label: 'Power', value: 'Easy Zone 1' }
          ],
          description: 'Easy spinning cool-down'
        }
      ],
      coach_notes: [
        'Sweet spot is right below threshold',
        'Should feel moderately hard but sustainable',
        'Focus on smooth, consistent power output'
      ],
      target_metrics: {
        heart_rate: 'Zone 2-3 (85-92% max HR)',
        power: 'Sweet spot (88-94% FTP)',
        cadence: '90-95 RPM'
      }
    },
    created_at: getDateFromToday(3)
  },
  {
    id: 'workout_3_4',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(4), // Thursday
    discipline: 'run',
    week_number: 3,
    workout_data: {
      title: 'Recovery Run',
      description: 'Easy recovery run',
      duration: '35 min',
      distance: '5 km',
      intensity: 'Zone 1',
      structure: [
        {
          name: 'Easy Run',
          duration: '35 min',
          details: [
            { label: 'Pace', value: 'Very comfortable' },
            { label: 'Focus', value: 'Active recovery' }
          ],
          description: 'Easy pace focusing on recovery'
        }
      ],
      coach_notes: [
        'Recovery from bike intervals',
        'Keep heart rate low',
        'Focus on relaxed form'
      ],
      target_metrics: {
        heart_rate: 'Zone 1 (60-70% max HR)',
        pace: '6:00-6:30/km',
        effort: '2-3 out of 10'
      }
    },
    created_at: getDateFromToday(4)
  },
  {
    id: 'workout_3_5',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(5), // Friday
    discipline: 'swim',
    week_number: 3,
    workout_data: {
      title: 'Race Pace Practice',
      description: 'Practice race pace efforts',
      duration: '45 min',
      distance: '1300m',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '300m easy' }
          ],
          description: '300m easy freestyle'
        },
        {
          name: 'Main Set',
          duration: '25 min',
          details: [
            { label: 'Distance', value: '900m' },
            { label: 'Structure', value: '6x150m on 3:00' },
            { label: 'Pace', value: 'Target race pace' }
          ],
          description: '6x150m on 3:00 at target race pace'
        },
        {
          name: 'Cool-down',
          duration: '10 min',
          details: [
            { label: 'Distance', value: '100m easy' }
          ],
          description: '100m easy choice'
        }
      ],
      coach_notes: [
        'This should feel like race pace',
        'Practice sighting every 6-8 strokes',
        'Focus on efficient stroke at speed'
      ],
      target_metrics: {
        heart_rate: 'Zone 2-3 (race effort)',
        pace: 'Target race pace',
        sighting: 'Every 6-8 strokes'
      }
    },
    created_at: getDateFromToday(5)
  },
  {
    id: 'workout_3_6',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(6), // Saturday
    discipline: 'bike',
    week_number: 3,
    workout_data: {
      title: 'Race Simulation',
      description: 'Practice race pacing and nutrition',
      duration: '120 min',
      distance: '48 km',
      intensity: 'Zone 2-3',
      structure: [
        {
          name: 'Warm-up',
          duration: '30 min',
          details: [
            { label: 'Power', value: 'Build to race pace' },
            { label: 'Include', value: '3x3min at race pace' }
          ],
          description: 'Progressive warm-up with race pace efforts'
        },
        {
          name: 'Race Simulation',
          duration: '75 min',
          details: [
            { label: 'Effort', value: 'Target race pace' },
            { label: 'Power', value: 'Zone 3 (80-85% FTP)' },
            { label: 'Practice', value: 'Race nutrition and pacing' }
          ],
          description: '75min at target race effort with nutrition practice'
        },
        {
          name: 'Cool-down',
          duration: '15 min',
          details: [
            { label: 'Power', value: 'Easy Zone 1' }
          ],
          description: 'Easy cool-down'
        }
      ],
      coach_notes: [
        'This simulates race conditions',
        'Practice exact race nutrition plan',
        'Focus on pacing consistency'
      ],
      target_metrics: {
        heart_rate: 'Zone 3 (target race HR)',
        power: 'Zone 3 (80-85% FTP)',
        nutrition: 'Race plan timing'
      }
    },
    created_at: getDateFromToday(6)
  },
  {
    id: 'workout_3_7',
    plan_id: 'plan_1',
    scheduled_date: getDateFromToday(7), // Sunday
    discipline: 'run',
    week_number: 3,
    workout_data: {
      title: 'Long Run with Pickups',
      description: 'Long run with race pace segments',
      duration: '70 min',
      distance: '11 km',
      intensity: 'Zone 1-3',
      structure: [
        {
          name: 'Easy Build',
          duration: '20 min',
          details: [
            { label: 'Pace', value: 'Easy to comfortable' },
            { label: 'Focus', value: 'Gradual warm-up' }
          ],
          description: 'Easy start building to comfortable pace'
        },
        {
          name: 'Race Pace Pickups',
          duration: '40 min',
          details: [
            { label: 'Structure', value: '4x5min at race pace' },
            { label: 'Recovery', value: '5min easy between' },
            { label: 'Focus', value: 'Practice race pacing' }
          ],
          description: '4x5min at race pace with 5min easy recoveries'
        },
        {
          name: 'Easy Finish',
          duration: '10 min',
          details: [
            { label: 'Pace', value: 'Relaxed cool-down' }
          ],
          description: 'Easy cool-down pace'
        }
      ],
      coach_notes: [
        'Practice running race pace when tired',
        'Focus on consistent pacing during pickups',
        'This prepares you for race day execution'
      ],
      target_metrics: {
        heart_rate: 'Pickups: Zone 3 (race HR)',
        pace: 'Pickups: 5:15/km (race pace)',
        consistency: 'Even pacing on pickups'
      }
    },
    created_at: getDateFromToday(7)
  }
];

// Helper functions matching Supabase query patterns
export const getWorkoutsByPlanId = (planId) => 
  mockWorkouts.filter(workout => workout.plan_id === planId);

export const getWorkoutsByWeek = (planId, weekNumber) => 
  mockWorkouts.filter(workout => 
    workout.plan_id === planId && workout.week_number === weekNumber
  );

export const getWorkoutById = (id) => 
  mockWorkouts.find(workout => workout.id === id);

export const getTodaysWorkout = (planId) => {
  const today = new Date().toISOString().split('T')[0];
  return mockWorkouts.find(workout => 
    workout.plan_id === planId && 
    workout.scheduled_date.split('T')[0] === today
  );
};

export const getUpcomingWorkouts = (planId, days = 7) => {
  const now = new Date();
  const future = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return mockWorkouts.filter(workout => 
    workout.plan_id === planId &&
    new Date(workout.scheduled_date) >= now &&
    new Date(workout.scheduled_date) <= future
  ).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
};

// Get weekly plan with completion status
export const getWeeklyPlan = (planId) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const weekWorkouts = mockWorkouts.filter(workout => {
    const workoutDate = new Date(workout.scheduled_date);
    return workout.plan_id === planId &&
           workoutDate >= startOfWeek &&
           workoutDate <= endOfWeek;
  }).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
  
  // Add status based on date
  return weekWorkouts.map(workout => {
    const workoutDate = new Date(workout.scheduled_date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    workoutDate.setHours(0, 0, 0, 0);
    
    let status = 'scheduled';
    if (workoutDate < todayDate) {
      status = Math.random() > 0.3 ? 'completed' : 'missed';
    }
    
    return {
      ...workout,
      status
    };
  });
};