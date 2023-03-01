import { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import Header from "src/components/header";
import PrivateLayout from "src/components/privateLayout";
import { ICustomer } from "src/constants/customer-interface";
import CustomerImage from "public/customer.png";
import api from "src/components/axios";
import Card from "src/components/card";

const Customers = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
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
  }, [pagination.pageSize, pagination.current]);

  const columns: ColumnsType<ICustomer> = [
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      render: (val: string) => val || "--",
      width: 150,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (val: string) => val || "--",
      width: 120,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (val: string) => val || "--",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email_id",
      width: 250,
      render: (val: string) => val || "--",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      width: 135,
      render: (val: string | number) => val || "--",
    },
    {
      title: "Referral Code",
      dataIndex: "referral_code",
      width: 125,
      render: (val: string) => val || "--",
    },
    {
      title: "Created On",
      dataIndex: "created_at_str",
      width: 230,
      render: (val: string) => val || "--",
    },
    {
      title: "Total Pets",
      dataIndex: "pets",
      width: 130,
      render: (val: any[]) => val?.length || 0,
    },
  ];

  const totalColWidth = columns.reduce(
    (accumulator, curValue) => accumulator + (curValue.width as number),
    0
  );

  return (
    <PrivateLayout>
      <Header title="Customers" icon={CustomerImage} ref={headerRef} />

      <Card>
        <div ref={wrapperRef}>
          <Table
            loading={loading}
            rowKey={(row) => row.customer_id}
            dataSource={data}
            columns={columns}
            scroll={{
              x:
                (wrapperRef.current?.clientWidth || 0) > totalColWidth
                  ? wrapperRef.current?.clientWidth
                  : totalColWidth,
              y: `calc(100vh - 190px - ${headerRef?.current?.clientHeight}px)`,
            }}
            pagination={{
              current: pagination.current + 1,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange(page, pageSize) {
                setPagination((prev) => ({
                  ...prev,
                  current: page - 1,
                  pageSize: pageSize,
                }));
              },
            }}
          />
        </div>
      </Card>
    </PrivateLayout>
  );
};

export default Customers;
