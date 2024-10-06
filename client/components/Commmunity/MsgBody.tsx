import { View, ScrollView } from 'react-native';
import React from 'react';
import SingleMsg from './SingleMsg';
import { useGlobalContext } from '@/context/GlobalContext';

const MsgBody = ({ msgData }: { msgData: any[] }) => {
  let { user }: any = useGlobalContext();
  user.id = 2; // Assuming user.id is set here for demonstration purposes

  return (
    <ScrollView
      className='w-full flex-1'
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 4,
      }}
    >
      <View className='w-full flex flex-col'>
        {msgData.map((item, key) => (
          <SingleMsg
            key={key}
            index={key}
            isUser={item?.owner?.id === user.id}
            data={item.data}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MsgBody;
