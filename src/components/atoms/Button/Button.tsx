import React from "react";
import styles from "./button.module.css";

type ButtonType = {
  text: string;
  onClick: () => void;
  type: "POST" | "DELETE";
};

const Button: React.FC<ButtonType> = ({ text, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${styles.button} 
      ${type === "POST" && styles.post_button} 
      ${type === "DELETE" && styles.delete_button}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
