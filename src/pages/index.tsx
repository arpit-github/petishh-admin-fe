import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!(
      typeof window !== "undefined" && localStorage.getItem("user-access-token")
    );

    router.replace(isLoggedIn ? "/dashboard" : "/login");
  }, [router]);

  return <div style={{ padding: "2rem" }}>Redirecting...</div>;
};

export default Home;
