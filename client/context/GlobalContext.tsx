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

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setAccessToken(accessToken);
        // if (isMounted) {
        //   setisLoggedIn(!!accessToken);
        // }
        const res = await axios.get(reqs.GET_VALID_USER, {
          headers: { authorization: `bearer ${accessToken}` },
        });
        if (res.data.succeed) {
          setUser(res.data?.user || {});

          setIsDeviceConnected(res.data?.user?.dashboard?.deviceStats);
          setisLoggedIn(true);
        }
      } catch (error) {
        console.log(
          'Failed to retrieve access token from async storage',
          error
        );
        setisLoggedIn(false);
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
