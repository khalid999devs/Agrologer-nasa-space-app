import { View, Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '@/components/utils/Header';
import ToolTabs from '@/components/utils/ToolTabs';
import { icons } from '@/constants';
import { router } from 'expo-router';

const ToolsScreen = () => {
  return (
    <ScrollView className='pb-12'>
      <Header />

      <View className='flex flex-row mt-6 px-8 flex-wrap w-full ml-1.5'>
        <ToolTabs
          onPress={() => {
            router.push('/(routes)/device');
          }}
          title='Agrolyzer'
          icon={icons.TesterIcon}
        />
        <ToolTabs onPress={() => {}} title='Agribot' icon={icons.AgribotIcon} />
        <ToolTabs
          onPress={() => {}}
          title='Irrigation'
          icon={icons.IrrigationIcon}
        />
        <ToolTabs
          onPress={() => {
            router.push('/(routes)/community');
          }}
          title='Community'
          icon={icons.CommunityIcon}
        />
        <ToolTabs onPress={() => {}} title='Help' icon={icons.HelpIcon} />
      </View>
    </ScrollView>
  );
};

export default ToolsScreen;
