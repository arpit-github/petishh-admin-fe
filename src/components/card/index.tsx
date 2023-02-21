import styles from "./styles/card.module.scss";

interface IProps {
  children: React.ReactNode;
}

const Card = ({ children }: IProps) => {
  return <div className={styles["wrapper"]}>{children}</div>;
};

export default Card;
