import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/utils/Header';
import IconBtnIcon from '@/components/Buttons/IconBtnIcon';
import { images } from '@/constants';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommunityInputSystem from '@/components/Forms/CommunityInputSystem';
import MsgBody from '@/components/Commmunity/MsgBody';
import { useGlobalContext } from '@/context/GlobalContext';
import axios from 'axios';
import { reqs } from '@/axios/requests';
import { useToast } from 'react-native-toast-notifications';

const CommunityScreen = () => {
  const toast = useToast();
  const { ws, user, accessToken }: any = useGlobalContext();
  const [page, setPage] = useState(1);
  const [rowLimit, setRowLimit] = useState(30);
  const [totalDiscussion, setTotalDiscussion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msgData, setMsgData] = useState<any[]>([]);
  const ScrollViewRef = useRef<any>(null);
  const [count, setCount] = useState(0);
  const handleScrollBottom = () => {
    if (ScrollViewRef.current) {
      ScrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (msgData.length > 0 && count < 1) {
      handleScrollBottom();
      setCount((count) => count + 1);
    }
  }, [msgData]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.type === 'community') {
          if (data.msg.owner.id === user.id) handleScrollBottom();
          setMsgData((prevMsgData: any) => [...prevMsgData, data.msg]);
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
        .post(
          reqs.GET_DISCUSSIONS,
          {
            page: page,
            limit: rowLimit,
          },
          { headers: { authorization: `bearer ${accessToken}` } }
        )
        .then((res) => {
          if (res.data.succeed) {
            setMsgData(res.data.discussions.reverse());
            setTotalDiscussion(res.data.total);
          }
        })
        .catch((err) => {
          toast.show(err.response.data.msg || 'Failed to get discussions', {
            type: 'danger',
          });
        });
    }
  }, [accessToken, page, rowLimit]);

  const handleSubmit = async (msgObj: any) => {
    setLoading(true);
    try {
      const sendObj: { [key: string]: any } = {
        text: msgObj.msg,
        replyTo: {},
        time: new Date().toISOString(),
        mentions: [],
      };
      const fd = new FormData();
      for (const key in sendObj) {
        if (key === 'replyTo') {
          fd.append('replyTo', JSON.stringify(sendObj[key]));
          continue;
        } else if (key === 'mentions') {
          fd.append('mentions', JSON.stringify(sendObj[key]));
          continue;
        } else fd.append(key, sendObj[key]);
      }
      if (msgObj.files && msgObj.files.length > 0) {
        msgObj.files.forEach((file: any) => {
          fd.append('discussion', file);
        });
      }

      const res = await axios.post(reqs.SEND_DISCUSSION, fd, {
        headers: {
          authorization: `bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (res.data.succeed) {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: 'community',
              role: 'chat',
              msg: res.data.discussion,
            })
          );
        }
      } else {
        toast.show(res.data.msg || 'Failed to send message', {
          type: 'danger',
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.msg || 'Failed to send message', {
        type: 'danger',
      });
    }
  };

  return (
    <View className='pb-12 flex-1 relative'>
      <Header />
      <View className='mt-4 px-8'>
        <IconBtnIcon
          btnImg={images.CommunityBtn}
          onBtnPress={() => {}}
          onBackPress={() => {
            router.push('/(tabs)/tools');
          }}
        />
      </View>
      <View className='px-4 py-4 flex-1 pb-10'>
        <MsgBody msgData={msgData} ScrollViewRef={ScrollViewRef} />
      </View>

      <CommunityInputSystem
        onSubmit={handleSubmit}
        loading={loading}
        handleScrollBottom={handleScrollBottom}
      />
    </View>
  );
};

export default CommunityScreen;
