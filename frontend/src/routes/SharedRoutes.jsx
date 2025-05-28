import RequireAuth from "../features/auth/components/RequireAuth";
import { useRoutes } from "react-router-dom";
import Categories from "../pages/dashboard/shared/Categories";
import Products from "../pages/dashboard/shared/Products";
import NotFound from "../pages/NotFound";
import ProductInfo from "../features/product/components/ProductInfo/ProductInfo";
import EditProduct from "../features/product/components/EditProduct";
import AddProduct from "../features/product/components/AddProduct";

function SharedRoutes() {
  const routes = [
    {
      element: <RequireAuth allowedRoles={["seller", "admin"]} />,
      children: [
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "products/add", element: <AddProduct /> },
        {
          path: "products/:id",
          element: <ProductInfo />,
        },
        {
          path: "products/:id/edit",
          element: <EditProduct />,
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ];
  return useRoutes(routes);
}

export default SharedRoutes;
