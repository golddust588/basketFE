import { useEffect } from "react";
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const updateUser = useCallback((response) => {
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, []);

  const registerUser = useCallback(
    async (e: any) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${process.env.SERVER_URL}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e: any) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${process.env.SERVER_URL}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        registerInfo,
        updateRegisterInfo,
        loginInfo,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        registerError,
        isRegisterLoading,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
