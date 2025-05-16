import { Route, Routes } from "react-router-dom";
import RequireAuth from "../features/auth/components/RequireAuth";
import Users from "../pages/dashboard/admin/Users";
import Sellers from "../pages/dashboard/admin/Sellers";
import NotFound from "../pages/NotFound";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="users" element={<Users />} />
          <Route path="sellers" element={<Sellers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
