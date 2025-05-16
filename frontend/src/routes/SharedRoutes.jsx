import RequireAuth from "../features/auth/components/RequireAuth";
import { useRoutes } from "react-router-dom";
import Categories from "../pages/dashboard/shared/Categories";
import Products from "../pages/dashboard/shared/Products";
import NotFound from "../pages/NotFound";

function SharedRoutes() {
  const routes = [
    {
      element: <RequireAuth allowedRoles={["seller", "admin"]} />,
      children: [
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
      ],
    },

    { path: "*", element: <NotFound /> },
  ];
  return useRoutes(routes);
}

export default SharedRoutes;
