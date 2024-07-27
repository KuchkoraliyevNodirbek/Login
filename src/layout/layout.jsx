import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { loadState } from "../config/storage";

export const Layout = () => {
  const user = loadState("user");
  if (!user) return <Navigate to={"/login"} />;
  return (
    <div>
      <Outlet />
    </div>
  );
};
