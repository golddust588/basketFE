import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./header.module.css";

import Logo from "../../atoms/Logo/Logo";
import {
  NavBar,
  NavBarMobile,
} from "../../molecules/NavBarHeader/NavBarHeader";

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const savedCookie = cookie.get("jwt_token"); //reiktu padaryti, kad gauti is backendo pagal jwt token...

    if (savedCookie) {
      setUserLoggedIn(true);
    }
  }, []);

  const onLogout = () => {
    cookie.remove("jwt_token");
    cookie.remove("name");
    cookie.remove("user_id");
  };

  const savedName: string | undefined = cookie.get("name");

  const greeting: string = `Hello, ${savedName ?? "Guest"}!`;

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
