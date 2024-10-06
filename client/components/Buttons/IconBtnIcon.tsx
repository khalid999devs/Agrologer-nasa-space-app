import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const IconBtnIcon = ({
  text,
  onBackPress,
  icon,
  onBtnPress,
  btnImg,
}: {
  text?: string;
  onBackPress?: () => void;
  icon?: any;
  onBtnPress?: () => void;
  btnImg: any;
}) => {
  return (
    <View className='flex flex-row items-center gap-4'>
      <TouchableOpacity onPress={onBackPress}>
        <Image source={icon || icons.backGreenArrow}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBtnPress} className=''>
        <Image source={btnImg}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default IconBtnIcon;
