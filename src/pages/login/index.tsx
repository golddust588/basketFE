import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "@/components/atoms/Button/Button";
import validation from "./validation";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    if (validation(email, password)) {
      const body = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          `${process.env.SERVER_URL}/users/login`,
          body
        );

        if (response.status === 200) {
          cookie.set("jwt_token", response.data.jwt_token);
          cookie.set("name", response.data.name);
          cookie.set("user_id", response.data.user_id);
          router.push("/");
        }
        console.log("response", response);
      } catch (error) {
        console.error("Error:", error);
        alert("Please enter correct email or password");
      }
    }
  };

  return (
    <div>
      <PageTemplate>
        <div className={styles.form}>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button text="Login" onClick={onLogin} type="POST" />
          <Link className={styles.link} href="/register">
            New user? Click here to register!
          </Link>
        </div>
      </PageTemplate>
    </div>
  );
};

export default Login;
