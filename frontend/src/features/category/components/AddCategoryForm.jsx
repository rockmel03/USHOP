import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CategoryForm from "./CategoryForm";
import { addNewCategory } from "../categoryThunk";
import Success from "../../../components/Success";

function AddCategoryForm() {
  const { loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const submitHandler = (formData) => {
    if (loading) return;

    const toastId = toast.loading("Loading...");
    dispatch(addNewCategory(formData)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);

      if (action.payload.status) {
        toast.success(action.payload.message || "Added Successfully!");
        setSuccess(true);
      }
    });
  };

  return (
    <div className=" relative">
      <h1 className="text-3xl font-semibold text-center">New Category</h1>
      {success && <Success message="Category Added Successfully!" />}
      <CategoryForm onSubmit={submitHandler} loading={loading} />
    </div>
  );
}

export default AddCategoryForm;
