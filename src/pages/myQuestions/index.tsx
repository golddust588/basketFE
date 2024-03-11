import styles from "./index.module.css";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Questions from "@/components/organisms/Questions/Questions";

const Main = () => {
  const [questions, setQuestions] = useState<Array<any> | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };
      const response = await axios.get(
        `${process.env.SERVER_URL}/questions/users/${cookie.get("user_id")}`,
        {
          headers,
        }
      );
      console.log(response);
      setQuestions(response.data.questions);
      console.log(questions);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      setQuestions((prevQuestions) => {
        return (
          prevQuestions &&
          prevQuestions.filter((question) => question._id !== _id)
        );
      });
      router.push("/myQuestions");
    }

    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageTemplate>
        <div>
          {questions && questions.length > 0 ? (
            <Questions
              questions={questions}
              onDeleteQuestion={onDeleteQuestion}
            />
          ) : (
            <h2 className={`${styles.text}`}>No questions yet</h2>
          )}
        </div>
      </PageTemplate>
    </>
  );
};

export default Main;
