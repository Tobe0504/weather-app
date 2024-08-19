import RainIcon from "../../Assets/SvgComponents/RainIcon";
import SunIcon from "../../Assets/SvgComponents/SunIcon";
import TemperatureIcon from "../../Assets/SvgComponents/TemperatureIcon";
import WindIcon from "../../Assets/SvgComponents/WindIcon";
import Card from "../../Components/Card/Card";
import classes from "./WeatherSummary.module.css";

const WeatherSummary = () => {
  return (
    <Card className={classes.container}>
      <h4>Air Conditions</h4>

      <div className={classes.infoSection}>
        <div className={classes.info}>
          <TemperatureIcon />
          <div>
            <span>Real Feel</span>
            <span>30°</span>
          </div>
        </div>

        <div className={classes.info}>
          <WindIcon />
          <div>
            <span>Wind</span>
            <span>0.8 km/hr</span>
          </div>
        </div>

        <div className={classes.info}>
          <RainIcon />
          <div>
            <span>Chance of rain</span>
            <span>2%</span>
          </div>
        </div>

        <div className={classes.info}>
          <SunIcon />
          <div>
            <span>UV Index</span>
            <span>4</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherSummary;
