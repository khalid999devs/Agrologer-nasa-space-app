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
    className={`flex flex-row items-center justify-center rounded-full ${
      focused ? 'bg-general-300 opacity-100' : 'opacity-70'
    } w-20 h-12`}
  >
    <View
      className={`rounded-full w-full h-full items-center justify-center ${
        focused ? 'bg-general-400' : ''
      }`}
    >
      <Image
        source={source}
        tintColor='white'
        resizeMode='contain'
        className='w-7 h-7 mb-1'
      />
      <Text className='text-xs text-zinc-200'>{text || 'Home'}</Text>
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#02A05E',
          height: 78,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 22, // Add padding for better iOS alignment
          paddingTop: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
