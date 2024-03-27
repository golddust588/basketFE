import styles from "./index.module.css";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import axios from "axios";
import Questions from "@/components/organisms/Questions/Questions";
import NavBar from "../components/molecules/NavBarMainPageFilter/NavBar";
import Articles from "@/components/organisms/Articles/Articles";

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

const Main = () => {
  const [articles, setArticles] = useState<Array<any> | null>(null);
  const [originalArticles, setOriginalArticles] =
    useState<Array<ArticleType> | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/articles`);
      setArticles(response.data.articles);
      setOriginalArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickedAllArticles = () => {
    setArticles(originalArticles);
  };

  const onClickedAnswered = () => {
    // @ts-ignore
    const filteredArticles = articles.filter((article) => article.comments > 0);
    setArticles(filteredArticles);
  };

  const onClickedMostLiked = () => {
    if (originalArticles) {
      const sortedArticles = [...originalArticles].sort(
        (a, b) => b.gained_likes_number - a.gained_likes_number
      );

      setArticles(sortedArticles);
    }
  };

  return (
    <>
      <PageTemplate>
        <NavBar
          onClickedAllQuestions={onClickedAllArticles}
          onClickedAnswered={onClickedAnswered}
          onClickedMostLiked={onClickedMostLiked}
        />
        <Articles articles={articles} />
      </PageTemplate>
    </>
  );
};

export default Main;
