import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

const CommunityInputSystem = ({ classes, onSubmit }: any) => {
  const [msg, onChangeMsg] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileInput = () => {};
  const handleSUbmit = () => {};

  return (
    <View className='absolute bottom-2 w-full px-4 flex gap-1 flex-row '>
      <TouchableOpacity
        onPress={handleFileInput}
        className='p-3 bg-onPrimary-main rounded-md'
      >
        <Image
          className='w-7 h-6'
          style={{ resizeMode: 'contain' }}
          source={icons.target}
        ></Image>
      </TouchableOpacity>
      <View className={'' + classes}>
        <TextInput
          placeholder={'Type your message...'}
          value={msg}
          onChangeText={(text) => onChangeMsg(text)}
          className='bg-body-light rounded-xl px-4 py-3.5 text-lg'
          placeholderTextColor={'#a7a4a4'}
        />
      </View>
      <TouchableOpacity
        onPress={handleSUbmit}
        className='p-3 bg-onPrimary-main rounded-md'
      >
        <Image
          className='w-7 h-6'
          style={{ resizeMode: 'contain' }}
          source={icons.to}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityInputSystem;
