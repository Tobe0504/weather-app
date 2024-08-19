import Layout from "../../Components/Layout/Layout";
import HomeCityAndDegree from "../HomeCityAndDegree/HomeCityAndDegree";
import HomeWeatherAndSavedCities from "../HomeWeatherAndSavedCities/HomeWeatherAndSavedCities";

const Home = () => {
  return (
    <Layout>
      <HomeCityAndDegree />
      <HomeWeatherAndSavedCities />
    </Layout>
  );
};

export default Home;
