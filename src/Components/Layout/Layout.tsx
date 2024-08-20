import Header from "../../Containers/Header/Header";
import classes from "./Layout.module.css";

type LayoutTypes = {
  children: React.ReactNode;
  isRainy?: boolean;
};

const Layout = ({ children, isRainy = false }: LayoutTypes) => {
  return (
    <section
      className={classes.container}
      style={
        isRainy
          ? {
              backgroundImage: "url(https://i.gifer.com/7scx.gif)",
            }
          : {
              backgroundImage: "url(https://i.gifer.com/Lx0q.gif)",
            }
      }
    >
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.body}>{children}</div>
    </section>
  );
};

export default Layout;
