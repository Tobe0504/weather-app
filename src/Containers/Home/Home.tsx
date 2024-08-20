import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader";
import { AppContext } from "../../Context/AppContext";
import HomeCityAndDegree from "../HomeCityAndDegree/HomeCityAndDegree";
import HomeWeatherAndSavedCities from "../HomeWeatherAndSavedCities/HomeWeatherAndSavedCities";
import NoSelectedCountry from "../NoSelectedCountry/NoSelectedCountry";

const Home = () => {
  // context
  const { getCountryWeather, countries, countryWeather } =
    useContext(AppContext);

  // Router
  const [searchParams] = useSearchParams();
  const selectedCountry = searchParams.get("selectedCountry");
  const [selectedCountryObject, setSelectedCountryObject] = useState(null);
  const [isRainy, setIsRainy] = useState(false);

  // Effects
  useEffect(() => {
    if (countries?.data && selectedCountry) {
      setSelectedCountryObject(
        countries?.data?.find((data: any) => {
          return (
            data?.name?.common?.toLowerCase() ===
            selectedCountry?.replaceAll("-", " ").toLowerCase()
          );
        })
      );
    }

    // eslint-disable-next-line
  }, [selectedCountry, countries?.data]);

  useEffect(() => {
    if (selectedCountryObject) {
      setTimeout(() => {
        getCountryWeather(
          String((selectedCountryObject as any)?.latlng[0]),
          String((selectedCountryObject as any)?.latlng[1])
        );
      }, 1000);
    }

    // eslint-disable-next-line
  }, [selectedCountryObject]);

  useEffect(() => {
    if (countryWeather.data) {
      if (
        countryWeather?.data?.current?.humidity > 80 &&
        countryWeather?.data?.current?.temp_c -
          countryWeather?.data?.current?.dewpoint_c <
          3
      ) {
        setIsRainy(true);
      } else {
        setIsRainy(false);
      }
    }
  }, [countryWeather.data]);

  if (countryWeather.isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout isRainy={isRainy}>
      {selectedCountry ? (
        <>
          <HomeCityAndDegree />
          <HomeWeatherAndSavedCities />
        </>
      ) : (
        <>
          <NoSelectedCountry />
          <HomeWeatherAndSavedCities showConditions={false} />
        </>
      )}
    </Layout>
  );
};

export default Home;
