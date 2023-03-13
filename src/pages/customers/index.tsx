import { useEffect, useRef, useState } from "react";
import { Divider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import Header from "src/components/common/header";
import { ICustomer, ICustomerBooking } from "src/constants/customer-interface";
import CustomerImage from "public/customer.png";
import api from "src/components/axios";
import Card from "src/components/common/card";

import styles from "./styles/customers.module.scss";

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
    setLoading(true);
    api
      .get(`/customer?limit=${pagination.pageSize}&page=${pagination.current}`)
      .then((r) => {
        setData(r.data?.data?.customers || []);
        setPagination((prev) => ({
          ...prev,
          total: r.data?.data?.totalItems || 0,
        }));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
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
      title: "Booking Details",
      dataIndex: "bookings",
      width: 350,
      render: (val: []) =>
        val?.length > 0 ? (
          <>
            {val.map((el: ICustomerBooking, index: number) => (
              <div key={el.bookingId}>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>
                    Package taken:
                  </div>
                  <div>{el.packageName || "--"}</div>
                </div>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>
                    Service:
                  </div>
                  <div>{el.serviceType || "--"}</div>
                </div>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>Price:</div>
                  <div>
                    {el.totalPayable || el.totalPayable === 0
                      ? `₹ ${el.totalPayable}`
                      : "--"}
                  </div>
                </div>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>
                    Service Provider:
                  </div>
                  <div style={{ wordBreak: "break-all" }}>
                    {el.serviceProviderName || "--"}{" "}
                    {el.serviceProviderEmail
                      ? `(${el.serviceProviderEmail})`
                      : ""}
                  </div>
                </div>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>
                    Appointment Time:
                  </div>
                  <div>
                    {el.slotDate || "--"} {el.slotTime || ""}
                  </div>
                </div>
                <div className={styles["booking-detail-item"]}>
                  <div className={styles["booking-details-title"]}>
                    Customer Address:
                  </div>
                  <div style={{ wordBreak: "break-word" }}>
                    {el.customerAddress?.address_line_1 || ""},{" "}
                    {el.customerAddress?.address_line_2 || ""},{" "}
                    {el.customerAddress?.city || ""},{" "}
                    {el.customerAddress?.state || ""},{" "}
                    {el.customerAddress?.zip_code || ""},{" "}
                    {el.customerAddress?.country || ""}
                  </div>
                </div>
                {index < val.length - 1 && (
                  <Divider style={{ margin: "10px 0" }} />
                )}
              </div>
            ))}
          </>
        ) : (
          "--"
        ),
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
    <>
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
              y: `calc(100vh - 148px - ${headerRef.current?.clientHeight}px)`,
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
                  <b>{total}</b> Customers
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

export default Customers;
