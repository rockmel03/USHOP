import React, { useState } from "react";
import UploadImages from "../../../components/UploadImages";
import InputFeild from "../../../components/InputFeild";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../product/productThunk";
import toast from "react-hot-toast";

const initialFormData = {
  name: "",
  description: "",
  category: "",
  price: null,
  stock: null,
};

export default function AddProductForm() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const categories = useSelector((state) => state.categories.value);

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //validation
    if (images.length === 0) {
      toast.error("Please Provide atleast one image");
      return;
    }
    const { name, description, category, price, stock } = formData;
    if (
      !name ||
      !description ||
      !category ||
      price === null ||
      stock === null
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    if (price < 0 || stock < 0) {
      toast.error("Price and Stock must be non-negative.");
      return;
    }

    const reset = () => {
      setFormData(initialFormData);
      setImages([]);
    };
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    images.forEach((imgFile) => {
      data.append("images", imgFile);
    });
    // Display the keys
    for (const key of data.keys()) {
      console.log(key, data.getAll(key));
    }

    // post request
    const toastId = toast.loading("Loading...");
    dispatch(addProduct(data)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload?.status) {
        toast.success("Product created successfully");
        reset();
      }
    });
  };
  return (
    <form onSubmit={submitHandler} className="p-4 flex flex-col gap-2">
      <h1 className="capitalize font-medium text-2xl">product information</h1>

      <div className="">
        <h3 className="font-medium">Images</h3>
        <UploadImages images={images} setImages={setImages} />
      </div>
      <InputFeild
        label={"Name"}
        placeholder="Name of Product"
        className="rounded-md"
        name="name"
        onChange={inputChangeHandler}
      />
      <div>
        <label htmlFor="description" className="font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="rounded-md shadow-md py-2 px-4 w-full resize-none"
          name="description"
          onChange={inputChangeHandler}
          placeholder="Product Description"
        ></textarea>
      </div>
      <InputFeild
        label={"Price"}
        type="number"
        placeholder="Price in rupees(₹)"
        className="rounded-md"
        min={0}
        name="price"
        onChange={inputChangeHandler}
      />
      <label htmlFor="category" className="font-medium">
        Category
      </label>
      <select
        name="category"
        id="category"
        onChange={inputChangeHandler}
        className="rounded-md shadow-md py-2 px-4 w-full text-zinc-500"
      >
        <option value="" defaultChecked>
          Select Category
        </option>
        {categories?.length > 0 &&
          categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
      </select>
      <InputFeild
        label={"Stock"}
        type="number"
        placeholder="Stock"
        min={1}
        className="rounded-md"
        name="stock"
        onChange={inputChangeHandler}
      />
      <button
        className="px-4 py-2 bg-violet-950 rounded text-white"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}
