import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MidleWareAuthenitcation = (Component: any) => {
  const MidleWareAuth = (props: any) => {
    const router = useRouter();
    const [isWindowAvailable, setIsWindowAvailable] = useState(false);

    useEffect(() => {
      setIsWindowAvailable(true);
    }, []);

    const isLoggedIn = !!(
      isWindowAvailable && localStorage.getItem("user-details")
    );

    if (isWindowAvailable && !isLoggedIn && router.pathname !== "/login") {
      router.replace("/login");
      return <></>;
    } else if (isWindowAvailable && isLoggedIn && router.pathname === "/login") {
      router.replace("/");
      return <></>;
    }
    return isWindowAvailable ? <Component {...props} /> : null;
  };

  return MidleWareAuth;
};

export default MidleWareAuthenitcation;
