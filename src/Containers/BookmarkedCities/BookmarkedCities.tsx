import { useContext } from "react";
import BookMarkIcon from "../../Assets/SvgComponents/BookMarkIcon";
import Card from "../../Components/Card/Card";
import { AppContext } from "../../Context/AppContext";
import classes from "./BookmarkedCities.module.css";

const BookmarkedCities = () => {
  // COntext
  const { bookmarks } = useContext(AppContext);
  return (
    <Card className={classes.container}>
      <div className={classes.header}>
        <BookMarkIcon width="30" height="30" />
        <h4>Bookmarked locations</h4>
      </div>

      <div className={classes.bookmarks}>
        {bookmarks?.map((data) => {
          return (
            <div className={classes.bookmark}>
              <img src={data?.flags?.png} alt={data?.flags?.alt} />
              <span>{data?.name?.common}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BookmarkedCities;
