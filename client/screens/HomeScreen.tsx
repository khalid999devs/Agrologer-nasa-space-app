import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/utils/Header';
import DeviceTile from '@/components/Dashboard/DeviceTile';
import PredictionTile from '@/components/utils/PredictionTile';
import AlertTile from '@/components/utils/AlertTile';
import DecisionTiles from '@/components/utils/DecisionTiles';
import { icons } from '@/constants';
import ChanceTiles from '@/components/utils/ChanceTiles';
import { useGlobalContext } from '@/context/GlobalContext';
import axios from 'axios';
import { reqs } from '@/axios/requests';

const HomeScreen = () => {
  const { user, accessToken }: any = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboard, setDashboard] = useState<any>({});

  useEffect(() => {
    if (accessToken && user.dashboard.id) {
      axios
        .get(`${reqs.GET_DASHBOARD}/${user.dashboard.id}`, {
          headers: { authorization: `bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.data.succeed) {
            setDashboard(res.data.dashboard);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, accessToken]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (accessToken && user.dashboard.id) {
      axios
        .put(
          reqs.UPDATE_DASHBOARD,
          { dashboardId: user.dashboard.id },
          {
            headers: { authorization: `bearer ${accessToken}` },
          }
        )
        .then((res) => {
          if (res.data.succeed) {
            setDashboard(res.data.dashboard);
          }
          setRefreshing(false);
        })
        .catch((err) => {
          console.log(err);
          setRefreshing(false);
        });
    }
  };

  return (
    <View className='pb-36'>
      <View>
        <Header />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className='px-8 w-full mt-4'>
          <PredictionTile />
          <AlertTile />
        </View>

        <DeviceTile />
        <View className='w-full px-8 flex flex-row justify-between'>
          <DecisionTiles
            data={{ level: dashboard?.pestCondition?.level || 'normal' }}
            title={'Pests'}
            image={icons.pestIcon}
          />
          <DecisionTiles
            title={'Soil Condition'}
            image={icons.soilIcon}
            data={{ level: dashboard?.soilCondition?.level || 'normal' }}
          />
        </View>

        <View className='w-full px-8 pb-20 mt-3 flex flex-row justify-between'>
          <ChanceTiles
            title={'Chances of Flood'}
            image={icons.FloodIcon}
            data={
              dashboard.floodChance?.level || {
                level: 'normal',
                chanceText: 'No',
                desc: 'Estd. After 20 days',
              }
            }
          />
          <ChanceTiles
            title={'Chances of Drought'}
            image={icons.DroughtIcon}
            data={
              dashboard.droughtChance?.level || {
                level: 'medium',
                chanceText: 'Huge',
                desc: 'Irrigate the Field',
              }
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
