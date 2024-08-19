import { Link } from "react-router-dom";
import BookMarkIcon from "../../Assets/SvgComponents/BookMarkIcon";
import WeatherIcon from "../../Assets/SvgComponents/WeatherIcon";
import Card from "../../Components/Card/Card";
import { routeComponents } from "../../Utilities/routeComponents";
import classes from "./HomeSideNav.module.css";

const iconHandler = (name: string) => {
  if (name === "Weather") {
    return <WeatherIcon />;
  } else if (name === "Bookmarks") {
    return <BookMarkIcon />;
  }
};

const HomeSideNav = () => {
  // Utils
  const sideNavRoutes = routeComponents?.filter(
    (routes) => routes.isSideNavRoute
  );

  return (
    <Card className={classes.container}>
      {sideNavRoutes.map((routes) => {
        return (
          <Link className={classes.sidenavRoute} to={routes.route}>
            {iconHandler(routes.title)}
            <p>{routes.title}</p>
          </Link>
        );
      })}
    </Card>
  );
};

export default HomeSideNav;
