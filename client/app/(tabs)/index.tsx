import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-white'>
      <Text className='text-red-500 text-6xl font-semibold'>Agrologer</Text>
      <StatusBar />
    </SafeAreaView>
  );
}
