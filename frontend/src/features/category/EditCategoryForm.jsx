import React from "react";
import CategoryForm from "./CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "./categoryThunk";

export default function EditCategoryForm({ dataId }) {
  const {
    loading,
    error,
    value: categories,
  } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const data = categories.find((item) => item._id === dataId);

  const submitHandler = (formData) => {
    console.log(formData);
    dispatch(updateCategory({ ...formData, _id: dataId }));
  };
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Edit Category</h1>
      {error && (
        <p className="text-sm font-medium text-red-500 text-center">{error}</p>
      )}
      {data && (
        <CategoryForm data={data} loading={loading} onSubmit={submitHandler} />
      )}
    </>
  );
}
