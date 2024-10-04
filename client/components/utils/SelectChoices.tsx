import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
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
  inputClasses?: string;
  handleDataSubmit: (props: any) => void;
}

const commonCrops = [
  'Wheat',
  'Corn',
  'Paddy',
  'Barley',
  'Soybeans',
  'Sugarcane',
  'Cotton',
];

const SelectChoices = ({
  title,
  placeholder = 'Select your crops',
  keyboardType,
  classes,
  inputClasses,
  handleDataSubmit,
}: InputProps) => {
  const [crops, setCrops] = useState<string[]>([]);
  const [singleCrop, setSingleCrop] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddCrop = (crop: string) => {
    if (!crops.includes(crop)) {
      setCrops([...crops, crop]);
    }
    setSingleCrop(''); // Clear input
    setShowDropdown(false); // Close dropdown
  };

  const handleRemoveCrop = (crop: string) => {
    setCrops(crops.filter((item) => item !== crop));
  };

  return (
    <SafeAreaView className={'w-full flex-1 ' + classes}>
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
                setShowDropdown(true); // Show dropdown when typing
              }}
              onFocus={() => setShowDropdown(true)} // Show dropdown on focus
              className='bg-white rounded-xl px-4 py-3.5 text-lg pr-10' // Add padding for dropdown icon
              placeholderTextColor={'#999999'}
            />
            {/* Dropdown Arrow */}
            <FontAwesome
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color='#999999'
              style={{ position: 'absolute', right: 15, top: 20 }}
              onPress={() => setShowDropdown(!showDropdown)}
            />
          </View>
        </View>

        {/* Dropdown List */}
        {/* {showDropdown && (
          <View className='bg-white shadow-md rounded-xl mb-2 max-h-40'>
            <FlatList
              data={commonCrops.filter((crop) =>
                crop.toLowerCase().includes(singleCrop.toLowerCase())
              )}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='px-4 py-2 border-b border-gray-200'
                  onPress={() => handleAddCrop(item)}
                >
                  <Text className='text-lg'>{item}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 150 }}
              scrollEnabled={true} // Make the list scrollable
            />
          </View>
        )} */}

        {/* Display Selected Crops as Buttons */}

        {/* <FlatList
          data={crops}
          keyExtractor={(item) => item}
          horizontal={true}
          renderItem={({ item }) => (
            <View
              key={item}
              className='flex flex-row items-center bg-secondary-main px-3 py-2 rounded-full mr-2'
            >
              <Text className='text-body-main mr-2'>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveCrop(item)}>
                <FontAwesome
                  name='times'
                  size={14}
                  color='white'
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* Button */}
        <View className='flex w-full items-end justify-end'>
          <PrimaryButton
            text='Proceed'
            onPress={() => {
              handleDataSubmit(crops);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SelectChoices;
