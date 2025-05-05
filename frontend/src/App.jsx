import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/home?" element={<Home />} />
      </Route>
      <Route path="add" element={<AddProduct />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
