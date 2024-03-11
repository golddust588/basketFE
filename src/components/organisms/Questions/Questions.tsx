import React from "react";
import { useState } from "react";
import styles from "./questions.module.css";
import Question from "../../molecules/Question/Question";

type QuestionsType = {
  questions: Array<any> | null;
  onDeleteQuestion?: (id: string) => void;
};

const Questions: React.FC<QuestionsType> = ({
  questions,
  onDeleteQuestion,
}) => {
  return (
    <div className={styles.wrapper}>
      {questions &&
        questions.map((question) => {
          return (
            <div key={question._id}>
              <Question
                _id={question._id}
                question_title={question.question_title}
                question_text={question.question_text}
                date={question.date}
                gained_likes_number={question.gained_likes_number}
                user_id={question.user_id}
                answers={question.answers}
                onDeleteQuestion={onDeleteQuestion}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Questions;
