import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView>
      <View className='pt-6 px-8 pb-1 flex w-full flex-row justify-between items-center mb-3'>
        <View className=''>
          <Image
            source={images.headerLogo}
            alt='Logo'
            className='w-48 h-auto'
            style={{ resizeMode: 'contain' }}
          ></Image>
        </View>
        <View>
          <Image source={images.enLang} alt='switch'></Image>
        </View>
      </View>
      <View className='px-4'>
        <View className='w-full h-1 bg-body-light px-4'></View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
