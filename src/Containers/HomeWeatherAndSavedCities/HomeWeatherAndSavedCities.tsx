import classes from "./HomeWeatherAndSavedCities.module.css";
import HomeSideNav from "../HomeSideNav/HomeSideNav";
import HomeBookmarkedCities from "../HomeBookmarkedCities/HomeBookmarkedCities";

type HomeWeatherAndSavedCitiesTypes = {
  showConditions?: boolean;
};

const HomeWeatherAndSavedCities = ({
  showConditions,
}: HomeWeatherAndSavedCitiesTypes) => {
  return (
    <section className={classes.container}>
      <HomeSideNav />
      <HomeBookmarkedCities showConditions={showConditions} />
    </section>
  );
};

export default HomeWeatherAndSavedCities;
