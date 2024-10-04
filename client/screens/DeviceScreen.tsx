import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/utils/Header';
import IconTextBtn from '@/components/Buttons/IconTextBtn';
import { useGlobalContext } from '@/context/GlobalContext';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { images } from '@/constants';
import { useToast } from 'react-native-toast-notifications';

const DeviceScreen = () => {
  const toast = useToast();
  const { isDeviceConnected, setIsDeviceConnected }: any = useGlobalContext();
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [connectionData, setIsConnectionData] = useState({});
  const [todos, setTodos] = useState({});
  const [sensorData, setIsSensorData] = useState({});
  const [testState, setTestState] = useState<
    'normal' | 'Running' | 'serverSending' | 'done'
  >('normal');

  useEffect(() => {
    // connect with esp 32 and auto pair using serial bluetooth
    //update connection data
    //get realtime data from esp32 using bluetooth
    //get data in jsonFormat
    //update test state accordingly
    //update sensor data
    //send to server
  }, [isTestRunning]);

  return (
    <ScrollView>
      <Header />
      <View className='px-8 my-6'>
        <IconTextBtn
          onPress={() => {
            router.push('/(tabs)/home');
          }}
        />
      </View>
      <View className='px-8 mt-3 mb-8'>
        <PrimaryButton
          text={isDeviceConnected ? 'Connected' : 'Disconnected'}
          classes={`!py-6 ${!isDeviceConnected && '!bg-red-700'}`}
          onPress={() =>
            setIsDeviceConnected(
              (isDeviceConnected: boolean) => !isDeviceConnected
            )
          }
        />
      </View>
      <View className='my-10 px-8 w-full flex items-center justify-center'>
        <Image
          source={
            isDeviceConnected ? images.connectedLogo : images.disconnectedLogo
          }
        ></Image>
      </View>
      <View className='px-8 mt-3 mb-8'>
        <PrimaryButton
          text={isTestRunning ? 'Running...' : 'Run a test'}
          classes={`!bg-tertiary-brown ${!isDeviceConnected ? 'opacity-60' : 'opacity-100'}`}
          onPress={() => {
            if (isDeviceConnected) {
              setIsTestRunning((isTestRunning) => !isTestRunning);
            } else {
              toast.show('Connect the device first!', { duration: 2000 });
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DeviceScreen;
