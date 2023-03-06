import { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import Header from "src/components/common/header";
import { IServiceProvider } from "src/constants/service-provider-interface";
import ServiceProviderImage from "public/service-provider.png";
import api from "src/components/axios";
import Card from "src/components/common/card";

const ServiceProviders = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IServiceProvider[]>([]);
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 25,
    total: 0,
  });

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/service-provider?limit=${pagination.pageSize}&page=${pagination.current}`
      )
      .then((r) => {
        setData(r.data?.data?.serviceProviders || []);
        setPagination((prev) => ({
          ...prev,
          total: r.data?.data?.totalItems || 0,
        }));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [pagination.pageSize, pagination.current]);

  const columns: ColumnsType<IServiceProvider> = [
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (val) => val || "--",
      width: 120,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      render: (val) => val || "--",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email_id",
      width: 250,
      render: (val) => val || "--",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      width: 135,
      render: (val) => val || "--",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 100,
      render: (val) => val || "--",
    },
    {
      title: "Services Provided",
      dataIndex: "service_types",
      width: 160,
      render: (val) => (val?.length ? val.join(", ") : "--"),
    },
    {
      title: "Outwards Payment",
      dataIndex: "outwardPayments",
      width: 160,
      render: (val) => (val || val === 0 ? val : "--"),
    },
    {
      title: "Avg. Rating",
      dataIndex: "avgRating",
      width: 120,
      render: (val) => (val || val === 0 ? val : "--"),
    },
    {
      title: "Total Rating",
      dataIndex: "totalRatings",
      width: 120,
      render: (val) => (val || val === 0 ? val : "--"),
    },
    {
      title: "Servicable Zipcodes",
      dataIndex: "serviceable_zip_codes",
      width: 180,
      render: (val) => (val?.length ? val.join(", ") : "--"),
    },
  ];

  const totalColWidth = columns.reduce(
    (accumulator, curValue) => accumulator + (curValue.width as number),
    0
  );

  return (
    <>
      <Header
        title="Service Providers"
        icon={ServiceProviderImage}
        ref={headerRef}
      />

      <Card>
        <div ref={wrapperRef}>
          <Table
            loading={loading}
            rowKey={(row) => row.service_provider_id}
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
              pageSizeOptions: [10, 25, 50, 100],
              showSizeChanger: true,
              showTotal: (total, range) => (
                <span>
                  Showing <b>{range[0]}</b> - <b>{range[1]}</b> of{" "}
                  <b>{total}</b> Service Providers
                </span>
              ),
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
    </>
  );
};

export default ServiceProviders;
