import styles from "./footer.module.css";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear().toString();
  return (
    <footer className={styles.footer}>
      <span>Lankomumas</span>
      <Link href={"/taisykles"}>Taisykles</Link>
      <span>©Krepsinio forumas {currentYear}</span>
    </footer>
  );
};

export default Footer;
