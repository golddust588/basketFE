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
          <Link href="/" onClick={onClickedAllQuestions}>
            All questions
          </Link>
        </li>
        <li>
          <a className={styles.borders} onClick={onClickedAnswered}>
            Answered
          </a>
        </li>
        <li>
          <a onClick={onClickedMostLiked}>Most popular</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
