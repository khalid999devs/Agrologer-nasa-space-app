import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

import { icons } from '@/constants';

const TabIcon = ({
  source,
  focused,
  text,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  text: string;
}) => (
  <View
    className={`flex-1 flex-row justify-center items-center rounded-full ${focused ? 'bg-general-300 opacity-100' : 'opacity-70'}`}
  >
    <View
      className={`rounded-full w-auto h-10 items-center justify-center ${focused ? 'bg-general-400' : ''}`}
    >
      <Image
        source={source}
        tintColor='white'
        resizeMode='contain'
        className='w-6 h-6'
      />
      <Text className='text-xs text-zinc-200'>{text || 'Home'}</Text>
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#02A05E',
          paddingBottom: 0, // ios only
          overflow: 'hidden',
          height: 68,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} text='Home' />
          ),
        }}
      />
      <Tabs.Screen
        name='tools'
        options={{
          title: 'Tools',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.tools} focused={focused} text='Tools' />
          ),
        }}
      />

      <Tabs.Screen
        name='notifications'
        options={{
          title: 'Notification',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={icons.notifications}
              focused={focused}
              text='Notifications'
            />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} text='Profile' />
          ),
        }}
      />
    </Tabs>
  );
}
