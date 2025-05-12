import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "./Layout/Layout";
import Home from "../pages/Home";
import RequireAuth from "../features/auth/RequireAuth";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/dashboard/list/Users";
import Sellers from "../pages/dashboard/list/Sellers";
import Products from "../pages/dashboard/list/Products";
import Categories from "../pages/dashboard/list/Categories";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/home?" element={<Home />} />
      </Route>
      <Route element={<RequireAuth roles={["seller", "admin"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="list">
            <Route path="users" element={<Users />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
