import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { useRouter } from "next/router";

import "src/styles/globals.css";
import "src/styles/variables.css";
import "src/styles/antd.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [themeColors, setThemeColors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const colorPrimary = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary-color");
      setThemeColors({ colorPrimary });
      const token = localStorage["user-access-token"];
      if (token && router.pathname === "/login") {
        router.replace("/dashboard");
      } else if (!token && router.pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Petishh</title>
        <meta name="description" content="Petishh Admin Panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider theme={{ token: themeColors }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
