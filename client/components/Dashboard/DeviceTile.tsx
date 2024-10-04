import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { images } from '@/constants';
import { router } from 'expo-router';

const DeviceTile = ({}) => {
  const { isDeviceConnected, setIsDeviceConnected }: any = useGlobalContext();
  return (
    <View className='w-full my-2 px-6'>
      <View className='relative'>
        <Pressable
          onPress={() => {
            router.push('/(routes)/device');
          }}
        >
          <Image
            source={isDeviceConnected ? images.deviceOn : images.deviceOff}
            style={{ resizeMode: 'contain' }}
            className='w-full'
          ></Image>
        </Pressable>

        <TouchableOpacity
          className='absolute right-2 top-4'
          onPress={() =>
            setIsDeviceConnected(
              (isDeviceConnected: boolean) => !isDeviceConnected
            )
          }
        >
          <Image
            source={isDeviceConnected ? images.onSwitch : images.offSwitch}
            style={{ resizeMode: 'contain' }}
            className='w-11 h-11'
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeviceTile;
