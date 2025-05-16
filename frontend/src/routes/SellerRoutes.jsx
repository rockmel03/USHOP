import { Route, Routes } from "react-router-dom";
import RequireAuth from "../features/auth/components/RequireAuth";
import NotFound from "../pages/NotFound";

function SellerRoutes() {
  return (
    <Routes>
      <Route element={<RequireAuth allowedRoles={["seller"]} />}>
        {/* seller specific routes */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default SellerRoutes;
