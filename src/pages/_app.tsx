import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";

import "src/styles/globals.css";
import "src/styles/variables.css";

export default function App({ Component, pageProps }: AppProps) {
  const [themeColors, setThemeColors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const colorPrimary = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary-color");
      setThemeColors({ colorPrimary });
    }
  }, []);

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
