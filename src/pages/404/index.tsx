import { useEffect, useState } from "react";
import AuthLayout from "src/components/authLayout";
import PrivateLayout from "src/components/privateLayout";

const NotFound = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(
      !!(typeof window !== "undefined" && localStorage.getItem("user-details"))
    );
  }, []);

  const Component = isLoggedIn ? PrivateLayout : AuthLayout;

  return <Component>Not Found</Component>;
};

export default NotFound;
