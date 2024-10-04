import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import PrimaryButton from '../Buttons/PrimaryButton';

const DecisionTiles = ({
  title,
  image,
  data = { level: 'normal' },
  classes,
}: any) => {
  return (
    <View className={'p-3 rounded-lg w-[48%] bg-white ' + classes}>
      <Text className='text-xl text-secondary-main font-pSansBold mb-2'>
        {title}
      </Text>
      <View className='h-0.5 bg-onPrimary-light w-full mb-2'></View>
      <View className='w-full py-2 flex items-center justify-center'>
        <Image source={image}></Image>
      </View>

      <View className='h-0.5 bg-onPrimary-light w-full mb-2'></View>
      <View className='relative w-full py-3 mb-2'>
        <View
          className={`absolute top-0.5 ${data?.level === 'normal' ? 'left-[30%]' : data?.level === 'medium' ? 'left-[68%]' : 'left-[86%]'}`}
        >
          <Image source={images.pointer}></Image>
        </View>
        <Image
          className='w-full h-auto'
          style={{ resizeMode: 'contain' }}
          source={images.scale}
        ></Image>
      </View>
      <PrimaryButton
        text={data?.level}
        classes={`py-1.5 ${data?.level === 'high' ? '!bg-red-700' : data?.level === 'medium' ? '!bg-orange-600' : ''}`}
        onPress={() => {}}
      />
    </View>
  );
};

export default DecisionTiles;
