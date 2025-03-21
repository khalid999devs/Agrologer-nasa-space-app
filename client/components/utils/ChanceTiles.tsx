import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import PrimaryButton from '../Buttons/PrimaryButton';

type ChanceTilesProps = {
  title: string;
  image: any;
  data?: {
    level: 'normal' | 'medium' | 'high';
    chanceText: string;
    desc: string;
  };
  classes?: string;
};

const ChanceTiles = ({
  title,
  image,
  data = { level: 'normal', chanceText: '', desc: '' },
  classes,
}: ChanceTilesProps) => {
  return (
    <View className={'p-3 rounded-lg w-[48%] bg-white ' + classes}>
      <Text className='text-xl text-secondary-main font-pSansBold mb-2'>
        {title}
      </Text>
      <View className='h-0.5 bg-onPrimary-light w-full mb-2'></View>
      <View className='w-full py-2 flex items-center justify-center'>
        <Image source={image}></Image>
      </View>

      <View className='h-0.5 bg-onPrimary-light w-full mb-4'></View>
      <PrimaryButton
        text={data?.chanceText}
        classes={`py-1.5 mb-2 ${data?.level === 'high' ? '!bg-red-700' : data?.level === 'medium' ? '!bg-orange-600' : ''}`}
        onPress={() => {}}
      />
      <PrimaryButton
        text={data?.desc}
        textClasses='text-xs'
        classes={`py-1.5 bg-secondary-main px-1`}
        onPress={() => {}}
      />
    </View>
  );
};

export default ChanceTiles;
