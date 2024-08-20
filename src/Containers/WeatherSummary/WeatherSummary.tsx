import { useContext } from "react";
import RainIcon from "../../Assets/SvgComponents/RainIcon";
import SunIcon from "../../Assets/SvgComponents/SunIcon";
import TemperatureIcon from "../../Assets/SvgComponents/TemperatureIcon";
import WindIcon from "../../Assets/SvgComponents/WindIcon";
import Card from "../../Components/Card/Card";
import { AppContext } from "../../Context/AppContext";
import classes from "./WeatherSummary.module.css";

const WeatherSummary = () => {
  // Context
  const { countryWeather, isFarenheit } = useContext(AppContext);
  return (
    <Card className={classes.container}>
      <h4>Air Conditions</h4>

      <div className={classes.infoSection}>
        <div className={classes.info}>
          <TemperatureIcon />
          <div>
            <span>Real Feel</span>

            <span>
              {isFarenheit
                ? `${countryWeather?.data?.current?.feelslike_f}°F`
                : `${countryWeather?.data?.current?.feelslike_c}°C`}
            </span>
          </div>
        </div>

        <div className={classes.info}>
          <WindIcon />
          <div>
            <span>Wind</span>
            <span>{countryWeather?.data?.current?.wind_kph} km/hr</span>
          </div>
        </div>

        <div className={classes.info}>
          <RainIcon />
          <div>
            <span>Chance of rain</span>
            <span>{countryWeather?.data?.current?.humidity}%</span>
          </div>
        </div>

        <div className={classes.info}>
          <SunIcon />

          <div>
            <span>UV Index</span>
            <span>{countryWeather?.data?.current?.uv}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherSummary;
