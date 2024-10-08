import { View, Text, Image, Pressable, Linking } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useToast } from 'react-native-toast-notifications';

interface InfoTypes {
  isUser: boolean;
  data: any;
  onPress?: () => void;
}

const InfoCard = ({ isUser, data, onPress }: InfoTypes) => {
  const toast = useToast();
  const makePhoneCall = (phoneNumber: string) => {
    let phoneURL = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneURL)
      .then((supported) => {
        if (!supported) {
          toast.show('Phone call is not supported on this device');
        } else {
          return Linking.openURL(phoneURL);
        }
      })
      .catch((err) => console.error('Error opening phone call:', err));
  };

  return (
    <Pressable
      className='bg-white rounded-xl w-full p-3 py-4 pr-1 mb-2'
      onPress={() => {
        isUser && onPress && onPress();
      }}
    >
      <View className='flex items-center w-full gap-3 flex-row justify-between'>
        <View>
          <Image
            className='w-12 rounded-full h-12'
            style={{ resizeMode: 'center' }}
            source={data?.img ? { uri: data.img } : images.placeholder}
          ></Image>
        </View>
        <View className=''>
          <Text className='text-lg font-pSansBold'>
            {data?.name || 'Example Person'}
          </Text>
          <View className='flex flex-row gap-2'>
            <Text
              className={`${data?.active ? 'text-primary-main' : 'text-onPrimary-light'} text-sm  font-pSansBold`}
            >
              {data?.active ? 'Active' : 'unavailable'}
            </Text>
            <View className='w-0.5 bg-primary-main'></View>
            <View className=''>
              <Text className='text-md mb-1'>
                {data?.distance || '1/2 km'} away
              </Text>
              <Text className='text-onPrimary-light text-xs'>
                vill, upazilla
              </Text>
            </View>
          </View>
        </View>
        <View className=''>
          <Text className='bg-slate-200 rounded-lg text-center p-2 text-sm'>
            {data?.price || '$20/h'}
          </Text>
          <View className='flex flex-row mt-2'>
            {/* <PrimaryButton
              text='book'
              classes='!py-2 !mr-2 !px-2'
              onPress={() => {}}
            /> */}
            <PrimaryButton
              text='Call'
              textClasses='!text-sm'
              classes='!py-1 !px-4 !rounded-md'
              onPress={() => makePhoneCall(data?.phoneNum || '+8801771470882')}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default InfoCard;
