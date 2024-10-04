import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export interface ButtonProps {
  onPress: () => void;
  classes?: string;
  text: string;
  disabled?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  onPress,
  classes,
  text,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      className={
        'px-6 rounded-lg py-2 text-xl flex items-center justify-center bg-onPrimary-main ' +
        classes
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text className='font-pSansRegular text-primary-light text-xl'>
        {text || 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
