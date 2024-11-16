import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import MapInputs from '@/components/Forms/MapInputs';
import SelectChoices from '@/components/utils/SelectChoices';
import * as Location from 'expo-location';
import { getPlaceName } from '@/scripts/gMaps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reqs } from '@/axios/requests';
import { useGlobalContext } from '@/context/GlobalContext';

const UserInfoScreen = () => {
  const toast = useToast();
  const { user, setUser }: any = useGlobalContext();
  let { userData }: any = useLocalSearchParams();
  userData = userData ? JSON.parse(userData) : {};

  const [locationData, setLocationData] = useState<any>({
    farmerLoc: { done: false },
    fieldLoc: { done: false },
    crops: [],
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMsg) toast.show(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let newLoc = await Location.getCurrentPositionAsync({});

      const placeName = await getPlaceName(
        newLoc.coords.latitude,
        newLoc.coords.longitude
      );

      setLocationData((locationData: any) => ({
        ...locationData,
        farmerLoc: {
          lat: newLoc.coords.latitude,
          long: newLoc.coords.longitude,
          placeName,
          done: false,
        },
        fieldLoc: {
          lat: newLoc.coords.latitude,
          long: newLoc.coords.longitude,
          placeName,
          done: false,
        },
      }));
    })();
  }, []);

  const handleDataSubmit = async (cropData: any) => {
    const data = { ...locationData, crops: cropData };
    setLoading(true);
    const accessToken = await AsyncStorage.getItem('accessToken');
    axios
      .put(reqs.UPDATE_USER, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.succeed) {
          return axios.put(
            reqs.UPDATE_SETTINGS,
            {
              updateData: {
                location: {
                  farmerLoc: data.farmerLoc,
                  fieldLoc: data.fieldLoc,
                },
              },
              settingsId: user?.setting?.id,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
        } else {
          toast.show('Something is wrong while updating user!');
        }
      })
      .then((res) => {
        setLoading(false);
        if (res?.data.succeed) {
          setUser((user: any) => ({
            ...user,
            ...data,
            setting: {
              ...user.setting,
              location: { farmerLoc: data.farmerLoc, fieldLoc: data.fieldLoc },
            },
          }));
          toast.show("Successfully updated user's data!");
        }
        router.push('/(tabs)/home');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.show(
          err.response?.data.msg || 'Something is wrong while updating user!'
        );
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className='flex-1 pt-10 px-8'
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps={'handled'}
      >
        <View className='mb-4'>
          <MapInputs
            title={`Let's set your address`}
            setLocationData={(obj: any) => {
              setLocationData((locationData: any) => {
                return {
                  ...locationData,
                  farmerLoc: { ...locationData.farmerLoc, ...obj, done: true },
                };
              });
            }}
            btnHide={locationData.farmerLoc.done}
            coordinates={{
              lat: locationData.farmerLoc.lat,
              long: locationData.farmerLoc.long,
            }}
            locationData={locationData.farmerLoc}
          />
        </View>
        {locationData.farmerLoc.done && (
          <View className='mb-4'>
            <MapInputs
              title={`Specify your field location`}
              setLocationData={(obj: any) => {
                setLocationData((locationData: any) => ({
                  ...locationData,
                  fieldLoc: { ...locationData.fieldLoc, ...obj, done: true },
                }));
              }}
              coordinates={{
                lat: locationData.fieldLoc.lat,
                long: locationData.fieldLoc.long,
              }}
              btnHide={locationData.fieldLoc.done}
              locationData={locationData.fieldLoc}
            />
          </View>
        )}
        {locationData.fieldLoc.done && (
          <SelectChoices
            title='Select your crops'
            placeholder='List the crops you have'
            handleDataSubmit={handleDataSubmit}
            btnDisabled={loading}
          />
        )}
        <View className='py-12'></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserInfoScreen;
