import { View, Text, KeyboardTypeOptions, TextInput } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';

interface InputProps {
  title: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  warning?: string;
  onChangeText?: (text: string) => void;
  showWarning?: boolean;
  emailFormatWarning?: string;
  disabled?: boolean;
  classes?: string;
  inputClasses?: string;
  setLocationData: (props: any) => void;
  btnHide?: boolean;
}

const MapInputs = ({
  title,
  placeholder = 'Type in your address',
  keyboardType,
  value,
  warning,
  onChangeText,
  showWarning,
  emailFormatWarning,
  disabled,
  classes,
  inputClasses,
  setLocationData,
  btnHide = false,
}: InputProps) => {
  const [location, setLocation] = useState('');
  const handleMapPoint = () => {};
  return (
    <View className={'w-full ' + classes}>
      <View className={'w-full mb-2 ' + inputClasses}>
        <Text className='text-2xl text-secondary-main font-pSansBold mb-3'>
          {title}
        </Text>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={location}
          aria-disabled={disabled}
          onChangeText={(text) => setLocation(text)}
          className='bg-white rounded-xl px-4 py-3.5 text-lg'
          placeholderTextColor={'#999999'}
        />
        {showWarning && <Text>{warning}</Text>}
      </View>

      <View className=' w-full h-48 rounded-xl bg-secondary-dark mt-2 mb-2.5'>
        {/* the map here */}
      </View>

      {!btnHide && (
        <View className='flex w-full items-end justify-end'>
          <PrimaryButton
            text='Proceed'
            onPress={() => {
              setLocationData({
                lat: '',
                long: '',
              });
              handleMapPoint();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MapInputs;
