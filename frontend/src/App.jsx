import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Users from "./pages/dashboard/list/Users.jsx";
import Sellers from "./pages/dashboard/list/Sellers.jsx";
import Products from "./pages/dashboard/list/Products.jsx";
import Categories from "./pages/dashboard/list/Categories.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/home?" element={<Home />} />
      </Route>
      <Route path="add" element={<AddProduct />} />
      <Route path="admin">
        <Route path="category">
          <Route path="add" element={<AddCategory />} />
        </Route>
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="list">
          <Route path="users" element={<Users />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
