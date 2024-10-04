import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import MapInputs from '@/components/Forms/MapInputs';
import SelectChoices from '@/components/utils/SelectChoices';

const UserInfoScreen = () => {
  const toast = useToast();
  let { userData }: any = useLocalSearchParams();
  userData = userData ? JSON.parse(userData) : {};
  const [locationData, setLocationData] = useState({
    farmerLoc: {},
    fieldLoc: {},
    crops: [],
  });

  const handleDataSubmit = (cropData: any) => {
    const data = { ...locationData, crops: cropData };
    console.log(data);
  };

  return (
    <ScrollView className='flex-1 pt-16 px-8'>
      <View className='mb-4'>
        <MapInputs
          title={`Let's set your address`}
          setLocationData={(obj: any) => {
            setLocationData((locationData) => ({
              ...locationData,
              farmerLoc: obj,
            }));
          }}
          btnHide={Object.keys(locationData.farmerLoc).length > 0}
        />
      </View>
      {Object.keys(locationData.farmerLoc).length > 0 && (
        <View className='mb-4'>
          <MapInputs
            title={`Specify your field location`}
            setLocationData={(obj: any) => {
              setLocationData((locationData) => ({
                ...locationData,
                fieldLoc: obj,
              }));
              router.push('/(tabs)/home');
            }}
            btnHide={Object.keys(locationData.fieldLoc).length > 0}
          />
        </View>
      )}
      {/* {Object.keys(locationData.fieldLoc).length > 0 && (
        <SelectChoices
          title='Select your crops'
          placeholder='List the crops you have'
          handleDataSubmit={handleDataSubmit}
        />
      )} */}
    </ScrollView>
  );
};

export default UserInfoScreen;
