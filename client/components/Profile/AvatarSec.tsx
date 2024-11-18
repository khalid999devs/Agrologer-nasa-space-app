import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const AvatarSec = ({ image, fullName, designation, logoutUser }: any) => {
  return (
    <>
      <View className='flex flex-row w-full pt-4 relative'>
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
        <Pressable
          className='absolute right-0 top-2 opacity-40'
          onPress={logoutUser}
        >
          <Image
            source={icons.LogoutIcon}
            className='w-6 h-6'
            style={{ resizeMode: 'contain' }}
          ></Image>
        </Pressable>
      </View>
      <View className='h-0.5 bg-secondary-light opacity-40 w-full my-4 mt-6'></View>
    </>
  );
};

export default AvatarSec;
