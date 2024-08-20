import classes from "./NoSelectedCountry.module.css";

const NoSelectedCountry = () => {
  return (
    <section className={classes.container}>
      Please select a location to view weather updates
    </section>
  );
};

export default NoSelectedCountry;
