import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const ToolTabs = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='p-3.5 mb-3 mr-3 w-[46%] rounded-lg bg-white'
    >
      <Text className='text-secondary-main font-pSansBold text-left mb-4'>
        {title || 'Tool'}
      </Text>
      <View className='flex mt-3 items-end w-full justify-end'>
        <Image source={icon}></Image>
      </View>
    </TouchableOpacity>
  );
};

export default ToolTabs;
