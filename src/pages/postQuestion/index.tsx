import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "@/components/atoms/Button/Button";
import validation from "./validation";

const QuestionForm = () => {
  const router = useRouter();

  const [question_title, setQuestionTitle] = useState<string>("");
  const [question_text, setQuestionText] = useState<string>("");

  const insertQuestion = async () => {
    if (validation(question_title, question_text)) {
      const body = {
        question_title: question_title,
        question_text: question_text,
      };

      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      try {
        console.log(body);
        const response = await axios.post(
          `${process.env.SERVER_URL}/question`,
          body,
          {
            headers,
          }
        );

        if (response.status === 201) {
          setQuestionTitle("");
          setQuestionText("");
          router.push("/");
        }
        console.log("response", response);
      } catch (error) {
        console.error("Error:", error);
        alert("Please enter");
      }
    }
  };

  return (
    <div>
      <PageTemplate>
        <div className={styles.form}>
          <input
            placeholder="Question title:"
            value={question_title}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <textarea
            className={styles.questionTextarea}
            placeholder="Question text:"
            value={question_text}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button text="Post" onClick={insertQuestion} type="POST" />
        </div>
      </PageTemplate>
    </div>
  );
};

export default QuestionForm;
