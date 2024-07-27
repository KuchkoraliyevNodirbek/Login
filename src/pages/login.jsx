import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../config/request";
import { saveState } from "../config/storage";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../components/user-login";

export const Login = () => {
  const navigate = useNavigate();
  const [open, setOPen] = React.useState(false);
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
    <>
      {open ? (
        <>
          <UserLogin />
        </>
      ) : (
        <>
          <h1>Register</h1>
          <div>
            <form onSubmit={handleSubmit(registerUser)}>
              <input {...register("name")} placeholder="name" type="text" />
              <input {...register("email")} placeholder="email" type="email" />
              <input
                {...register("password")}
                placeholder="password"
                type="password"
              />
              <button type="submit">send</button>
            </form>
          </div>
        </>
      )}
      <button onClick={() => setOPen(!open)}>
        {open ? "Register" : "LOgin"}
      </button>
    </>
  );
};
