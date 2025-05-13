import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "./categoryThunk";
import Success from "../../components/Success";
import toast from "react-hot-toast";

export default function EditCategoryForm({ dataId }) {
  const { loading, value: categories } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const data = categories.find((item) => item._id === dataId);

  const submitHandler = (formData) => {
    if (loading) return;

    const toastId = toast.loading("Loading...");
    dispatch(updateCategory({ ...formData, _id: dataId })).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);

      if (action.payload.status) {
        toast.success(action.payload.message || "Updated Successfully!");
        setSuccess(true);
      }
    });
  };

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold text-center">Edit Category</h1>
      {success && <Success message={"Category Updated Successfully!"} />}
      {data && (
        <CategoryForm data={data} loading={loading} onSubmit={submitHandler} />
      )}
    </div>
  );
}
