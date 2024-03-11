import styles from "./index.module.css";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";

import axios from "axios";
import Questions from "@/components/organisms/Questions/Questions";
import NavBar from "../components/molecules/NavBarMainPageFilter/NavBar";

type QuestionType = {
  _id: string;
  question_title: string;
  question_text: string;
  date: string;
  gained_likes_number: number;
  user_id: string;
  answers: [];
  onDeleteQuestion?: (id: string) => void;
};

const Main = () => {
  const [questions, setQuestions] = useState<Array<any> | null>(null);
  const [originalQuestions, setOriginalQuestions] =
    useState<Array<QuestionType> | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      setQuestions(response.data.questions);
      setOriginalQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickedAllQuestions = () => {
    setQuestions(originalQuestions);
  };

  const onClickedAnswered = () => {
    // @ts-ignore
    const filteredQuestions = questions.filter(
      (question) => question.answers.length > 0
    );
    setQuestions(filteredQuestions);
  };

  const onClickedMostLiked = () => {
    if (originalQuestions) {
      const sortedQuestions = [...originalQuestions].sort(
        (a, b) => b.gained_likes_number - a.gained_likes_number
      );

      setQuestions(sortedQuestions);
    }
  };

  return (
    <>
      <PageTemplate>
        <NavBar
          onClickedAllQuestions={onClickedAllQuestions}
          onClickedAnswered={onClickedAnswered}
          onClickedMostLiked={onClickedMostLiked}
        />
        <Questions questions={questions} />
      </PageTemplate>
    </>
  );
};

export default Main;
