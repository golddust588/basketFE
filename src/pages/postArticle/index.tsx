import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "@/components/atoms/Button/Button";
import validation from "./validation";

const ArticleForm = () => {
  const router = useRouter();

  const [file, setFile] = useState();
  const [caption, setCaption] = useState<string>("");
  const [article_title, setArticleTitle] = useState<string>("");
  const [question_id, setQuestionId] = useState<string>("");
  // const [question_text, setQuestionText] = useState<string>("");

  const insertArticle = async () => {
    if (validation(article_title)) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);
      formData.append("article_title", article_title);
      formData.append("question_id", question_id);

      console.log("formdata", formData);

      const headers = {
        authorization: cookie.get("jwt_token"),
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await axios.post(
          `${process.env.SERVER_URL}/article`,
          formData,
          {
            headers,
          }
        );
        console.log("response", response);

        if (response.status === 201) {
          setArticleTitle("");
          setCaption("");
          setQuestionId("");
          // setQuestionText("");
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
            placeholder="Temos pavadinimas:"
            value={article_title}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          <input
            placeholder="Temos id:"
            value={question_id}
            onChange={(e) => setQuestionId(e.target.value)}
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Foto pavadinimas:"
          ></input>
          {/* <textarea
            className={styles.questionTextarea}
            placeholder="Tekstas:"
            value={question_text}
            onChange={(e) => setQuestionText(e.target.value)}
          /> */}
          <Button text="Įkelti" onClick={insertArticle} type="POST" />
        </div>
      </PageTemplate>
    </div>
  );
};

export default ArticleForm;
