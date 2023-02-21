import { useEffect, useState } from "react";

import Header from "src/components/header";
import PrivateLayout from "src/components/privateLayout";
import { ICustomer } from "src/constants/customer-interface";
import CustomerImage from "public/customer.png";
import api from "src/components/axios";
import { Table } from "antd";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ICustomer[]>([]);
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 25,
    total: 0,
  });

  useEffect(() => {
    (function () {
      setLoading(true);
      api
        .get(
          `/customer?limit=${pagination.pageSize}&page=${pagination.current}`
        )
        .then((r) => {
          setData(r.data?.data?.customers || []);
          setPagination((prev) => ({
            ...prev,
            total: r.data?.data?.totalItems || 0,
          }));
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    })();
  }, [pagination]);

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      render: (val: string) => val || "--",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (val: string) => val || "--",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (val: string) => val || "--",
    },
    {
      title: "Email",
      dataIndex: "email_id",
      render: (val: string) => val || "--",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      render: (val: string | number) => val || "--",
    },
  ];

  return (
    <PrivateLayout>
      <Header title="Customers" icon={CustomerImage} />

      <Table loading={loading} dataSource={data} columns={columns} />
    </PrivateLayout>
  );
};

export default Customers;
