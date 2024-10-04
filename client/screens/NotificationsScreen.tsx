import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import NotificationTabs from '@/components/Notifications/NotificationTabs';
import Header from '@/components/utils/Header';

const NotificationsScreen = () => {
  return (
    <ScrollView className='pb-12'>
      <Header />
      <View className='px-8 mt-4'>
        <NotificationTabs
          title='It may rain at 6 pm'
          subtitle='A little speedy wind too'
        />
        <NotificationTabs
          title='Spray Carbofuran'
          subtitle='0.5 - 0.6 kg/Ha within 2 days'
        />
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;
