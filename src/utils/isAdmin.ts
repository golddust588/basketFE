import { useState, useEffect } from "react";
import axios from "axios";

const isAdmin = (headers: object) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.SERVER_URL}/users/is-user-admin`,

          {
            headers,
          }
        );
        // console.log(response);
        // Assuming your backend returns a boolean value indicating if the user is logged in
        const loggedIn = response.data.message;
        setIsAdmin(loggedIn);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchIsAdmin();
  }, [headers]);
  return isAdmin;
};

export default isAdmin;
