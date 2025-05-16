import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "./features/category/categoryThunk.js";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  const { loading, value: categoriesData } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || categoriesData.length > 0) return;
    const loadCategory = dispatch(getAllCategory());
    return () => {
      loadCategory.abort();
    };
  }, []);
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}
