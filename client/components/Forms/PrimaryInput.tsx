import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

interface InputProps {
  title: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  warning?: string;
  onChangeText?: (text: string) => void;
  showWarning?: boolean;
  emailFormatWarning?: string;
  disabled?: boolean;
  classes?: string;
}

export default function PrimaryInput({
  title,
  placeholder,
  keyboardType,
  value,
  warning,
  onChangeText,
  showWarning,
  emailFormatWarning,
  disabled,
  classes,
}: InputProps) {
  return (
    <View className={'w-full ' + classes}>
      <Text className='text-md text-primary-light mb-2'>{title}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        aria-disabled={disabled}
        onChangeText={onChangeText}
        className='bg-body-light rounded-xl px-4 py-3.5 text-lg'
        placeholderTextColor={'#a7a4a4'}
      />
      {showWarning && <Text>{warning}</Text>}
    </View>
  );
}
