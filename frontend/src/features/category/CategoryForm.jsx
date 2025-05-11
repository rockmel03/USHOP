import { useState } from "react";
import InputFeild from "../../components/InputFeild";

const initialFormData = { name: "", description: "", isActive: true };

export default function CategoryForm({ data, onSubmit, loading }) {
  const [formData, setFormData] = useState(data || initialFormData);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submitHandler} className="p-4 flex flex-col gap-3">
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
