import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // Import from expo-linear-gradient
import { images } from '@/constants';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { router } from 'expo-router';

const OnboardingScreen = () => {
  return (
    <LinearGradient
      colors={['#119965', '#119160', '#137E52', '#156943']} // Define your gradient colors
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }} // Style for full-screen layout
    >
      <Image
        source={images.screenLogo}
        className='ml-7 -translate-y-16 scale-90'
      ></Image>

      <View className='absolute bottom-20'>
        <SecondaryButton
          text='Log in'
          onPress={() => {
            router.push('/(routes)/Login');
          }}
          classes='!w-[155px] mb-3'
        />
        <SecondaryButton
          text='Sign Up'
          onPress={() => {
            router.push('/(routes)/SignUp');
          }}
          classes='!w-[155px]'
        />
      </View>
    </LinearGradient>
  );
};

export default OnboardingScreen;
