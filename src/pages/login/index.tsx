import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";

import LogoIcon from "public/logo.svg";
import api from "src/components/axios";
import styles from "./styles/login.module.scss";

interface ILoginFormValues {
  email_id: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = (values: ILoginFormValues) => {
    setSubmitting(true);
    api
      .get("/staff-login/action/login?", { params: values })
      .then((resp) => {
        if (resp.data.status === "SUCCESS") {
          message.success({
            content: "User successfully loggedIn!",
            key: "login",
            duration: 4,
          });
          localStorage.setItem("user-details", JSON.stringify(resp.data.data));
          router.replace("/");
        } else {
          message.error({
            content: resp.data?.status || "Login failed!",
            key: "login",
            duration: 4,
          });
        }
      })
      .catch(console.log)
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["logo-wrapper"]}>
        <Image alt="logo" src={LogoIcon} width={50} height={50} />
        <p>Petishh</p>
      </div>

      <div className={styles["inner-wrapper"]}>
        <h1 className={styles["title"]}>Login Form</h1>
        <div className={styles["container"]}>
          <div className={styles["form-container"]}>
            <h1 className={styles["title"]}>Please login to continue</h1>
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              disabled={submitting}
              onFinish={handleLogin}
              autoComplete="off"
              requiredMark={false}
              labelCol={{ span: 24 }}
              validateTrigger={["onBlur", "onChange"]}
            >
              <Form.Item
                label="Email"
                name="email_id"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please input valid email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input type="password" />
              </Form.Item>

              <Button
                loading={submitting}
                type="primary"
                htmlType="submit"
                className={styles["form-submit-btn"]}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
