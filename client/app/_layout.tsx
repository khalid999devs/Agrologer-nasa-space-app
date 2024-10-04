import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../axios/global';
import { GlobalContextProvider } from '@/context/GlobalContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'pSans-bold': require('../assets/fonts/Product Sans Bold.ttf'),
    'pSans-boldItalic': require('../assets/fonts/Product Sans Bold Italic.ttf'),
    'pSans-regular': require('../assets/fonts/Product Sans Regular.ttf'),
    'pSans-Italic': require('../assets/fonts/Product Sans Italic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <GlobalContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
              name='(routes)/Onboarding/index'
              options={{ headerShown: false }}
            />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </GlobalContextProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
