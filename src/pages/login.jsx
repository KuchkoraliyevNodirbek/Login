import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../config/request";
import { saveState } from "../config/storage";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../components/user-login";

export const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, register, reset } = useForm();

  const registerUser = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.data) {
          saveState("user", {
            accessToken: res.data.accessToken,
            ...res.data.user,
          });
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        {open ? (
          <UserLogin />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
              <input
                {...register("name")}
                placeholder="Name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>
          </>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 w-full p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          {open ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};
