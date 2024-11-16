import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import FastImage from 'react-native-fast-image';

export interface ButtonProps {
  onPress: () => void;
  classes?: string;
  text: string;
  disabled?: boolean;
  textClasses?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  onPress,
  classes,
  text,
  disabled = false,
  textClasses,
}) => {
  return (
    <TouchableOpacity
      className={
        `px-6 rounded-xl py-3 text-xl flex items-center justify-center bg-primary-main ${disabled && 'opacity-60'} ` +
        classes
      }
      onPress={onPress}
      disabled={disabled}
    >
      {!disabled ? (
        <Text
          className={
            'font-pSansRegular text-onPrimary-main text-lg ' + textClasses
          }
        >
          {text || 'Button'}
        </Text>
      ) : (
        <Image source={images.LoadingGIF} className='w-8 h-8'></Image>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
