import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

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
        'px-6 rounded-xl py-3 text-xl flex items-center justify-center bg-primary-main ' +
        classes
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={
          'font-pSansRegular text-onPrimary-main text-lg ' + textClasses
        }
      >
        {text || 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
