import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_GMAP_API_KEY;

interface GooglePlacesInputProps {
  placeHolder?: string;
  setData: (data: any) => void;
  data: { placeName?: string; lat?: number | null; long?: number | null };
}

const GooglePlacesInput = ({
  placeHolder,
  setData,
  data,
}: GooglePlacesInputProps) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.placeName && data.placeName !== inputText) {
        setInputText(data.placeName);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [data.placeName]);

  if (!apiKey) {
    console.warn('Google Places Autocomplete is disabled!');
    return (
      <View>
        <Text>Google Places Autocomplete is disabled!</Text>
      </View>
    );
  }

  return (
    <GooglePlacesAutocomplete
      placeholder={placeHolder || 'Search'}
      fetchDetails={true}
      keyboardShouldPersistTaps='handled'
      debounce={200}
      textInputProps={{
        value: inputText,
        onChange: (e) => setInputText(e.nativeEvent.text),
      }}
      onPress={(data, details) => {
        setInputText(data.description);
        setData({
          placeName: data.description,
          lat: details?.geometry.location.lat,
          long: details?.geometry.location.lng,
        });
      }}
      query={{
        key: apiKey,
        language: 'en',
      }}
      styles={{
        textInput: styles.textInput,
        textInputContainer: styles.textInputContainer,
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    height: 48,
    color: '#000',
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default GooglePlacesInput;
