import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dashboard, PlanPage, WeeklyView, WorkoutDetail, CoachPage, ProfilePage, InsightsPage } from './src/pages';
import { ProfileIcon, NotificationsIcon } from './src/components/ui';
import { colors, typography, spacing } from './src/styles/tokens';

type PlanStackParamList = {
  PlanOverview: undefined;
  WeeklyView: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  Profile: undefined;
};

type DashboardStackParamList = {
  DashboardHome: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  Profile: undefined;
};

type TabParamList = {
  Dashboard: undefined;
  Plan: undefined;
  Insights: undefined;
  Coach: undefined;
};

type CoachStackParamList = {
  CoachHome: undefined;
  Profile: undefined;
};

type InsightsStackParamList = {
  InsightsHome: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const PlanStack = createStackNavigator<PlanStackParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();
const CoachStack = createStackNavigator<CoachStackParamList>();
const InsightsStack = createStackNavigator<InsightsStackParamList>();

function PlanStackNavigator() {
  return (
    <PlanStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#F8F9FA',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#1C1C1E',
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: '#1C1C1E',
        },
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => (
          <Ionicons
            name="chevron-back"
            size={typography.sizes.lg}
            color={tintColor}
          />
        ),
        headerLeft: () => (
          <ProfileIcon
            initials="CB"
            onPress={() => navigation.navigate('Profile')}
            size={32}
          />
        ),
        headerRight: () => (
          <NotificationsIcon
            onPress={() => console.log('Notifications pressed')}
            size={24}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: spacing[4],
        },
        headerRightContainerStyle: {
          paddingRight: spacing[4],
        },
      })}
    >
      <PlanStack.Screen 
        name="PlanOverview" 
        component={PlanPage} 
        options={{ title: 'Training Plan' }}
      />
      <PlanStack.Screen 
        name="WeeklyView" 
        component={WeeklyView} 
        options={{ title: 'Weekly View' }}
      />
      <PlanStack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetail} 
        options={{ 
          title: 'Workout Detail',
          headerLeft: undefined,
          headerRight: undefined,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <PlanStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
          headerLeft: undefined,
          headerRight: undefined,
        }}
      />
    </PlanStack.Navigator>
  );
}

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#F8F9FA',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#1C1C1E',
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: '#1C1C1E',
        },
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => (
          <Ionicons
            name="chevron-back"
            size={typography.sizes.lg}
            color={tintColor}
          />
        ),
        headerLeft: () => (
          <ProfileIcon
            initials="CB"
            onPress={() => navigation.navigate('Profile')}
            size={32}
          />
        ),
        headerRight: () => (
          <NotificationsIcon
            onPress={() => console.log('Notifications pressed')}
            size={24}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: spacing[4],
        },
        headerRightContainerStyle: {
          paddingRight: spacing[4],
        },
      })}
    >
      <DashboardStack.Screen 
        name="DashboardHome" 
        component={Dashboard} 
        options={{ title: 'Home' }}
      />
      <DashboardStack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetail} 
        options={{ 
          title: 'Workout Detail',
          headerLeft: undefined,
          headerRight: undefined,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <DashboardStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
          headerLeft: undefined,
          headerRight: undefined,
        }}
      />
    </DashboardStack.Navigator>
  );
}

function CoachStackNavigator() {
  return (
    <CoachStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#F8F9FA',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#1C1C1E',
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: '#1C1C1E',
        },
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => (
          <Ionicons
            name="chevron-back"
            size={typography.sizes.lg}
            color={tintColor}
          />
        ),
        headerLeft: () => (
          <ProfileIcon
            initials="CB"
            onPress={() => navigation.navigate('Profile')}
            size={32}
          />
        ),
        headerRight: () => (
          <NotificationsIcon
            onPress={() => console.log('Notifications pressed')}
            size={24}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: spacing[4],
        },
        headerRightContainerStyle: {
          paddingRight: spacing[4],
        },
      })}
    >
      <CoachStack.Screen 
        name="CoachHome" 
        component={CoachPage} 
        options={{ title: 'Coach' }}
      />
      <CoachStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
          headerLeft: undefined,
          headerRight: undefined,
        }}
      />
    </CoachStack.Navigator>
  );
}

function InsightsStackNavigator() {
  return (
    <InsightsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#F8F9FA',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#1C1C1E',
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: '#1C1C1E',
        },
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => (
          <Ionicons
            name="chevron-back"
            size={typography.sizes.lg}
            color={tintColor}
          />
        ),
        headerLeft: () => (
          <ProfileIcon
            initials="CB"
            onPress={() => navigation.navigate('Profile')}
            size={32}
          />
        ),
        headerRight: () => (
          <NotificationsIcon
            onPress={() => console.log('Notifications pressed')}
            size={24}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: spacing[4],
        },
        headerRightContainerStyle: {
          paddingRight: spacing[4],
        },
      })}
    >
      <InsightsStack.Screen 
        name="InsightsHome" 
        component={InsightsPage} 
        options={{ title: 'Insights' }}
      />
      <InsightsStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
          headerLeft: undefined,
          headerRight: undefined,
        }}
      />
    </InsightsStack.Navigator>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Plan') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Insights') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Coach') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1C1C1E',
          tabBarInactiveTintColor: colors.neutral.secondary,
          tabBarStyle: {
            backgroundColor: colors.neutral.cards,
            borderTopWidth: 1,
            borderTopColor: colors.neutral.separator,
            paddingBottom: Math.max(insets.bottom, spacing[1] / 2),
            paddingTop: spacing[1] / 2,
            height: 52 + Math.max(insets.bottom - spacing[1] / 2, 0),
          },
          headerStyle: {
            backgroundColor: '#F8F9FA',
            shadowOpacity: 0,
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#1C1C1E',
          headerTitleStyle: {
            fontWeight: typography.weights.bold,
            fontSize: typography.sizes.lg,
            color: '#1C1C1E',
          },
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardStackNavigator}
          options={{ title: 'Today', headerShown: false }}
        />
        <Tab.Screen 
          name="Plan" 
          component={PlanStackNavigator}
          options={{ title: 'Plan', headerShown: false }}
        />
        <Tab.Screen 
          name="Insights" 
          component={InsightsStackNavigator}
          options={{ title: 'Insights', headerShown: false }}
        />
        <Tab.Screen 
          name="Coach" 
          component={CoachStackNavigator}
          options={{ title: 'Coach', headerShown: false }}
        />
      </Tab.Navigator>
    );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
