import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';
import * as SplashScreen from 'expo-splash-screen';

const Index = () => {
  const { isLoggedIn, isLoading }: any = useGlobalContext();

  useEffect(() => {
    const hideSplash = async () => {
      if (!isLoading) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Redirect
      href={!isLoggedIn ? '/(routes)/Onboarding' : '/(routes)/userInfo'}
    />
  );
};

export default Index;
