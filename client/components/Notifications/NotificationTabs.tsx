import { View, Text } from 'react-native';
import React from 'react';

const NotificationTabs = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <View className='flex flex-row w-full my-5'>
        <View className='w-4 h-4 mt-1.5 bg-primary-main mr-3'></View>
        <View className=''>
          <Text className='font-pSansBold text-xl text-black'>
            {title || 'Notification title'}
          </Text>
          <Text className='text-md text-opacity-70 text-lg opacity-75 text-black'>
            {subtitle || 'Notification subtitle'}
          </Text>
        </View>
      </View>
      <View className='h-0.5 bg-secondary-light opacity-40 w-full'></View>
    </>
  );
};

export default NotificationTabs;
