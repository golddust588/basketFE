import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../public/logo.png";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <Image className={styles.image} alt="Logo image" src={logoImg} />
      </Link>
    </div>
  );
};

export default Logo;
