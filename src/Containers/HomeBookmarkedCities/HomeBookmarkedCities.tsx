import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import BookmarkedCities from "../BookmarkedCities/BookmarkedCities";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import classes from "./HomeBookmarkedCities.module.css";

const HomeBookmarkedCities = () => {
  // COntext
  const { bookmarks } = useContext(AppContext);

  return (
    <section className={classes.container}>
      {bookmarks?.length > 0 && <BookmarkedCities />}
      <WeatherSummary />
    </section>
  );
};

export default HomeBookmarkedCities;
