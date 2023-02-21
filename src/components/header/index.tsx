import Image, { StaticImageData } from "next/image";

import Avatar from "public/avatar.png";

import styles from "./styles/header.module.scss";

interface IProps {
  title: string;
  icon?: StaticImageData | string;
}

const Header = ({ title, icon }: IProps) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["left-wrapper"]}>
        {icon && (
          <Image
            alt=""
            src={icon}
            width={20}
            height={20}
            style={{ objectFit: "contain" }}
          />
        )}
        <div className={styles["title"]}>{title}</div>
      </div>

      <div className={styles["right-wrapper"]}>
        <div>Hi, User</div>
        <Image
          alt="user"
          src={Avatar}
          width={25}
          height={25}
          className={styles["user-pic"]}
        />
      </div>
    </div>
  );
};

export default Header;
