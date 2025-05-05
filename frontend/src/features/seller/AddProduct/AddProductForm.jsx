import React, { useState } from "react";
import UploadImages from "../../../components/UploadImages";
import InputFeild from "../../../components/InputFeild";

export default function AddProductForm() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: null,
    stock: null,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    images.forEach((imgFile) => {
      data.append("images", imgFile);
    });
    console.log(formData);
    console.log(images);
    // Display the keys
    for (const key of data.keys()) {
      console.log(key, data.getAll(key));
    }
  };
  return (
    <form onSubmit={submitHandler} className="p-4 flex flex-col gap-3">
      <h1 className="capitalize font-medium text-4xl">product information</h1>

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
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
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
