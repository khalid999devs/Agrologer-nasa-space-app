import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/utils/Header';
import DeviceTile from '@/components/Dashboard/DeviceTile';
import PredictionTile from '@/components/utils/PredictionTile';
import AlertTile from '@/components/utils/AlertTile';
import DecisionTiles from '@/components/utils/DecisionTiles';
import { icons } from '@/constants';
import ChanceTiles from '@/components/utils/ChanceTiles';

const HomeScreen = () => {
  return (
    <View className='pb-36'>
      <View>
        <Header />
      </View>

      <ScrollView>
        <View className='px-8 w-full mt-4'>
          <PredictionTile />
          <AlertTile />
        </View>

        <DeviceTile />
        <View className='w-full px-8 flex flex-row justify-between'>
          <DecisionTiles title={'Pests'} image={icons.pestIcon} classes='' />
          <DecisionTiles
            title={'Soil Condition'}
            image={icons.soilIcon}
            data={{ level: 'high' }}
          />
        </View>

        <View className='w-full px-8 pb-20 mt-3 flex flex-row justify-between'>
          <ChanceTiles
            title={'Chances of Flood'}
            image={icons.FloodIcon}
            data={{
              level: 'normal',
              chanceText: 'No',
              desc: 'Estd. After 20 days',
            }}
          />
          <ChanceTiles
            title={'Chances of Drought'}
            image={icons.DroughtIcon}
            data={{
              level: 'medium',
              chanceText: 'Huge',
              desc: 'Irrigate the Field',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
