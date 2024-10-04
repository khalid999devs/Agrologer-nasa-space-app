import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const AlertTile = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-secondary-light mt-3 rounded-lg w-full flex items-center justify-center flex-row py-3'
    >
      <Image source={icons.alertsIcon}></Image>
      <Text className='font-pSansBold text-body-main ml-4'>
        Nothing To Worry
      </Text>
    </TouchableOpacity>
  );
};

export default AlertTile;
