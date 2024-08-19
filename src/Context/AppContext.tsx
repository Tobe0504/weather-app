import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { requestHandler, requestType } from "../HelperFunctions/requestHandler";

type AppContextProviderType = {
  children: React.ReactNode;
};

type AppContextProviderValues = {
  notifications: notificationsType;
  setNotifications: Dispatch<SetStateAction<notificationsType>>;
  getCountries: () => void;
  countries: requestType;
  bookmarks: any[];
  setBookmarks: Dispatch<SetStateAction<any[]>>;
};

export type notificationsType =
  | {
      title: string;
      severity: "success" | "error" | "mid";
      description?: string;
      id: string | number;
    }[]
  | null
  | undefined;

export const AppContext = createContext({} as AppContextProviderValues);

const AppContextProvider = ({ children }: AppContextProviderType) => {
  // States
  const [notifications, setNotifications] = useState<notificationsType>(null);
  const [countries, setCountries] = useState<requestType>({
    data: null,
    isLoading: false,
    error: null,
  });
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // Requests
  const getCountries = () => {
    requestHandler({
      method: "GET",
      url: "https://restcountries.com/v3.1/all?fields=name,capital,currencies,latlng,flags",
      state: countries,
      setState: setCountries,
    });
  };

  useEffect(() => {
    getCountries();

    const localBookmarks = JSON.parse(
      localStorage.getItem("weather-app-bookmarks") as string
    );

    setBookmarks(localBookmarks);
  }, []);

  useEffect(() => {
    if (bookmarks?.length > 0) {
      localStorage.setItem("weather-app-bookmark", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  useEffect(() => {
    if (countries?.data) {
      const counntriesCopy = countries.data?.map((data: any) => {
        return { ...data, isBoookmarked: false };
      });

      // setCountries((prevState) => {
      //   return { ...prevState, data: counntriesCopy };
      // });
    }
  }, [countries?.data]);

  return (
    <AppContext.Provider
      value={{
        notifications,
        setNotifications,
        getCountries,
        countries,
        bookmarks,
        setBookmarks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
