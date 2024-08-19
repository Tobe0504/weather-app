import { CSSProperties } from "react";
import classes from "./Card.module.css";

type CardType = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardType) => {
  return (
    <section className={`${classes.container} ${className}`}>
      {children}
    </section>
  );
};

export default Card;
