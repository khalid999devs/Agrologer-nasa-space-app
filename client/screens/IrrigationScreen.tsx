import { View, Text } from 'react-native';
import React from 'react';
import Header from '@/components/utils/Header';
import IconBtnIcon from '@/components/Buttons/IconBtnIcon';
import { router } from 'expo-router';
import { images } from '@/constants';

const IrrigationScreen = () => {
  return (
    <View className='pb-12 flex-1 relative'>
      <Header />
      <View className='mt-4 px-8'>
        <IconBtnIcon
          btnImg={images.IrrigationBtn}
          onBtnPress={() => {}}
          onBackPress={() => {
            router.push('/(tabs)/tools');
          }}
        />
      </View>
    </View>
  );
};

export default IrrigationScreen;
