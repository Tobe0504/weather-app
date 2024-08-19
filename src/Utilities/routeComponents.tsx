import Home from "../Containers/Home/Home";
import { routes } from "./routes";

export const routeComponents = [
  {
    title: "Weather",
    route: routes.WEATHER,
    component: <Home />,
    isSideNavRoute: true,
  },
  {
    title: "Bookmarks",
    route: routes.BOOKMARKS,
    component: <Home />,
    isSideNavRoute: true,
  },
];
