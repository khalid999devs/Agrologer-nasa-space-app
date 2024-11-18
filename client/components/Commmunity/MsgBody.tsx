import { View, ScrollView } from 'react-native';
import React from 'react';
import SingleMsg from './SingleMsg';
import { useGlobalContext } from '@/context/GlobalContext';

const MsgBody = ({
  msgData,
  ScrollViewRef,
}: {
  msgData: any[];
  ScrollViewRef: any;
}) => {
  const { user }: any = useGlobalContext();

  return (
    <ScrollView
      className='w-full flex-1'
      ref={ScrollViewRef}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 4,
      }}
    >
      <View className='w-full flex flex-col px-2'>
        {msgData.map((item, key) => (
          <SingleMsg
            key={key}
            index={key}
            isUser={item?.owner?.id == user.id}
            data={item}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MsgBody;
