import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import PrimaryInput from '@/components/Forms/PrimaryInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { reqs } from '@/axios/requests';

const verifiedNums = process.env.EXPO_PUBLIC_PERMITTED_CONTACTS;

const LoginScreen = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Custom validation
    if (phoneNum) {
      setLoading(true);
      let sendData = {
        phoneNum,
        byPassOTP: false,
      };
      if (phoneNum?.length > 0) {
        if (!verifiedNums?.split(',').includes(phoneNum as string)) {
          sendData.byPassOTP = true;
        }
      }
      axios
        .post(reqs.USER_LOGIN, sendData)
        .then((res) => {
          if (res.data.succeed) {
            setLoading(false);
            router.push({
              pathname: '/(routes)/VerifyOTP',
              params: {
                phoneNum: phoneNum,
                mode: res.data.mode,
              },
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.show(
            err.response?.data.msg || 'Something is wrong! Please try again.'
          );
          console.log(err);
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
            disabled={loading}
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
