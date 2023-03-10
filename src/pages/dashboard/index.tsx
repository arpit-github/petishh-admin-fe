import { useEffect, useState } from "react";

import api from "src/components/axios";
import Header from "src/components/common/header";
import DashboardSalesCard from "src/components/dashboard/sales";
import DashboardOrdersCard from "src/components/dashboard/orders";
import DashboardReceivablePaymentsCard from "src/components/dashboard/receivable-payments";
import DashboardPayableAmountCard from "src/components/dashboard/payable-amount";
import { IServiceProvider } from "src/constants/service-provider-interface";
import { IPackage } from "src/constants/package-interface";
import DashboardImage from "public/dashboard.png";

const Dashboard = () => {
  const [services, setServices] = useState<IPackage[]>([]);
  const [serviceProviders, setServiceProviders] = useState<IServiceProvider[]>(
    []
  );

  useEffect(() => {
    api
      .get(`/service-provider`)
      .then((r) => setServiceProviders(r.data?.data?.serviceProviders || []))
      .catch(console.log);
    api
      .get(`/packages/action/list`)
      .then((r) => setServices(r.data?.data || []))
      .catch(console.log);
  }, []);

  return (
    <>
      <Header title="Dashboard" icon={DashboardImage} />

      <DashboardOrdersCard
        serviceProviders={serviceProviders}
        services={services}
      />
      <DashboardSalesCard
        serviceProviders={serviceProviders}
        services={services}
      />
      <DashboardReceivablePaymentsCard
        serviceProviders={serviceProviders}
        services={services}
      />
      <DashboardPayableAmountCard serviceProviders={serviceProviders} />
    </>
  );
};

export default Dashboard;
