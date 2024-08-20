import BookmarkedCities from "../BookmarkedCities/BookmarkedCities";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import classes from "./HomeBookmarkedCities.module.css";

type HomeBookmarkedCitiesType = {
  showConditions?: boolean;
};

const HomeBookmarkedCities = ({
  showConditions = true,
}: HomeBookmarkedCitiesType) => {
  return (
    <section className={classes.container}>
      <BookmarkedCities />
      {showConditions && <WeatherSummary />}
    </section>
  );
};

export default HomeBookmarkedCities;
