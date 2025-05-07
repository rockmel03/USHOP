import { useState } from "react";
import InputFeild from "../../components/InputFeild";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "./categoryThunk";

const initialFormData = {
  name: "",
  description: "",
  isActive: true,
};

export default function CategoryForm() {
  const { loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    if (loading) return;
    dispatch(addNewCategory(formData)).then(() => {
      setFormData(initialFormData);
    });
  };

  return (
    <form onSubmit={submitHandler} className="p-4 flex flex-col gap-3">
      {error && (
        <p className="text-sm font-medium text-red-500 text-center">{error}</p>
      )}
      <InputFeild
        label={"Name"}
        value={formData.name}
        name="name"
        onChange={inputChangeHandler}
        placeholder={"Name of Category"}
        className={"!rounded-md"}
        autoFocus="on"
        required
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
          value={formData.description}
          placeholder="Category Description"
        ></textarea>
      </div>

      <div>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={formData.isActive}
          onChange={() =>
            setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
          }
        />
        <label htmlFor="isActive">Active</label>
      </div>
      <button
        className="px-4 py-2 bg-violet-950 rounded text-white"
        type="submit"
      >
        {loading ? "Loading ..." : "Save"}
      </button>
    </form>
  );
}
