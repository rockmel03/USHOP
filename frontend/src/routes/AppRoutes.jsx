import { Route, Routes } from "react-router-dom";
import PersistLogin from "../features/auth/components/PersistLogin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/shared/Dashboard";

import CustomerLayout from "../layouts/CustomerLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminRoutes from "./AdminRoutes";
import SellerRoutes from "./SellerRoutes";
import SharedRoutes from "./SharedRoutes";
import Products from "../pages/Products";
import ProductInfo from "../features/product/components/ProductInfo/ProductInfo";
import RequireAuth from "../features/auth/components/RequireAuth";
import Cart from "../pages/cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<PersistLogin />}>
        <Route element={<CustomerLayout />}>
          <Route path="/home?" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductInfo />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin/*" element={<AdminRoutes />} />
            <Route path="seller/*" element={<SellerRoutes />} />
            <Route path="*" element={<SharedRoutes />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
