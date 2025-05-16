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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<PersistLogin />}>
        <Route element={<CustomerLayout />}>
          <Route path="/home?" element={<Home />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="seller/*" element={<SellerRoutes />} />
          <Route path="*" element={<SharedRoutes />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
