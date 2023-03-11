import { useEffect, useState } from "react";
import { Button, Empty, message, Popconfirm, Select, Spin } from "antd";
import moment from "moment";

import api from "src/components/axios";
import Card from "src/components/common/card";
import { IAmountPayableResp } from "src/constants/dashboard-interface";
import { IServiceProvider } from "src/constants/service-provider-interface";

import styles from "../styles/dashboard.module.scss";

interface IProps {
  serviceProviders: IServiceProvider[];
}

const getRandomString = () => Math.random().toString();

const DashboardPayableAmountCard = ({ serviceProviders }: IProps) => {
  const [serviceProvider, setServiceProvider] = useState(undefined);
  const [data, setData] = useState<IAmountPayableResp[]>([]);
  const [loading, setLoading] = useState(false);
  const [payingList, setPayingList] = useState<string[]>([]);
  const [refreshTS, setRefreshTS] = useState<string>(getRandomString());

  useEffect(() => {
    setLoading(true);
    api
      .get(`/bookings/action/payable-to-service-provider`, {
        params: {
          serviceProviderId: serviceProvider,
        },
      })
      .then((r) => setData(r?.data?.data || []))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [serviceProvider, refreshTS]);

  const markAsPaid = (payebleAmountObj: IAmountPayableResp) => {
    setPayingList((prev) => [...prev, payebleAmountObj.serviceProviderId]);
    api
      .post(`/bookings/action/mark-amount-paid-to-service-provider`, {
        amountPaid: payebleAmountObj.totalAmountPayable,
        bookingIds: payebleAmountObj.amountBreakup.map((el) => el.bookingId),
        serviceProviderId: payebleAmountObj.serviceProviderId,
      })
      .then((r) => {
        message.success({
          content: r.data?.data || "Marked successfully!",
          key: "mark-amount-paid",
          duration: 4,
        });
        setRefreshTS(getRandomString());
      })
      .catch(console.log)
      .finally(() =>
        setPayingList((prev) =>
          prev.filter((el) => el !== payebleAmountObj.serviceProviderId)
        )
      );
  };

  const totalPayableAmount = data.reduce(
    (acc, currentObj) => acc + (currentObj.totalAmountPayable || 0),
    0
  );

  return (
    <Card>
      <div
        className={`flex justify-space-between align-center ${styles["title-div"]}`}
      >
        <p className={styles["title"]}>
          {`Amount payable to service providers - ₹${totalPayableAmount || 0}`}
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
          <div className={styles["spinner-wrapper"]}>
            <Spin />
          </div>
        ) : (
          <div className={styles["table-wrapper"]}>
            {data?.length ? (
              <table>
                <colgroup>
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Service Provider</th>
                    <th>Toal Amount Payable</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((el) => (
                    <tr key={el.serviceProviderId}>
                      <td>
                        {el.serviceProviderName} (
                        {el.serviceProviderEmail ||
                          el.serviceProviderMobile ||
                          "--"}
                        )
                      </td>
                      <td style={{ textAlign: "right" }}>
                        ₹{el.totalAmountPayable || 0}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Popconfirm
                          placement="rightTop"
                          title="Are you sure to mark this paid?"
                          disabled={payingList.includes(el.serviceProviderId)}
                          onConfirm={() => markAsPaid(el)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="primary"
                            loading={payingList.includes(el.serviceProviderId)}
                          >
                            Mark as paid
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DashboardPayableAmountCard;
