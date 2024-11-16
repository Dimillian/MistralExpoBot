import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import { Button } from 'swiftui-react-native';

export default function TabLayout() {
  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          tabBarInactiveTintColor: Colors.tabIconDefault,
        }}
      >
      <Tabs.Screen
      name="index"
      options={{
        title: 'Le Chat',
        headerShown: true,
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
        ),
      }}
      />
      <Tabs.Screen
      name="history"
      options={{
        title: 'History',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}
