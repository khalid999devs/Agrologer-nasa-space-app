import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import Header from '@/components/utils/Header';
import AvatarSec from '@/components/Profile/AvatarSec';
import { icons, images } from '@/constants';
import ProfileMenu from '@/components/Profile/ProfileMenu';

const ProfileScreen = () => {
  return (
    <ScrollView className='pb-12'>
      <Header />
      <View className='px-8 mt-2'>
        <AvatarSec
          fullName='Yunus Mia'
          designation='Expert Farmer'
          image={images.placeholder}
        />
      </View>
      <View className='px-8 mt-2'>
        <ProfileMenu
          onPress={() => {}}
          icon={icons.ProfileIcon}
          title='Personal details'
        />
        <ProfileMenu
          onPress={() => {}}
          icon={icons.SettingsIcon}
          title='Settings'
        />
        <ProfileMenu
          onPress={() => {}}
          icon={icons.SheetIcon}
          title='E-Statements'
        />
        <ProfileMenu
          onPress={() => {}}
          icon={icons.CropIcon}
          title='Crop history'
        />
        <ProfileMenu
          onPress={() => {}}
          icon={icons.BookIcon}
          title='App & Device Guide'
        />
      </View>

      <Pressable onPress={() => {}} className='mt-16 w-full px-8'>
        <Image
          source={images.HelpImage}
          className={`w-[99%] rounded-2xl`}
        ></Image>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;