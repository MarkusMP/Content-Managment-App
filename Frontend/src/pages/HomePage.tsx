import React, { useEffect } from "react";
import { loginUser } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const history = useHistory();

  useEffect(() => {
    if (userInfo.accessToken) {
      history.push("/dashboard");
    }
  }, [userInfo, history]);

  const loginWithTest = () => {
    dispatch(loginUser({ email: "test@test.com", password: "password" }));
  };
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl">Content Management App (Trello clone)</h1>

      <button
        onClick={loginWithTest}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login With Test Account
      </button>
    </div>
  );
};

export default HomePage;
