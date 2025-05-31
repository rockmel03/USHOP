import toast, { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.jsx";
import useInitialData from "./hooks/useInitialData.js";

export default function App() {
  const { isLoading, error } = useInitialData();

  if (error) toast.error(error);
  if (isLoading) return <>Loading data please wait...</>;

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}
