import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';

interface SingleMsg {
  isUser?: boolean;
  data: { image?: string; text?: string };
  index: number;
}

const SingleMsg = ({ isUser, data, index }: SingleMsg) => {
  return (
    <View
      className={`flex ${index !== 0 && 'mt-5'} flex-row w-full ${isUser ? 'items-end justify-end' : 'items-start justify-start'}`}
    >
      {!isUser && (
        <View className='mr-2'>
          <Image
            source={data?.image ? { uri: data.image } : images.placeholder}
            className='w-10 h-10 rounded-full'
            style={{ resizeMode: 'center' }}
          ></Image>
        </View>
      )}
      <View
        className={`${isUser ? 'bg-primary-main' : 'bg-onPrimary-main'} p-3 text-left rounded-lg max-w-[65%]`}
      >
        <Text
          className={`${isUser ? 'text-body-main' : 'text-secondary-main'}`}
        >
          {data?.text}
        </Text>
      </View>
    </View>
  );
};

export default SingleMsg;
