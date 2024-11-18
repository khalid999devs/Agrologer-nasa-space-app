import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { images } from '@/constants';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { reqs } from '@/axios/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '@/context/GlobalContext';
import Modal from '@/components/utils/Modal';

const verifiedNums = process.env.EXPO_PUBLIC_PERMITTED_CONTACTS;

const VerifyOTPScreen = () => {
  const { phoneNum, mode } = useLocalSearchParams();
  const { setUser, setTriggerUpdate }: any = useGlobalContext();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [byPassOTP, setByPassOTP] = useState(false);

  useEffect(() => {
    if (phoneNum?.length > 0) {
      if (!verifiedNums?.split(',').includes(phoneNum as string)) {
        setByPassOTP(true);
      }
    }
  }, [phoneNum]);

  const handleSubmit = () => {
    if (otp === '' && !byPassOTP) {
      toast.show('Please fill the fields!', {
        placement: 'bottom',
      });
    } else {
      setLoading(true);
      axios
        .post(reqs.VERIFY_USER_OTP, {
          phoneNum,
          otp,
          mode,
          byPassOTP: byPassOTP,
        })
        .then(async (res) => {
          setLoading(false);
          setByPassOTP(false);
          if (res.data.succeed) {
            await AsyncStorage.setItem('accessToken', res.data.accessToken);
            if (res.data.result) {
              setUser(res.data.result);
              setTriggerUpdate((prev: boolean) => !prev);
            }
            router.push({
              pathname: mode === 'reg' ? '/(routes)/userInfo' : '/(tabs)/home',
              params: {
                userData: JSON.stringify(res.data.result),
              },
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          setByPassOTP(false);
          toast.show(
            err.response?.data.msg || 'Something is wrong! Please try again.'
          );
          console.log(err);
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

        {/* modal */}
        <Modal isOpen={byPassOTP} onClose={() => {}}>
          <Pressable
            onPress={() => {}}
            className='bg-onPrimary-main rounded-2xl p-4'
          >
            <View className='mb-2'>
              <Text className='text-xl font-pSansBold'>
                Twilio free version notice!
              </Text>
            </View>
            <View>
              <Text className='text-md opacity-70'>
                Hi, this prototype app is using Twilio for OTP verification. It
                is running on free mode. It need verified phone numbers to
                verify it in free mode. You can bypass the OTP verification by
                clicking the button below.
              </Text>
            </View>
            <View className='mt-5'>
              <PrimaryButton
                classes='mb-3'
                text='Bypass OTP Verification'
                onPress={handleSubmit}
                disabled={loading}
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTPScreen;
