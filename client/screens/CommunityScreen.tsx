import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/utils/Header';
import IconBtnIcon from '@/components/Buttons/IconBtnIcon';
import { images } from '@/constants';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommunityInputSystem from '@/components/Forms/CommunityInputSystem';
import MsgBody from '@/components/Commmunity/MsgBody';

const CommunityScreen = () => {
  const [msgData, setMsgData] = useState([
    {
      owner: { id: 1 },
      data: {
        text: 'Hello, sir. How can I helop you?',
        image: null,
      },
    },
    {
      owner: { id: 2 },
      data: {
        text: 'Hi',
        image: null,
      },
    },
    {
      owner: { id: 2 },
      data: {
        text: 'I want to know, if any potential weather or pests risk in my area?',
        image: null,
      },
    },
    {
      owner: { id: 4 },
      data: {
        text: 'Ok sir, Give me a minute. Let me check!',
        image: null,
      },
    },
  ]);

  const handleSubmit = () => {};

  return (
    <View className='pb-12 flex-1 relative'>
      <Header />
      <View className='mt-4 px-8'>
        <IconBtnIcon
          btnImg={images.CommunityBtn}
          onBtnPress={() => {}}
          onBackPress={() => {
            router.push('/(tabs)/tools');
          }}
        />
      </View>
      <View className='px-4 py-4 flex-1 pb-10'>
        <MsgBody msgData={msgData} />
      </View>

      <CommunityInputSystem onSubmit={handleSubmit} />
    </View>
  );
};

export default CommunityScreen;
