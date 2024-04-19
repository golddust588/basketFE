import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
import styles from "./question.module.css";
import cookie from "js-cookie";
import isAdmin from "@/utils/isAdmin";

type QuestionType = {
  _id: string;
  question_title: string;
  question_text: string;
  date: string;
  gained_likes_number: number;
  user_id: string;
  answers: [];
  userName: string;
  onDeleteQuestion?: (id: string) => void;
};

const Question: React.FC<QuestionType> = ({
  _id,
  question_title,
  question_text,
  date,
  gained_likes_number,
  answers,
  userName,
  onDeleteQuestion,
}) => {
  const onItemClicked = () => {
    const isConfirmed = window.confirm("Ar tikrai norite ištrinti temą?");

    if (isConfirmed) {
      onDeleteQuestion && onDeleteQuestion(_id);
      router.push("/forum");
    }
  };
  const router = useRouter();

  const headers = {
    authorization: cookie.get("jwt_token"),
  };

  const admin = isAdmin(headers);
  console.log(admin);

  return (
    <div className={styles.wrapper}>
      <Link href={`/question/${_id}`} className={styles.wrapper2}>
        <div className={styles.wrapper3}>
          <h4 className={styles.italicText}>{`${userName}:`}</h4>
          <h4>{date}</h4>
          <h4
            className={
              gained_likes_number < 0 ? styles.negativeLikes : styles.likes
            }
          >
            {`Patinka: ${gained_likes_number}`}
          </h4>
          <h4>{`Komentarai: ${answers.length}`}</h4>
        </div>
        <div className={styles.wrapper4}>
          <h2 id="truncatedText">{question_title}</h2>
          <p>{question_text}</p>
          {admin && (
            <Button text="Ištrinti" onClick={onItemClicked} type="DELETE" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Question;
