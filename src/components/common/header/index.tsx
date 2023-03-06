import { Dropdown, MenuProps } from "antd";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { forwardRef } from "react";

import { useUserContext } from "src/constants/user-context";

import styles from "./styles/header.module.scss";

interface IProps {
  title: string;
  icon?: StaticImageData | string;
}

const Header = forwardRef<HTMLDivElement, IProps>(function Header({ title, icon }, ref) {
  const router = useRouter();
  const [userDetails] = useUserContext();
  const firstName = userDetails.firstName || "";
  const initial = (firstName[0] || "A").toUpperCase();

  const onMenuClick: MenuProps["onClick"] = (event) => {
    if (event.key === "logout") {
      localStorage.clear();
      router.push("/login");
    }
  };

  return (
    <div className={styles["wrapper"]} ref={ref}>
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
        <div>Hi, {firstName}</div>
        <Dropdown
          menu={{
            items: [{ key: "logout", label: "Logout" }],
            onClick: onMenuClick,
          }}
        >
          <div className={styles["user-pic"]}>
            <p>{initial}</p>
          </div>
        </Dropdown>
      </div>
    </div>
  );
});

export default Header;
