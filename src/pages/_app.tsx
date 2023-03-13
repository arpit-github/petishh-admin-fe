import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import MidleWareAuthenitcation from "./_auth";

import PrivateLayout from "src/components/common/privateLayout";
import AuthLayout from "src/components/common/authLayout";
import { UserProvider } from "src/constants/user-context";
import "src/styles/globals.css";
import "src/styles/variables.css";
import "src/styles/antd.css";

function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [themeColors, setThemeColors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const computedStyle = getComputedStyle(document.documentElement);
      const colorPrimary = computedStyle.getPropertyValue("--primary-color");
      setThemeColors({ colorPrimary });

      const userDetailsString = localStorage.getItem("user-details");
      setIsLoggedIn(!!userDetailsString);
      try {
        if (userDetailsString) {
          const tempObj = JSON.parse(userDetailsString);
          setUserDetails(tempObj);
        }
      } catch (e) {}
    }
  }, []);

  const LayoutComponent = isLoggedIn ? PrivateLayout : AuthLayout;

  return (
    <>
      <Head>
        <title>Petishh - Admin</title>
        <meta name="description" content="Petishh Admin Panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider theme={{ token: themeColors }}>
        <UserProvider value={{ userDetails, setUserDetails }}>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </UserProvider>
      </ConfigProvider>
    </>
  );
}

export default MidleWareAuthenitcation(App);
