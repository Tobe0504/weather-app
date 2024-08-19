import Header from "../../Containers/Header/Header";
import classes from "./Layout.module.css";

type LayoutTypes = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutTypes) => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.body}>{children}</div>
    </section>
  );
};

export default Layout;
