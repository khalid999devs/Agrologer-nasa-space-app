import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationTabs from '@/components/Notifications/NotificationTabs';
import Header from '@/components/utils/Header';
import { useGlobalContext } from '@/context/GlobalContext';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { reqs } from '@/axios/requests';

const NotificationsScreen = () => {
  const toast = useToast();
  const { accessToken, ws }: any = useGlobalContext();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.type === 'notification') {
          setNotifications((prevNotification: any) => [
            ...prevNotification,
            data.notification,
          ]);
        }
      };

      ws.onerror = (error: any) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event: any) => {
        console.log('WebSocket connection closed:', event);
      };
    }
  }, [ws]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(reqs.GET_ALERTS, {
          headers: { authorization: `bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.data.succeed) {
            setNotifications(res.data.alerts);
          }
          if (refreshing) setRefreshing(false);
        })
        .catch((err) => {
          if (refreshing) setRefreshing(false);
          toast.show(err.response.data.msg, { type: 'danger' });
        });
    }
  }, [accessToken, refreshing]);

  useEffect(() => {
    if (notifications.length > 0) {
      let updateStatus = false;
      notifications.forEach((notification: any, key: any) => {
        if (notification.read === false) {
          updateStatus = true;
        }
      });
      if (updateStatus) {
        axios
          .put(
            reqs.UPDATE_ALERTS,
            {},
            {
              headers: { authorization: `bearer ${accessToken}` },
            }
          )
          .then((res) => {
            if (res.data.succeed) {
              setNotifications(res.data.alerts);
            }
          })
          .catch((err) => {
            toast.show(err.response.data.msg, { type: 'danger' });
          });
      }
    }
  }, [notifications]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing((refreshing) => !refreshing)}
        />
      }
      className='pb-12'
    >
      <Header />
      <View className='px-8 mt-4'>
        {notifications.length > 0 ? (
          notifications.map((notification: any, key: any) => (
            <NotificationTabs
              key={key}
              title={notification.title}
              subtitle={notification.description}
            />
          ))
        ) : (
          <View className='mt-8'>
            <Text className='text-center text-base'>
              No Notifications Available right now!
            </Text>
          </View>
        )}
        {/* <NotificationTabs
          title='It may rain at 6 pm'
          subtitle='A little speedy wind too'
        />
        <NotificationTabs
          title='Spray Carbofuran'
          subtitle='0.5 - 0.6 kg/Ha within 2 days'
        /> */}
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;
