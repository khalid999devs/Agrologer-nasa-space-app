import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const ProfileMenu = ({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='w-full flex-row flex items-center justify-between'
    >
      <View className='flex flex-row items-center'>
        <Image
          source={icon}
          className='mr-3 w-8 h-14 translate-y-3'
          style={{ resizeMode: 'cover' }}
        ></Image>

        <Text className='text-lg text-secondary-main'>
          {title || 'Profile menu'}
        </Text>
      </View>
      <View>
        <Image source={icons.ArrowrightIcon}></Image>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMenu;
