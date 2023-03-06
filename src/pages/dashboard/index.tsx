import Header from "src/components/common/header";
import DashboardSalesCard from "src/components/dashboard/sales";
import DashboardOrdersCard from "src/components/dashboard/orders";
import DashboardImage from "public/dashboard.png";

const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" icon={DashboardImage} />

      <DashboardOrdersCard />
      <DashboardSalesCard />
    </>
  );
};

export default Dashboard;
