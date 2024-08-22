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
  getCountryWeather: (lat: string, long: string) => void;
  countryWeather: requestType;
  isFarenheit: boolean;
  setIsFarenheit: Dispatch<SetStateAction<boolean>>;
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
  const [countryWeather, setCountryWeather] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isFarenheit, setIsFarenheit] = useState(false);

  // Requests
  const getCountries = () => {
    requestHandler({
      method: "GET",
      url: "https://restcountries.com/v3.1/all?fields=name,capital,currencies,latlng,flags",
      state: countries,
      setState: setCountries,
    });
  };

  const getCountryWeather = (lat: string, long: string) => {
    requestHandler({
      method: "GET",
      url: `${process.env.REACT_APP_WEATHER_API_BASE_URL}/current.json?q=${lat},${long}&key=${process.env.REACT_APP_WEATHER_API_KEY}`,
      state: countryWeather,
      setState: setCountryWeather,
    });
  };

  useEffect(() => {
    getCountries();

    const localBookmarks = JSON.parse(
      localStorage.getItem("weather-app-bookmark") as string
    );

    setBookmarks(localBookmarks || []);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bookmarks?.length > 0) {
      localStorage.setItem("weather-app-bookmark", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  useEffect(() => {
    if (countries?.data) {
      const countriesCopy = countries.data.map((data: any) => ({
        ...data,
        isBookmarked: false,
      }));

      const hasChanged =
        JSON.stringify(countriesCopy) !== JSON.stringify(countries.data);

      if (hasChanged) {
        setCountries((prevState) => ({
          ...prevState,
          data: countriesCopy,
        }));
      }
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
        getCountryWeather,
        countryWeather,
        isFarenheit,
        setIsFarenheit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
