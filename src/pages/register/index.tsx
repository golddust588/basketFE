import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import styles from "./styles.module.css";
import Button from "@/components/atoms/Button/Button";
import validation from "./validation";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onRegister = async () => {
    try {
      if (validation(email, password, name)) {
        const body = {
          email: email,
          password: password,
          name: name,
        };

        const response = await axios.post(
          `${process.env.SERVER_URL}/users/register`,
          body
        );

        console.log("response", response);

        if (response.status === 201) {
          // cookie.set("jwt_token", response.data.jwt_token);
          cookie.set("name", response.data.name);
          cookie.set("user_id", response.data.user_id);
          alert(
            "Registracija pradėta, patvirtinkite el. paštą paspaudę ant nuorodos gautame laiške!"
          );
          // Clear input fields after showing the alert
          setEmail("");
          setPassword("");
          setName("");
        }

        console.log("response", response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response.data.message === "Email already exists") {
        alert("El. paštas jau priregistruotas!");
      }

      if (error.response.data.message === "Name already exists") {
        alert("Toks vartotojo vardas jau priregistruotas!");
      }
      // alert(error.response.data.message);
    }
  };

  return (
    <div>
      <PageTemplate>
        <div className={styles.form}>
          <input
            placeholder="El. paštas"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Slaptažodis"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <input
            placeholder="Vardas (slapyvardis)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button text="Registruotis" onClick={onRegister} type="POST" />
        </div>
      </PageTemplate>
    </div>
  );
};

export default Register;
