import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  console.log(user);

  const postRequest = async (url: string, body: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      return { error: true, status: response.status, message };
    }

    return data;
  };

  useEffect(() => {
    async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          return navigate("/");
        }, 3000);
      } else {
        if (emailToken) {
          setIsLoading(true);
          const response = await postRequest(
            `${process.env.SERVER_URL}/users/verify-email`,
            JSON.stringify({ emailToken })
          );
          setIsLoading(false);
          console.log("res", response);

          if (response.error) {
            return seError(response);
          }
          updateUser(response);
        }
      }
    };
  }, [emailToken, user]);

  return (
    <div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>
              <Alert severity="success">
                El. paštas sėkmingai patvirtintas...
              </Alert>
            </div>
          ) : (
            <div>
              {error.error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
