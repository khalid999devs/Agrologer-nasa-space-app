import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const PredictionTile = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-secondary-main rounded-lg w-full flex items-center justify-center flex-row py-3'
    >
      <Image source={icons.predictionsIcon}></Image>
      <Text className='font-pSansBold text-body-main ml-4'>Predictions</Text>
    </TouchableOpacity>
  );
};

export default PredictionTile;
