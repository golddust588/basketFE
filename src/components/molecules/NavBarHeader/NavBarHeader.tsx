import styles from "./navBarHeader.module.css";
import React from "react";
import { useState } from "react";
import Link from "next/link";

type NavBarType = {
  isUserLoggedIn: boolean;
  onLogout: () => void;
  greeting: string;
};

type NavBarMobileType = {
  isUserLoggedIn: boolean;
  onLogout: () => void;
  greeting: string;
};

const NavBar: React.FC<NavBarType> = ({
  isUserLoggedIn,
  onLogout,
  greeting,
}) => {
  return (
    <div className={styles.wrapper}>
      {isUserLoggedIn ? (
        <>
          <ul>
            <li>
              <Link href="/myQuestions">My questions</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/postQuestion">Post a new question</Link>
            </li>
          </ul>
          <ul>
            <li className={styles.name}>{greeting}</li>
          </ul>
          <ul>
            <li>
              <Link href="/login" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

const NavBarMobile: React.FC<NavBarMobileType> = ({
  isUserLoggedIn,
  onLogout,
  greeting,
}) => {
  const [isShowMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className={styles.mobileWrapper}>
      <button
        className={styles.burgerButton}
        onClick={() => {
          setShowMobileNav((prevState) => !prevState);
        }}
      >
        <svg viewBox="0 0 100 75" width="40" height="40" fill="rgb(80, 14, 94)">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </button>

      <nav
        className={`${styles.mobileNav} ${isShowMobileNav && styles.active}`}
      >
        {isUserLoggedIn ? (
          <>
            <ul>
              <li>
                <Link href="/myQuestions">My questions</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/postQuestion">Post a new question</Link>
              </li>
            </ul>
            <ul>
              <li className={styles.nameMobile}>{greeting}</li>
            </ul>
            <ul>
              <li>
                <Link href="/login" onClick={onLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export { NavBar, NavBarMobile };
