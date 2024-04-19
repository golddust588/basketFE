import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./header.module.css";

import Logo from "../../atoms/Logo/Logo";
import {
  NavBar,
  NavBarMobile,
} from "../../molecules/NavBarHeader/NavBarHeader";
import axios from "axios";

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const fetchIsUserLoggedIn = async (headers: object) => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/users/is-user-logged-in`,

        {
          headers,
        }
      );
      console.log(response);
      // Assuming your backend returns a boolean value indicating if the user is logged in
      const loggedIn = response.data.message;
      setUserLoggedIn(loggedIn);
    } catch (error) {
      console.error("Error:", error);
      // error ? false : true;
    }
  };

  useEffect(() => {
    const savedCookie = cookie.get("jwt_token"); //reiktu padaryti, kad gauti is backendo pagal jwt token...

    if (savedCookie) {
      const headers = {
        authorization: savedCookie,
      };

      fetchIsUserLoggedIn(headers);
    }
  }, []);

  const onLogout = () => {
    cookie.remove("jwt_token");
    cookie.remove("name");
    cookie.remove("user_id");
  };

  const savedName: string | undefined = cookie.get("name");

  const greeting: string = `Sveiki, ${savedName ?? "Svečias"}!`;

  return (
    <header className={styles.wrapper}>
      <Logo />
      <div className={styles.rightNav}>
        <NavBar
          isUserLoggedIn={isUserLoggedIn}
          onLogout={onLogout}
          greeting={greeting}
        />
      </div>
      <div className={styles.rightNavMobile}>
        <NavBarMobile
          isUserLoggedIn={isUserLoggedIn}
          onLogout={onLogout}
          greeting={greeting}
        />
      </div>
    </header>
  );
};

export default Header;
