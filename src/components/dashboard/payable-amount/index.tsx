import { useEffect, useState } from "react";
import { Col, Empty, Row, Select, Spin } from "antd";
import moment from "moment";

import api from "src/components/axios";
import Card from "src/components/common/card";
import { IDashboardData } from "src/constants/dashboard-interface";
import { IServiceProvider } from "src/constants/service-provider-interface";

import styles from "../styles/dashboard.module.scss";

interface IProps {
  serviceProviders: IServiceProvider[];
}

const DashboardPayableAmountCard = ({ serviceProviders }: IProps) => {
  const [serviceProvider, setServiceProvider] = useState(undefined);
  const [data, setData] = useState<IDashboardData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/bookings/action/payable-to-service-provider`, {
        params: {
          service_provider_id: serviceProvider,
        },
      })
      .then((r) => setData(r?.data?.data || {}))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [serviceProvider]);

  const dataExists =
    (data?.dayWiseData && Object.keys(data.dayWiseData || {}).length > 0) ||
    (data?.monthWiseData && Object.keys(data.monthWiseData || {}).length > 0);

  return (
    <Card>
      <div
        className={`flex justify-space-between align-center ${styles["title-div"]}`}
      >
        <p className={styles["title"]}>
          {`Amount payable to service providers - ₹${
            data?.accumulatedValue || 0
          }`}
        </p>
        <div className={styles["filter-wrapper"]}>
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="Service Providers"
            value={serviceProvider}
            className={styles["select-filter"]}
            onChange={setServiceProvider}
            options={serviceProviders.map((el) => ({
              label: `${el.first_name || ""} ${el.last_name || ""}`,
              value: el.service_provider_id,
            }))}
          />
        </div>
      </div>

      <div>
        {loading ? (
          <Spin />
        ) : (
          <>
            {dataExists ? (
              <Row>
                {Object.keys(data.dayWiseData || {}).map((el) => (
                  <Col
                    key={el}
                    xs={24}
                    sm={12}
                    className={`flex align-center ${styles["data-el"]}`}
                  >
                    <p className={styles["data-el-label"]}>
                      {moment(el, "YYYYMMDD").format("Do MMM YYYY")} -
                    </p>
                    <p>₹{data.dayWiseData[el] || 0}</p>
                  </Col>
                ))}

                {Object.keys(data.monthWiseData || {}).map((el) => (
                  <Col
                    key={el}
                    xs={24}
                    sm={12}
                    className={`flex align-center ${styles["data-el"]}`}
                  >
                    <p className={styles["data-el-label"]}>
                      {moment(el, "YYYYMM").format("MMM YYYY")} -
                    </p>
                    <p>₹{data.monthWiseData[el] || 0}</p>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default DashboardPayableAmountCard;
