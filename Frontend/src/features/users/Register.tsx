import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "./usersSlice";

const Register = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current && usernameRef.current) {
      dispatch(
        registerUser({
          email: emailRef.current.value,
          name: usernameRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              type="text"
              placeholder="username"
              ref={usernameRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-nonerounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onSubmit={submitHandler}
            >
              Register
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have a account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
