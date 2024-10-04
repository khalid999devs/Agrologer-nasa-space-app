import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { images } from '@/constants';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

const VerifyOTPScreen = () => {
  const { phoneNum } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    if (otp === '') {
      toast.show('Please fill the fields!', {
        placement: 'bottom',
      });
    } else {
      console.log({ phoneNum, otp });
      router.push({
        pathname: '/(routes)/userInfo',
        params: {
          userData: JSON.stringify({}),
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 items-center  bg-body-main pt-16'
      keyboardVerticalOffset={100} // Adjust this value as necessary
    >
      <View className='mt-16'>
        <Image source={images.authLogo} className='w-40 h-40 ml-2' />
      </View>

      <View className='absolute bottom-0 px-8 py-10 w-full bg-white rounded-t-2xl shadow-lg'>
        <View className='mb-6'>
          <Text className='text-primary-main font-pSansBold text-lg text-center'>
            OTP Verification
          </Text>
          <Text className='text-secondary-main text-center'>
            Check your phone number for the OTP!
          </Text>
        </View>

        <OTPTextInput
          handleTextChange={(code) => setOtp(code)}
          inputCount={4}
          textInputStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 8,
            padding: 10,
          }}
          tintColor={'black'}
          autoFocus={false}
        />

        <View className='mt-6'>
          <PrimaryButton
            text='Verify'
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>

        <View className='mt-4 flex-row justify-center'>
          <Text className='text-secondary-main text-sm'>
            Not received yet?{' '}
          </Text>
          <TouchableOpacity>
            <Text className='text-primary-main font-pSansBold underline'>
              Resend it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTPScreen;
