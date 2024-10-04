import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';

const Header = () => {
  return (
    <>
      <View className='pt-14 px-8 pb-1 flex w-full flex-row justify-between items-center mb-3'>
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
    </>
  );
};

export default Header;
