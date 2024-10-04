import { View, Text } from 'react-native';
import React from 'react';
import Header from '@/components/utils/Header';
import IconBtnIcon from '@/components/Buttons/IconBtnIcon';
import { images } from '@/constants';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommunityInputSystem from '@/components/Forms/CommunityInputSystem';

const CommunityScreen = () => {
  return (
    <View className='pb-12 flex-1 relative'>
      <Header />
      <View className='mt-4 px-8'>
        <IconBtnIcon
          btnImg={images.CommunityBtn}
          onBtnPress={() => {}}
          onBackPress={() => {
            router.push('/(tabs)/home');
          }}
        />
      </View>

      <CommunityInputSystem />
    </View>
  );
};

export default CommunityScreen;
