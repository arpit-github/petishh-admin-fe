import Header from "src/components/header";
import PrivateLayout from "src/components/privateLayout";

import DashboardImage from "public/dashboard.png";


const Dashboard = () => {
  return (
    <PrivateLayout>
      <Header title="Dashboard" icon={DashboardImage} />
    </PrivateLayout>
  );
};

export default Dashboard;
