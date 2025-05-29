import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import UploadImages from "../../../components/UploadImages";
import { useNavigate } from "react-router-dom";

const ProductForm = ({
  initialFormData = {
    name: "",
    description: "",
    category: "",
    price: null,
    stock: null,
  },
  handleSubmit,
}) => {
  const existingImages = initialFormData.images?.map((img) => ({
    type: "existing",
    ...img,
  }));
  const [images, setImages] = useState(existingImages || []);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteImages, setDeleteImages] = useState([]);

  const categories = useSelector((state) => state.categories.value);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDeleteExistingImages = (url) => {
    setDeleteImages((prev) => [...new Set([...prev, url])]);
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

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") return;
      data.append(key, formData[key]);
    });

    images
      .filter((imgObj) => imgObj.type === "new")
      .map((img) => {
        data.append("images", img.file);
      });

    if (deleteImages.length > 0) {
      data.append("deleteImages", deleteImages);
    }

    // Display the keys
    data.keys().forEach((key) => console.log(key, data.getAll(key)));

    handleSubmit(data);
  };

  return (
    <form onSubmit={submitHandler} className="max-w-xl flex flex-col gap-2">
      <h1 className="font-semibold text-2xl mb-3">Product Infromation</h1>
      <div className="flex flex-col">
        <label className="text-base font-medium capitalize mb-2 text-zinc-600">
          images
        </label>
        <div className="border border-gray-200 rounded-md px-2 py-2 ">
          <UploadImages
            images={images}
            setImages={setImages}
            deleteExistingImg={handleDeleteExistingImages}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-base font-medium capitalize mb-2 text-zinc-600"
        >
          name
        </label>
        <input
          type="text"
          id="name"
          className="text-base border border-gray-200 rounded-md px-2 py-1 placeholder:capitalize placeholder:text-gray-400"
          placeholder="name product"
          name="name"
          onChange={inputChangeHandler}
          value={formData.name}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-base font-medium capitalize mb-2 text-zinc-600"
        >
          description
          {/* <span className="font-normal">(optional)</span> */}
        </label>
        <textarea
          rows={3}
          id="description"
          className="text-base border border-gray-200 rounded-md px-2 py-1 placeholder:capitalize placeholder:text-gray-400 resize-none"
          placeholder="description product"
          name="description"
          onChange={inputChangeHandler}
          value={formData.description}
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="text-base font-medium capitalize mb-2 text-zinc-600"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={inputChangeHandler}
          className="text-base border border-gray-200 rounded-md px-2 py-1 capitalize text-gray-600"
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
      </div>{" "}
      <div className="flex flex-col">
        <label
          htmlFor="price"
          className="text-base font-medium capitalize mb-2 text-zinc-600"
        >
          price (₹)
        </label>
        <input
          type="number"
          step="any" // allows decimals
          id="price"
          className="text-base border border-gray-200 rounded-md px-2 py-1 placeholder:capitalize placeholder:text-gray-400"
          placeholder="price in rupees (₹)"
          min={0}
          name="price"
          onChange={inputChangeHandler}
          value={formData.price}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="stock"
          className="text-base font-medium capitalize mb-2 text-zinc-600"
        >
          stock
        </label>
        <input
          type="number"
          id="stock"
          className="text-base border border-gray-200 rounded-md px-2 py-1 placeholder:capitalize placeholder:text-gray-400"
          placeholder="stock"
          min={0}
          name="stock"
          onChange={inputChangeHandler}
          value={formData.stock}
        />
      </div>
      <div className="flex items-center justify-between gap-1 my-2">
        <button
          onClick={handleCancel}
          type="reset"
          className="text-zinc-700 font-semibold underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-base font-semibold bg-indigo-950 text-white px-3 py-1.5 rounded-full cursor-pointer active:scale-95 transition"
        >
          Continue{" "}
          <span>
            <i className="ri-arrow-right-long-line"></i>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
