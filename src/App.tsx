import { Navigate, Route, Routes } from "react-router-dom";
import { routeComponents } from "./Utilities/routeComponents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/weather" />} />
      {routeComponents.map((route) => {
        return (
          <Route
            path={route.route}
            element={route.component}
            key={route.title}
          />
        );
      })}
    </Routes>
  );
}

export default App;
