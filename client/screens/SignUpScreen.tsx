import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants';
import PrimaryInput from '@/components/Forms/PrimaryInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { reqs } from '@/axios/requests';

const SignUpScreen = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNum: '',
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Custom validation
    if (userData.fullName && userData.phoneNum) {
      setLoading(true);
      axios
        .post(reqs.USER_REGISTRATION, userData)
        .then((res) => {
          if (res.data.succeed) {
            console.log(res.data);
            setLoading(false);
            router.push({
              pathname: '/(routes)/VerifyOTP',
              params: {
                phoneNum: res.data.user?.phoneNum,
                mode: 'reg',
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
      toast.show('Please fill out all fields');
    }
  };

  const handleInputChange = (name: string, text: string) => {
    setUserData((userData) => ({ ...userData, [name]: text }));
  };

  return (
    <View className='flex-1 justify-center items-center relative font-pSansRegular pt-12 bg-body-main'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='w-full m-auto flex items-center justify-center mt-8'
      >
        <View>
          <Image source={images.authLogo} className='ml-1.5'></Image>
        </View>
        <View className='w-full px-8'>
          <PrimaryInput
            title='Full Name'
            placeholder=''
            classes='mb-3'
            value={userData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
          />
          <PrimaryInput
            title='Phone Number'
            placeholder=''
            value={userData.phoneNum}
            onChangeText={(text) => handleInputChange('phoneNum', text)}
          />
          <PrimaryButton
            disabled={loading}
            text='Register'
            classes='!w-full mt-8'
            onPress={handleSubmit}
          />
        </View>
        <View className='mt-8'>
          <Text className='text-secondary-main text-sm'>
            <Text
              className='font-pSansBoldItalic underline'
              onPress={() => {
                router.push('/(routes)/Login');
              }}
            >
              Log in
            </Text>{' '}
            instead
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
