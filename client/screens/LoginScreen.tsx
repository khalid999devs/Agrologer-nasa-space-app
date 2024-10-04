import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import PrimaryInput from '@/components/Forms/PrimaryInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

const LoginScreen = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    // Custom validation
    if (phoneNum) {
      console.log('phone:', phoneNum);
      router.push({
        pathname: '/(routes)/VerifyOTP',
        params: {
          phoneNum: phoneNum,
        },
      });
    } else {
      toast.show('Please provide your phone number!');
    }
  };

  return (
    <View className='flex-1 justify-center items-center relative font-pSansRegular bg-body-main'>
      <View className='w-full m-auto flex items-center justify-center -translate-y-16'>
        <View>
          <Image source={images.authLogo} className='ml-1.5'></Image>
        </View>
        <View className='w-full px-8'>
          <PrimaryInput
            title='Phone Number'
            placeholder='+8801XXXXXXXXX'
            value={phoneNum}
            onChangeText={(text) => setPhoneNum(text)}
          />
          <PrimaryButton
            text='Send OTP'
            classes='!w-full mt-4'
            onPress={handleSubmit}
          />
        </View>
      </View>

      <View className='absolute bottom-12'>
        <Text className='text-secondary-main text-sm'>
          No Account?{' '}
          <Text
            className='font-pSansBoldItalic underline'
            onPress={() => {
              router.push('/(routes)/SignUp');
            }}
          >
            Sign Up
          </Text>{' '}
          to join
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
