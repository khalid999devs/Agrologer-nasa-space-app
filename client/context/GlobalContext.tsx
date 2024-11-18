import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { reqs } from '@/axios/requests';

export interface GlobalContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  setisLoggedIn?: (value: boolean) => void;
  isDeviceConnected?: boolean;
  setIsDeviceConnected?: (value: boolean) => void;
  user: any;
  setUser: any;
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  ws: WebSocket | null;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>('');
  const [user, setUser] = useState({});
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Set up WebSocket connection
  const setupWebSocket = (token: string | null, location: any) => {
    if (!token) return;

    const socket = new WebSocket(`${process.env.EXPO_PUBLIC_WS_SERVER_URI}`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      // Authenticate with server
      socket.send(
        JSON.stringify({
          type: 'auth',
          token: token,
          location: { lat: location?.lat, long: location?.long },
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'notification' && data.role === 'model') {
        // showNotification('New Notification', data.message);
        console.log(data.notification);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (e) => {
      console.log('WebSocket connection closed ', e.code, e.reason);
      if (e.code !== 1000) {
        console.error('WebSocket closed with error:', e.reason);
      }
      setTimeout(() => {
        setupWebSocket(token, location);
      }, 5000);
    };

    setWs(socket);
  };

  const getData = async (isMounted: boolean) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const res = await axios.get(reqs.GET_VALID_USER, {
        headers: { authorization: `bearer ${accessToken}` },
      });
      if (res.data.succeed) {
        setUser(res.data?.user || {});
        setAccessToken(accessToken);
        setIsDeviceConnected(res.data?.user?.dashboard?.deviceStats);
        setisLoggedIn(true);

        setupWebSocket(accessToken, res.data?.user?.fieldLoc);
      }
    } catch (error) {
      console.log('Failed to retrieve access token from async storage', error);
      setisLoggedIn(false);
    } finally {
      if (isMounted) {
        setisLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    getData(isMounted);

    return () => {
      isMounted = false;
      ws?.close();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        isDeviceConnected,
        setIsDeviceConnected,
        user,
        setUser,
        accessToken,
        setAccessToken,
        ws,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
