import React from "react";
import ProductForm from "./ProductForm";
import { useDispatch } from "react-redux";
import { addProduct } from "../productThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    // post request
    const toastId = toast.loading("Loading...");
    dispatch(addProduct(formData)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload?.status) {
        toast.success("Product created successfully");
        navigate(`/dashboard/products/${action.payload.data?._id}`);
      }
    });
  };

  return (
    <div className="px-4 py-4">
      <ProductForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddProduct;
