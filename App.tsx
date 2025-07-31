import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text } from 'react-native';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Dashboard, 
  PlanPage, 
  PlanOverviewPage, 
  ManagePlanPage, 
  WeeklyView, 
  WeekDetailPage, 
  WorkoutDetail, 
  ProfilePage, 
  PersonalInformationPage, 
  TrainingPreferencesPage,
  SubscriptionBillingPage,
  PushNotificationsPage,
  EmailPreferencesPage,
  HelpCenterPage,
  ContactSupportPage,
  AboutPage,
  InsightsPage 
} from './src/pages';
import AllInsightsPage from './src/pages/AllInsightsPage';
import { ProfileIcon, NotificationsIcon } from './src/components/ui';
import AuthWrapper from './src/components/auth/AuthWrapper';
import { colors, typography, spacing } from './src/styles/tokens';
import { SplashScreen } from './src/screens/auth/SplashScreen';
import { SignInScreen } from './src/screens/auth/SignInScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { SignOutScreen } from './src/screens/auth/SignOutScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  SignOut: undefined;
  MainApp: undefined;
};

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type PlanStackParamList = {
  PlanOverview: undefined;
  PlanDetailOverview: undefined;
  WeeklyView: undefined;
  WeekDetail: {
    weekNumber: number;
    phase: string;
    description: string;
    workouts: any[];
  };
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  ManagePlan: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
};

type DashboardStackParamList = {
  DashboardHome: undefined;
  WorkoutDetail: {
    workoutId: string;
    status?: 'upcoming' | 'scheduled' | 'completed';
  };
  Profile: undefined;
  PersonalInformation: undefined;
};

type TabParamList = {
  Dashboard: undefined;
  Plan: undefined;
  Insights: undefined;
  Profile: undefined;
};

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  TrainingPreferences: undefined;
  SubscriptionBilling: undefined;
  PushNotifications: undefined;
  EmailPreferences: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  About: undefined;
};

type InsightsStackParamList = {
  InsightsHome: undefined;
  AllInsights: {
    insights: Array<{
      id: string;
      date: Date;
      insights: Array<{
        type: 'performance' | 'progress' | 'achievement' | 'recommendation';
        title: string;
        message: string;
        icon: string;
      }>;
    }>;
  };
  Profile: undefined;
  PersonalInformation: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const PlanStack = createStackNavigator<PlanStackParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const InsightsStack = createStackNavigator<InsightsStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: () => ({
          cardStyle: {
            opacity: 1,
          },
        }),
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 0 } },
          close: { animation: 'timing', config: { duration: 0 } },
        },
      }}
    >
      <AuthStack.Screen 
        name="SignIn" 
        component={SignInScreen}
      />
      <AuthStack.Screen 
        name="SignUp" 
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}

function AuthContainer() {
  return (
    <AuthWrapper>
      <AuthStackNavigator />
    </AuthWrapper>
  );
}

function SignOutContainer() {
  return (
    <AuthWrapper>
      <SignOutScreen />
    </AuthWrapper>
  );
}

function PlanStackNavigator() {
  return (
    <PlanStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.neutral.cards,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.neutral.text,
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: colors.neutral.text,
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
            imageSource={require('./assets/delta_black.png')}
            onPress={() => navigation.getParent()?.navigate('Dashboard')}
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
        name="PlanDetailOverview" 
        component={PlanOverviewPage} 
        options={{ headerShown: false }}
      />
      <PlanStack.Screen 
        name="WeeklyView" 
        component={WeeklyView} 
        options={{ title: 'Weekly View' }}
      />
      <PlanStack.Screen 
        name="WeekDetail" 
        component={WeekDetailPage} 
        options={{ headerShown: false }}
      />
      <PlanStack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetail} 
        options={({ navigation }) => ({ 
          title: 'Workout Detail',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: spacing[4],
                marginLeft: 0,
              }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={colors.neutral.text} />
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.medium,
                color: colors.neutral.text,
                marginLeft: spacing[1],
              }}>Back</Text>
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 0, // Remove default padding to align with page content
          },
          headerRight: () => null, // Remove notification icon
        })}
      />
      <PlanStack.Screen 
        name="ManagePlan" 
        component={ManagePlanPage} 
        options={{ headerShown: false }}
      />
      <PlanStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
        }}
      />
      <PlanStack.Screen 
        name="PersonalInformation" 
        component={PersonalInformationPage} 
        options={{ headerShown: false }}
      />
    </PlanStack.Navigator>
  );
}

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.neutral.cards,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.neutral.text,
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: colors.neutral.text,
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
            imageSource={require('./assets/delta_black.png')}
            onPress={() => navigation.getParent()?.navigate('Dashboard')}
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
        options={({ navigation }) => ({ 
          title: 'Workout Detail',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: spacing[4],
                marginLeft: 0,
              }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={colors.neutral.text} />
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.medium,
                color: colors.neutral.text,
                marginLeft: spacing[1],
              }}>Back</Text>
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 0, // Remove default padding to align with page content
          },
          headerRight: () => null, // Remove notification icon
        })}
      />
      <DashboardStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
        }}
      />
      <DashboardStack.Screen 
        name="PersonalInformation" 
        component={PersonalInformationPage} 
        options={{ headerShown: false }}
      />
    </DashboardStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.neutral.cards,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.neutral.text,
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: colors.neutral.text,
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
            imageSource={require('./assets/delta_black.png')}
            onPress={() => navigation.getParent()?.navigate('Dashboard')}
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
      <ProfileStack.Screen 
        name="ProfileHome" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
        }}
      />
      <ProfileStack.Screen 
        name="PersonalInformation" 
        component={PersonalInformationPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="TrainingPreferences" 
        component={TrainingPreferencesPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="SubscriptionBilling" 
        component={SubscriptionBillingPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="PushNotifications" 
        component={PushNotificationsPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="EmailPreferences" 
        component={EmailPreferencesPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="HelpCenter" 
        component={HelpCenterPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="ContactSupport" 
        component={ContactSupportPage} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="About" 
        component={AboutPage} 
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

function InsightsStackNavigator() {
  return (
    <InsightsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.neutral.cards,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.neutral.text,
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.lg,
          color: colors.neutral.text,
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
            imageSource={require('./assets/delta_black.png')}
            onPress={() => navigation.getParent()?.navigate('Dashboard')}
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
        name="AllInsights" 
        component={AllInsightsPage} 
        options={({ navigation }) => ({ 
          title: 'All Training Insights',
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: spacing[4],
                marginLeft: 0,
              }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={colors.neutral.text} />
              <Text style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.medium,
                color: colors.neutral.text,
                marginLeft: spacing[1],
              }}>Back</Text>
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 0, // Remove default padding to align with page content
          },
          headerRight: () => null, // Remove notification icon
        })}
      />
      <InsightsStack.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{ 
          title: 'Profile',
        }}
      />
      <InsightsStack.Screen 
        name="PersonalInformation" 
        component={PersonalInformationPage} 
        options={{ headerShown: false }}
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
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.neutral.text,
          tabBarInactiveTintColor: colors.neutral.secondary,
          tabBarStyle: {
            backgroundColor: colors.neutral.cards,
            borderTopWidth: 1,
            borderTopColor: colors.neutral.separator,
            paddingBottom: Math.max(insets.bottom + spacing[1], spacing[2]),
            paddingTop: spacing[1] / 2,
            height: 52 + Math.max(insets.bottom, spacing[1]),
          },
          headerStyle: {
            backgroundColor: colors.neutral.cards,
            shadowOpacity: 0,
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: colors.neutral.text,
          headerTitleStyle: {
            fontWeight: typography.weights.bold,
            fontSize: typography.sizes.lg,
            color: colors.neutral.text,
          },
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardStackNavigator}
          options={{ title: 'Home', headerShown: false }}
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
          name="Profile" 
          component={ProfileStackNavigator}
          options={{ title: 'Profile', headerShown: false }}
        />
      </Tab.Navigator>
    );
}

export default function App() {
  useEffect(() => {
    // Preload the logo image
    Asset.fromModule(require('./assets/delta_black.png')).downloadAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="Auth" component={AuthContainer} />
          <RootStack.Screen name="SignOut" component={SignOutContainer} />
          <RootStack.Screen name="MainApp" component={TabNavigator} />
        </RootStack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
