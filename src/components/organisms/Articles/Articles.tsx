import React from "react";
import { useState } from "react";
import styles from "./articles.module.css";
import Article from "../../molecules/Article/Article";
import Spinner from "@/components/atoms/Spinner/Spinner";

type ArticlesType = {
  articles: Array<any> | null;
  onDeleteArticle?: (id: string) => void;
};

const Articles: React.FC<ArticlesType> = ({ articles, onDeleteArticle }) => {
  return (
    <div className={styles.wrapper}>
      {articles === null ? (
        <Spinner />
      ) : (
        articles &&
        articles.map((article) => {
          return (
            <div key={article._id}>
              <Article
                _id={article._id}
                article_title={article.article_title}
                imageName={article.imageName}
                imageUrl={article.imageUrl}
                caption={article.caption}
                date={article.date}
                question_id={article.question_id}
                comments={article.comments}
                gained_likes_number={article.gained_likes_number}
                user_id={article.user_id}
                onDeleteArticle={onDeleteArticle}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Articles;
