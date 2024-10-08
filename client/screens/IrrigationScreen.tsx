import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/utils/Header';
import IconBtnIcon from '@/components/Buttons/IconBtnIcon';
import { router } from 'expo-router';
import { images } from '@/constants';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import InfoCard from '@/components/Irrigation/InfoCard';
import { useGlobalContext } from '@/context/GlobalContext';

const IrrigationScreen = () => {
  const [serviceData, setServiceData] = useState<object[]>([
    { userId: 2 },
    { userId: 1 },
  ]);
  const { user }: any = useGlobalContext();

  return (
    <View className='pb-6 flex-1 relative'>
      <Header />
      <View className='mt-4 px-8'>
        <IconBtnIcon
          btnImg={images.IrrigationBtn}
          onBtnPress={() => {}}
          onBackPress={() => {
            router.push('/(tabs)/tools');
          }}
        />
      </View>
      <View className='mt-8 px-8 flex-1'>
        <Text className='font-pSansBold text-xl text-secondary-main'>
          Services near you
        </Text>
        <View className='flex-1 mt-5 mb-8'>
          <ScrollView className=''>
            {serviceData.map((item: any, key: any) => (
              <InfoCard
                data={item}
                isUser={item?.userId === user.id}
                key={key}
              />
            ))}
          </ScrollView>
        </View>
        <View className='w-full'>
          <PrimaryButton text='Join As Service Provider' onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default IrrigationScreen;
