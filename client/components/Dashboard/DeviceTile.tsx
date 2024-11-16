import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { images } from '@/constants';
import { router } from 'expo-router';
import axios from 'axios';
import { reqs } from '@/axios/requests';
import { useToast } from 'react-native-toast-notifications';
import Modal from '../utils/Modal';
import PrimaryButton from '../Buttons/PrimaryButton';

const DeviceTile = ({}) => {
  const toast = useToast();
  const { isDeviceConnected, setIsDeviceConnected, accessToken, user }: any =
    useGlobalContext();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState({});

  const handleDeviceConnection = () => {
    axios
      .get(`${reqs.GET_AGROLYZER}/${isDeviceConnected}/${true}`, {
        headers: { authorization: `bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.succeed) {
          if (res.data.connected !== isDeviceConnected)
            setIsDeviceConnected(res.data.connected);
          toast.show(res.data.msg || 'Device updated successfully!');
          setDeviceData(res.data.agrolyzer);
        } else {
          setModal(true);
        }
      })
      .catch((err) => {
        toast.show(
          err.response.data.message || 'Something went wrong! Please try again.'
        );
      });
  };

  const handleDeviceRequest = () => {
    setLoading(true);
    axios
      .post(
        reqs.SEND_DEVICE_REQUEST,
        {
          fullName: user.fullName,
          phoneNum: user.phoneNum,
        },
        { headers: { authorization: `bearer ${accessToken}` } }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.succeed) {
          toast.show(res.data.msg || 'Device request sent successfully!');
          setModal(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);

        setLoading(false);
        toast.show(
          err.response.data.msg || 'Something went wrong! Please try again.'
        );
      });
  };

  return (
    <View className='w-full my-2 px-6'>
      <View className='relative'>
        <Pressable
          onPress={() => {
            if (isDeviceConnected)
              router.push({
                pathname: '/(routes)/device',
                params: { demo: false } as any,
              });
          }}
          disabled={!isDeviceConnected}
        >
          <Image
            source={isDeviceConnected ? images.deviceOn : images.deviceOff}
            style={{ resizeMode: 'contain' }}
            className='w-full'
          ></Image>
        </Pressable>

        <TouchableOpacity
          className='absolute right-2 top-4'
          onPress={handleDeviceConnection}
        >
          <Image
            source={isDeviceConnected ? images.onSwitch : images.offSwitch}
            style={{ resizeMode: 'contain' }}
            className='w-11 h-11'
          ></Image>
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal
        isOpen={modal}
        onClose={() => {
          if (!loading) setModal(false);
        }}
      >
        <Pressable
          onPress={() => {}}
          className='bg-onPrimary-main rounded-2xl p-4'
        >
          <View className='mb-2'>
            <Text className='text-xl font-pSansBold'>
              Agrolyzer not registered yet!
            </Text>
          </View>
          <View>
            <Text className='text-md opacity-70'>
              Hi {user.fullName}, you did not register any Agrolyzer yet. You
              can send a device request or see a demo version of the service!
            </Text>
          </View>
          <View className='mt-5'>
            <PrimaryButton
              classes='mb-3'
              text='Request a Device'
              onPress={handleDeviceRequest}
              disabled={loading}
            />
            <PrimaryButton
              text='See live Demo'
              onPress={() => {
                setModal(false);
                router.push({
                  pathname: '/(routes)/device',
                  params: { demo: true } as any,
                });
              }}
              disabled={loading}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DeviceTile;
