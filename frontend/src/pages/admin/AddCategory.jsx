import React from "react";
import CategoryForm from "../../features/category/CategoryForm";

export default function AddCategory() {
  return (
    <section>
      <div className="p-4 max-w-md">
        <h1 className="text-2xl font-semibold">Add New Category</h1>
        <CategoryForm />
      </div>
    </section>
  );
}
