import React from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import styles from "./styles.module.css";
import Button from "@/components/atoms/Button/Button";
import LikeButton from "@/components/atoms/LikeButton/LikeButton";

type QuestionType = {
  _id: string;
  question_title: string;
  question_text: string;
  date: string;
  gained_likes_number: number;
  user_id: string;
  answers: Array<any> | null;
};

type AnswerType = {
  _id: string;
  answer_text: string;
  date: string;
  gained_likes_number: number;
  question_id: string;
  user_id: string;
};

const Question = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<Array<AnswerType>>([]);
  const [upvotes, changeUpvote] = useState<number | null>(null);
  const [answerUpvotes, changeAnswerUpvote] = useState<{
    [key: string]: number;
  }>({});

  const headers = {
    authorization: cookie.get("jwt_token"),
  };

  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    const question = await axios.get(
      `${process.env.SERVER_URL}/questions/${router.query.id}`
    );

    setQuestion(question.data.question);
    changeUpvote(question.data.question.gained_likes_number);
  };

  useEffect(() => {
    router.query.id && fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  const fetchAnswer = async (id: string) => {
    const answers = await axios.get(
      `${process.env.SERVER_URL}/question/${router.query.id}/answers`
    );

    const fetchedAnswers = answers.data.answers;
    const upvotesObject = {};
    fetchedAnswers.forEach((answer: {}) => {
      //@ts-ignore
      upvotesObject[answer._id] = answer.gained_likes_number;
    });

    setAnswers(answers.data.answers);
    changeAnswerUpvote(upvotesObject);
  };

  useEffect(() => {
    router.query.id && fetchAnswer(router.query.id as string);
  }, [router.query.id]);

  const [answer_text, setAnswerText] = useState<string>("");

  const insertAnswer = async () => {
    const body = {
      answer_text: answer_text,
    };

    try {
      console.log(body);
      const response = await axios.post(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        body,
        {
          headers,
        }
      );

      if (response.status === 201) {
        setAnswerText("");
        // alert("Answer posted!");
        router.reload();
      }
      console.log("response", response);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  const onDeleteAnswer = async (_id: string) => {
    console.log(_id);
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    const response = await axios.delete(
      `${process.env.SERVER_URL}/answer/${_id}`,
      {
        headers,
      }
    );

    if (response.status === 200) {
      alert("Answer deleted!");
      router.reload();
    }

    console.log(response);
  };

  const onUpvote = async () => {
    if (cookie.get("liked question id") !== `${router.query.id}`) {
      try {
        const response = await axios.put(
          `${process.env.SERVER_URL}/question/upvote/${router.query.id}`
        );

        if (response.status === 200) {
          changeUpvote(response.data.gained_likes_number);
          cookie.set("liked question id", `${router.query.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
      }
    }
  };

  const onDownvote = async () => {
    if (cookie.get("liked question id") !== `${router.query.id}`) {
      try {
        const response = await axios.put(
          `${process.env.SERVER_URL}/question/downvote/${router.query.id}`
        );

        if (response.status === 200) {
          changeUpvote(response.data.gained_likes_number);
          cookie.set("liked question id", `${router.query.id}`);
        }
        console.log("likes", response);
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
      }
    }
  };

  const onAnswerUpvote = async (_id: string) => {
    if (cookie.get("liked answer id") !== `${_id}`) {
      try {
        const response = await axios.put(
          `${process.env.SERVER_URL}/answer/upvote/${_id}`,
          {},
          {
            headers,
          }
        );

        if (response.status === 200) {
          changeAnswerUpvote((prevUpvotes) => ({
            ...prevUpvotes,
            [_id]: response.data.gained_likes_number,
          }));

          cookie.set("liked answer id", `${_id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onAnswerDownvote = async (_id: string) => {
    if (cookie.get("liked answer id") !== `${_id}`) {
      try {
        const response = await axios.put(
          `${process.env.SERVER_URL}/answer/downvote/${_id}`,
          {},
          {
            headers,
          }
        );

        if (response.status === 200) {
          changeAnswerUpvote((prevUpvotes) => ({
            ...prevUpvotes,
            [_id]: response.data.gained_likes_number,
          }));
          cookie.set("liked answer id", `${_id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <PageTemplate>
      <div className={styles.wrapper}>
        {question && (
          <div>
            <div>
              <LikeButton type="UP" onClick={onUpvote} />
              <LikeButton type="DOWN" onClick={onDownvote} />
              <div
                className={
                  upvotes && upvotes < 0 ? styles.negativeLikes : styles.likes
                }
              >{`Upvotes: ${upvotes}`}</div>
            </div>

            <h2>{`${question.question_title}`}</h2>
            <h4>{`${question.question_text}`}</h4>
            <h5>{`Date: ${question.date}`}</h5>

            <h3>Answers:</h3>
            {answers.map((answer) => {
              return (
                <div className={styles.answerWrapper} key={answer._id}>
                  <h4>{answer.answer_text}</h4>
                  <h5>{answer.date}</h5>
                  <h5 className={styles.answerUpvotes}>
                    {`Upvotes: ${answerUpvotes[answer._id] || 0}`}
                    {/* {`Upvotes: ${answerUpvotes}`} */}
                    <LikeButton
                      type="SMALL-UP"
                      onClick={() => onAnswerUpvote(answer._id)}
                    />
                    <LikeButton
                      type="SMALL-DOWN"
                      onClick={() => onAnswerDownvote(answer._id)}
                    />
                  </h5>

                  {cookie.get("user_id") === answer.user_id && (
                    <Button
                      text="Delete your answer"
                      type="DELETE"
                      onClick={() => onDeleteAnswer(answer._id)}
                    />
                  )}
                </div>
              );
            })}

            <h3>Create your answer:</h3>
            {headers.authorization ? (
              <div>
                <textarea
                  className={styles.answerTextarea}
                  placeholder="Answer text:"
                  value={answer_text}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <Button type="POST" text="Answer" onClick={insertAnswer} />
              </div>
            ) : (
              <div>
                <span>Must be logged in to answer questions</span>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default Question;
