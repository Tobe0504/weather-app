import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import BookmarkedCities from "../BookmarkedCities/BookmarkedCities";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import classes from "./HomeBookmarkedCities.module.css";

const HomeBookmarkedCities = () => {
  return (
    <section className={classes.container}>
      <BookmarkedCities />
      <WeatherSummary />
    </section>
  );
};

export default HomeBookmarkedCities;
