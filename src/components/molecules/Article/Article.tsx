import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
import styles from "./article.module.css";

type ArticleType = {
  _id: string;
  article_title: string;
  article_text?: string;
  imageName: string;
  imageUrl: string;
  caption: string;
  date: string;
  question_id: string;
  comments: number;
  gained_likes_number: number;
  user_id: string;
  onDeleteArticle?: (id: string) => void;
};

const Article: React.FC<ArticleType> = ({
  _id,
  article_title,
  imageName,
  imageUrl,
  caption,
  date,
  question_id,
  comments,
  gained_likes_number,
  user_id,
  onDeleteArticle,
}) => {
  const onItemClicked = () => {
    const isConfirmed = window.confirm(
      "Ar tikrai norite ištrinti temos nuorodą?"
    );

    if (isConfirmed) {
      onDeleteArticle && onDeleteArticle(_id);
    }
  };
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className={styles.wrapper}>
      <Link href={`/question/${question_id}`} className={styles.wrapper2}>
        <Image
          src={imageUrl}
          alt="Nuorodos paveikslelis"
          className={styles.image}
          width={700}
          height={500}
        />
        <h2 id="truncatedText">{article_title}</h2>
        <span className={styles.wrapper3}>
          <p>{date}</p>
          <p
            className={
              gained_likes_number < 0 ? styles.negativeLikes : styles.likes
            }
          >
            {`Patinka: ${gained_likes_number}`}
          </p>
          <p>{`Komentarai: ${comments}`}</p>
        </span>
        {/* <p>{question_text}</p> */}
        {/* {router.pathname === "/myQuestions" && (
            <Button text="Ištrinti" onClick={onItemClicked} type="DELETE" />
          )} */}
      </Link>
    </div>
  );
};

export default Article;
