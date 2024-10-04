import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GlobalContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  setisLoggedIn?: (value: boolean) => void;
  isDeviceConnected?: boolean;
  setIsDeviceConnected?: (value: boolean) => void;
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

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (isMounted) {
          setisLoggedIn(!!accessToken);
        }
      } catch (error) {
        console.log(
          'Failed to retrieve access token from async storage',
          error
        );
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
      value={{ isLoggedIn, isLoading, isDeviceConnected, setIsDeviceConnected }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
