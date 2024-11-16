import {
  View,
  Text,
  KeyboardTypeOptions,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import MapView, { Marker } from 'react-native-maps';
import GooglePlacesInput from './GooglePlacesInput';

interface InputProps {
  title: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  warning?: string;
  onChangeText?: (text: string) => void;
  showWarning?: boolean;
  classes?: string;
  inputClasses?: string;
  setLocationData: (props: any) => void;
  btnHide?: boolean;
  locationData?: any;
  coordinates: { lat: number; long: number };
}

const MapInputs = ({
  title,
  placeholder = 'Type in your address',
  warning,
  onChangeText,
  showWarning,
  classes,
  inputClasses,
  setLocationData,
  btnHide = false,
  locationData,
  coordinates,
}: InputProps) => {
  const [locDetails, setLocDetails] = useState({
    placeName: '',
    lat: null,
    long: null,
  });

  useEffect(() => {
    if (locationData.lat) {
      setLocDetails((locDetails: any) => ({
        ...locDetails,
        ...coordinates,
        placeName: locationData.placeName,
      }));
    }
  }, [locationData]);

  return (
    <View className={'w-full ' + classes}>
      <View className={'w-full mb-2 ' + inputClasses}>
        <Text className='text-2xl text-secondary-main font-pSansBold mb-3'>
          {title || ''}
        </Text>
        {/* <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={location}
          aria-disabled={disabled}
          onChangeText={(text) => setLocation(text)}
          className='bg-white rounded-xl px-4 py-2 text-sm h-12'
          placeholderTextColor={'#999999'}
        /> */}
        {locDetails.lat && (
          <View className='relative h-12'>
            <FlatList
              className='absolute z-10 w-full'
              data={[{ title: 'GooglePlacesInput', key: '1' }]}
              keyExtractor={(item: any) => item.key}
              scrollEnabled={false}
              keyboardShouldPersistTaps='handled'
              renderItem={() => (
                <GooglePlacesInput
                  placeHolder={placeholder}
                  data={locDetails}
                  setData={setLocDetails}
                />
              )}
            />
          </View>
        )}

        {showWarning && <Text>{warning || ''}</Text>}
      </View>

      <View className=' w-full h-48 rounded-xl mt-2 mb-2.5'>
        {locDetails?.lat && (
          <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            region={{
              latitude: locDetails?.lat || 37.78825,
              longitude: locDetails?.long || -122.4324,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            style={{ flex: 1 }}
            zoomControlEnabled
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: locDetails?.lat || 37.78825,
                longitude: locDetails?.long || -122.4324,
              }}
              title={locDetails.placeName || ''}
            />
          </MapView>
        )}
      </View>

      {!btnHide && (
        <View className='flex w-full items-end justify-end'>
          <PrimaryButton
            text='Proceed'
            onPress={() => {
              setLocationData(locDetails);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MapInputs;
