import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "./categoryThunk";
import CategoryForm from "./CategoryForm";

function AddCategoryForm() {
  const { loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const submitHandler = (formData) => {
    console.log(formData);
    if (loading) return;
    dispatch(addNewCategory(formData)).then((action) => {
      action.payload.status && setSuccess(true);
    });
  };

  if (success) {
    return (
      <div className="w-full h-full grid place-items-center">
        <h3 className="text-green-500 text-xl font-medium">Success</h3>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">New Category</h1>
      {error && (
        <p className="text-sm font-medium text-red-500 text-center">{error}</p>
      )}
      <CategoryForm onSubmit={submitHandler} loading={loading} />
    </>
  );
}

export default AddCategoryForm;
