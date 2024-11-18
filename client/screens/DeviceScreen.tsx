import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/utils/Header';
import IconTextBtn from '@/components/Buttons/IconTextBtn';
import { useGlobalContext } from '@/context/GlobalContext';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { router } from 'expo-router';
import { images } from '@/constants';
import { useToast } from 'react-native-toast-notifications';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import axios from 'axios';
import { reqs } from '@/axios/requests';

const DeviceScreen = () => {
  const toast = useToast();
  const { isDeviceConnected, setIsDeviceConnected, accessToken }: any =
    useGlobalContext();
  let { demo }: any = useLocalSearchParams();
  demo = demo ? JSON.parse(demo) : false;

  const [isTestRunning, setIsTestRunning] = useState(false);
  const [connectionData, setIsConnectionData] = useState({});
  const [todos, setTodos] = useState({});
  const [sensorData, setIsSensorData] = useState({});
  const [testState, setTestState] = useState<
    'normal' | 'Running' | 'serverSending' | 'done'
  >('normal');
  const [loading, setLoading] = useState(false);

  const updateAndGetDeviceData = (isUpdate: boolean) => {
    if (!demo) {
      setLoading(true);
      axios
        .get(`${reqs.GET_AGROLYZER}/${isDeviceConnected}/${isUpdate}`, {
          headers: { authorization: `bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.data.succeed) {
            if (res.data.connected !== isDeviceConnected)
              setIsDeviceConnected(res.data.connected);

            setIsConnectionData(res.data.agrolyzer?.connectionData);
            setIsSensorData(res.data.agrolyzer?.sensorData);
            setTodos(res.data.agrolyzer?.todos);
          } else {
            toast.show(res.data.msg);
            demo = true;
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.show(
            err.response.data.message ||
              'Something went wrong! Please try again.'
          );
        });
    }
  };
  useEffect(() => {
    updateAndGetDeviceData(false);
  }, [isDeviceConnected, accessToken]);

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
          onPress={() => {
            if (!demo) updateAndGetDeviceData(true);
            else
              toast.show('This feature is not available in demo mode!', {
                duration: 2000,
              });
          }}
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
          // disabled={isTestRunning}
          onPress={() => {
            if (!demo) {
              if (isDeviceConnected) {
                setIsTestRunning((isTestRunning) => !isTestRunning);
              } else {
                toast.show('Connect the device first!', { duration: 2000 });
              }
            } else {
              toast.show('This feature is not available in demo mode!', {
                duration: 2000,
              });
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DeviceScreen;
