import React from "react";
import Link from "next/link";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        <Link href="/" className={styles.logo}>
          MY FORUM
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
