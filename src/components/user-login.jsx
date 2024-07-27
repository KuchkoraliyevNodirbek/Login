import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../config/request";
import { saveState } from "../config/storage";

export const UserLogin = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const submit = (data) => {
    request
      .post("/login", data)
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
      <h1>login</h1>
      <div>
        <form onSubmit={handleSubmit(submit)}>
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
  );
};
