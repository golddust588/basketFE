import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import PageTemplate from "@/components/organisms/PageTemplate/PageTemplate";
import Spinner from "@/components/atoms/Spinner/Spinner";

const VerifyEmail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const verifyUser = async () => {
    const body = {
      emailToken: router.query.id,
    };
    console.log("body", body);
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/users/verify-email`,
        body
      );
      if (response.status === 200) {
        cookie.set("jwt_token", response.data.jwt_token);
        setIsLoading(false);

        alert("El. paštas sėkmingai patvirtintas!");
        router.push("/");
      }
      console.log("response", response);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (router.query.id) {
      // console.log("efektoId", router.query.id);

      verifyUser();
    }
  }, [router.query.id]); // Run this effect whenever router.query.id changes

  return <PageTemplate>{isLoading ? <Spinner /> : <></>}</PageTemplate>;
};

export default VerifyEmail;
