import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { menus } from "src/constants/menu";

import Logo from "public/logo.svg";

import styles from "./styles/privateLayout.module.scss";

interface IProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: IProps) => {
  const router = useRouter();
  const currentRouteEl = menus.find((el) => router.pathname.includes(el.route));

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["left-wrapper"]}>
        <div className={styles["logo-wrapper"]}>
          <Image src={Logo} alt="logo" width={40} />
          <p>Petishh</p>
        </div>
        <div>
          {menus.map((menuEl) => {
            const isRouteSelected =
              router.pathname.includes(menuEl.route) ||
              router.asPath.includes(menuEl.route);

            return (
              <Link
                href={menuEl.route}
                key={menuEl.route}
                className={`${styles["menu-item"]} ${
                  isRouteSelected ? styles["selected-menu"] : ""
                }`}
              >
                {menuEl.icon && (
                  <Image
                    src={menuEl.icon}
                    alt={menuEl.title}
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                )}
                <span>{menuEl.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles["main-content"]}>{children}</div>
    </div>
  );
};

export default PrivateLayout;
