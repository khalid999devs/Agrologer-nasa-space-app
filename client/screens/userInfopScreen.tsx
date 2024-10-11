import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import MapInputs from '@/components/Forms/MapInputs';
import SelectChoices from '@/components/utils/SelectChoices';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const UserInfoScreen = () => {
  const toast = useToast();
  let { userData }: any = useLocalSearchParams();
  userData = userData ? JSON.parse(userData) : {};
  const [locationData, setLocationData] = useState({
    farmerLoc: {},
    fieldLoc: {},
    crops: [],
  });

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let newLoc = await Location.getCurrentPositionAsync({});
  //     setLocation(newLoc);
  //     setLocationData((locationData) => ({
  //       ...locationData,
  //       farmerLoc: {
  //         lat: newLoc.coords.latitude,
  //         long: newLoc.coords.longitude,
  //       },
  //     }));
  //   })();
  // }, []);

  console.log(location);

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
          locationData={locationData}
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
            locationData={locationData}
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
