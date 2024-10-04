import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const IconTextBtn = ({
  text,
  onPress,
  icon,
}: {
  text?: string;
  onPress?: () => void;
  icon?: any;
}) => {
  return (
    <Pressable
      className='flex flex-row items-center gap-2'
      onPress={() => {
        onPress && onPress();
      }}
    >
      <View>
        <Image source={icon || icons.backGreenArrow}></Image>
      </View>
      <Text className='text-tertiary-green font-pSansBold text-lg'>
        {text || 'Dashboard'}
      </Text>
    </Pressable>
  );
};

export default IconTextBtn;
