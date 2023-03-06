import { useEffect, useState } from "react";
import { Col, Empty, Row, Select, Spin } from "antd";
import moment from "moment";

import {
  dashboardDurationOptions,
  generateDashboardDateParamsString,
} from "src/constants/dashboard";
import api from "src/components/axios";
import Card from "src/components/common/card";
import { IDashboardData } from "src/constants/dashboard-interface";

import styles from "../styles/dashboard.module.scss";

const DashboardOrdersCard = () => {
  const [duration, setDuration] = useState(dashboardDurationOptions[0].value);
  const [serviceProvider, setServiceProvider] = useState(undefined);
  const [services, setServices] = useState(undefined);
  const [data, setData] = useState<IDashboardData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dashboardParam = generateDashboardDateParamsString(duration);

    setLoading(true);
    api
      .get(`/statistical?${dashboardParam}`, {
        params: {
          statistical_type: "TOTAL_ORDERS",
        },
      })
      .then((r) => setData(r?.data?.data || {}))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [duration, serviceProvider, services]);

  const dataExists =
    (data?.dayWiseData && Object.keys(data.dayWiseData || {}).length > 0) ||
    (data?.monthWiseData && Object.keys(data.monthWiseData || {}).length > 0);

  return (
    <Card>
      <div
        className={`flex justify-space-between align-center ${styles["title-div"]}`}
      >
        <p className={styles["title"]}>
          {`Total Orders - ${data?.accumulatedValue || 0}`}
        </p>
        <div>
          <Select
            value={duration}
            style={{ width: 120, marginRight: 10 }}
            onChange={setDuration}
            options={dashboardDurationOptions}
          />
          <Select
            placeholder="Service Providers"
            value={serviceProvider}
            style={{ width: 120, marginRight: 10 }}
            onChange={setServiceProvider}
            options={[]}
          />
          <Select
            placeholder="Services"
            value={services}
            style={{ width: 120 }}
            onChange={setServices}
            options={[]}
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
                    <p>{data.dayWiseData[el] || 0}</p>
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
                    <p>{data.monthWiseData[el] || 0}</p>
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

export default DashboardOrdersCard;
