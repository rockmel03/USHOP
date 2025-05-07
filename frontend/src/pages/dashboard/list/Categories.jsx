import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../features/category/categoryThunk";
import CategoryForm from "../../../features/category/CategoryForm";

export default function Categories() {
  const {
    loading,
    error,
    value: data,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const handleAddNewCategory = () => {
    setShowAddCategoryModal(true);
  };

  useEffect(() => {
    if (loading) return;

    const dispatchPromise = dispatch(getAllCategory());
    return () => {
      dispatchPromise.abort();
    };
  }, []);

  return (
    <main className="w-full h-full">
      {(!data?.categories || data?.categories?.length === 0) && (
        <p>No catergory(s) found</p>
      )}
      <div className="py-3 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Categories ({data?.totalDocuments})
        </p>
        <button
          onClick={handleAddNewCategory}
          className=" px-4 py-2 rounded bg-blue-500 text-sm font-semibold text-white cursor-pointer"
        >
          <span>Add Category</span>
        </button>
      </div>
      {showAddCategoryModal && (
        <div
          onClick={() => setShowAddCategoryModal(false)}
          className="absolute top-0 left-0 w-full h-full grid place-items-center bg-zinc-500/50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-4 w-md bg-white rounded-md text-zinc-800"
          >
            <h1 className="text-3xl font-semibold text-center">New Category</h1>
            <CategoryForm />
          </div>
        </div>
      )}
      <section>
        <ul>
          {data?.categories?.map((item, idx) => {
            return (
              <li key={item._id}>
                <div className="grid grid-cols-[1fr_2fr_0.5fr_0.5fr] px-2 py-4">
                  <h1>{item.name}</h1>
                  <p title={item.description}>
                    {item.description.split("").splice(0, 50).join("") + "..."}
                  </p>
                  <div>
                    {item.isActive? "active": "not active"}
                  </div>
                  <button className="text-red-500">
                    <span>
                      <i className="ri-delete-bin-5-line"></i>
                    </span>
                  </button>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
