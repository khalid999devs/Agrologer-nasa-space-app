import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import { FontAwesome } from '@expo/vector-icons'; // For dropdown and cross icons
import { SafeAreaView } from 'react-native-safe-area-context';

interface InputProps {
  title: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  classes?: string;
  btnDisabled?: boolean;
  inputClasses?: string;
  handleDataSubmit: (props: any) => void;
}

const commonCrops = [
  { id: 'wheat', title: 'Wheat' },
  { id: 'Corn', title: 'corn' },
  { id: 'Paddy', title: 'paddy' },
  { id: 'Barley', title: 'barley' },
  { id: 'Sugarcane', title: 'sugarcane' },
];

const SelectChoices = ({
  title,
  placeholder = 'Select your crops',
  keyboardType,
  classes,
  btnDisabled,
  inputClasses,
  handleDataSubmit,
}: InputProps) => {
  const [crops, setCrops] = useState<{ id: string; title: string }[]>([]);
  const [singleCrop, setSingleCrop] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddCrop = (crop: { id: string; title: string }) => {
    if (!crops.find((item) => item.id === crop.id)) {
      setCrops([...crops, crop]);
    }
    setSingleCrop(''); // Clear input
    setShowDropdown(false); // Close dropdown
  };

  const handleRemoveCrop = (crop: { id: string; title: string }) => {
    setCrops(crops.filter((item) => item.id !== crop.id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* Title and Input */}
      <View className={'w-full mb-2 ' + inputClasses}>
        <Text className='text-2xl text-secondary-main font-pSansBold mb-3'>
          {title}
        </Text>
        <View className='relative'>
          <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={singleCrop}
            onChangeText={(text) => {
              setSingleCrop(text);
            }}
            onFocus={() => setShowDropdown(true)} // Show dropdown on focus
            className='bg-white rounded-xl px-4 py-3.5 text-lg pr-10' // Add padding for dropdown icon
            placeholderTextColor={'#999999'}
          />
          {/* Dropdown Arrow */}
          {!(singleCrop.length > 0) ? (
            <FontAwesome
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color='#999999'
              style={{ position: 'absolute', right: 15, top: 20 }}
              onPress={() => setShowDropdown((showDropdown) => !showDropdown)}
            />
          ) : (
            <FontAwesome
              name={'check-square'}
              size={20}
              color='#999999'
              style={{ position: 'absolute', right: 15, top: 20 }}
              onPress={() => {
                setCrops((crops) => [
                  ...crops,
                  {
                    id: singleCrop.trim().toLocaleLowerCase(),
                    title: singleCrop,
                  },
                ]);
                setSingleCrop('');
              }}
            />
          )}
        </View>
      </View>

      {/* Dropdown List */}

      {showDropdown && singleCrop.length < 1 && (
        <View className='bg-white shadow-md rounded-xl mb-2 max-h-32'>
          <ScrollView nestedScrollEnabled={true} scrollEnabled={true}>
            {commonCrops.map((item) => (
              <TouchableOpacity
                key={item.id}
                className='px-4 py-2 border-b border-gray-200'
                onPress={() => handleAddCrop(item)}
              >
                <Text className='text-lg'>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Display Selected Crops as Buttons */}

      <View className='flex w-full flex-row flex-wrap'>
        {crops.map((item) => (
          <View
            key={item.id}
            className='flex flex-row items-center bg-secondary-main px-3 py-2 rounded-full mr-2'
          >
            <Text className='text-body-main mr-2'>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveCrop(item)}>
              <FontAwesome
                name='times'
                size={14}
                color='white'
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Button */}
      <View className='flex w-full items-end mt-2 justify-end'>
        <PrimaryButton
          text='Proceed'
          disabled={btnDisabled}
          onPress={() => {
            handleDataSubmit(crops);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SelectChoices;
