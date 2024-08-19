import classes from "./HomeWeatherAndSavedCities.module.css";
import HomeSideNav from "../HomeSideNav/HomeSideNav";
import HomeBookmarkedCities from "../HomeBookmarkedCities/HomeBookmarkedCities";

const HomeWeatherAndSavedCities = () => {
  return (
    <section className={classes.container}>
      <HomeSideNav />
      <HomeBookmarkedCities />
    </section>
  );
};

export default HomeWeatherAndSavedCities;
