import { View, Text, Image } from 'react-native';
import React from 'react';

const AvatarSec = ({ image, fullName, designation }: any) => {
  return (
    <>
      <View className='flex flex-row w-full pt-4'>
        <View className='w-auto mr-4 '>
          <Image
            source={image}
            className='rounded-full w-20 h-20'
            style={{ resizeMode: 'cover' }}
          ></Image>
        </View>
        <View className=''>
          <Text className='text-xl text-secondary-dark mt-2'>
            {fullName || 'Example Person'}
          </Text>
          <Text className='mt-2 text-lg text-secondary-light'>
            {designation || 'Expert Farmer'}
          </Text>
        </View>
      </View>
      <View className='h-0.5 bg-secondary-light opacity-40 w-full my-4 mt-6'></View>
    </>
  );
};

export default AvatarSec;
