import styles from "./navBar.module.css";
import React from "react";
import Link from "next/link";

type NavBarType = {
  onClickedAllQuestions: () => void;
  onClickedAnswered: () => void;
  onClickedMostLiked: () => void;
};

const NavBar: React.FC<NavBarType> = ({
  onClickedAllQuestions,
  onClickedAnswered,
  onClickedMostLiked,
}) => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <Link href="/forum" onClick={onClickedAllQuestions}>
            Visos temos
          </Link>
        </li>
        <li>
          <a className={styles.borders} onClick={onClickedAnswered}>
            Temos su komentarais
          </a>
        </li>
        <li>
          <a onClick={onClickedMostLiked}>Populiariausios</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
