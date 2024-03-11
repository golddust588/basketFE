import React from "react";
import styles from "./likeButton.module.css";

type ButtonType = {
  onClick?: () => void;
  type: "UP" | "DOWN" | "SMALL-UP" | "SMALL-DOWN";
};

const LikeButton: React.FC<ButtonType> = ({ onClick, type }) => {
  return (
    <img
      src="https://metro.co.uk/wp-content/uploads/2014/12/downvote.png"
      onClick={onClick}
      className={`
      ${styles.button} 
      ${type === "UP" && styles.up_button} 
      ${type === "DOWN" && styles.down_button}
      ${type === "SMALL-UP" && styles.small_up}
      ${type === "SMALL-DOWN" && styles.small_down}
      `}
    ></img>
  );
};

export default LikeButton;
