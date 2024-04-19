import { useEffect, useState } from "react";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import axios from "axios";
import Questions from "@/components/organisms/Questions/Questions";
import NavBar from "../../components/molecules/NavBarMainPageFilter/NavBar";
import cookie from "js-cookie";
import { useRouter } from "next/router";

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

  const router = useRouter();

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

  const onDeleteQuestion = async (_id: string) => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    const response = await axios.delete(
      `${process.env.SERVER_URL}/question/${_id}`,
      {
        headers,
      }
    );

    if (response.status === 200) {
      // setQuestions((prevQuestions) => {
      //   return (
      //     prevQuestions &&
      //     prevQuestions.filter((question) => question._id !== _id)
      //   );
      // });
      router.push("/forum");
    }

    console.log(response);
  };

  return (
    <>
      <PageTemplate>
        <NavBar
          onClickedAllQuestions={onClickedAllQuestions}
          onClickedAnswered={onClickedAnswered}
          onClickedMostLiked={onClickedMostLiked}
        />
        <Questions questions={questions} onDeleteQuestion={onDeleteQuestion} />
      </PageTemplate>
    </>
  );
};

export default Main;
