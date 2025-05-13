import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  deleteCategory,
  getAllCategory,
} from "../../../features/category/categoryThunk";
import AddCategoryForm from "../../../features/category/AddCategoryForm";
import Modal from "../../../components/Modal";
import EditCategoryForm from "../../../features/category/EditCategoryForm";
import toast from "react-hot-toast";

export default function Categories() {
  const { loading, value: categoriesData } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const editId = searchParams.get("edit");
  const deleteId = searchParams.get("delete");

  const handleAddNewCategory = () => {
    setShowAddCategory(true);
  };

  useEffect(() => {
    if (editId) {
      setShowEditCategory(true);
    }
  }, [editId]);

  const onDeleteClick = (_id) => {
    const params = new URLSearchParams();
    params.set("delete", _id);
    setSearchParams(params);
  };

  const handleDeleteCategory = () => {
    if (!deleteId) return;
    const toastId = toast.loading("Loading...");
    dispatch(deleteCategory(deleteId)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload.status) {
        toast.success(action.payload.message || "Deleted Successfully!");
        setShowDeleteModal(false);
        setSearchParams();
      }
    });
  };

  useEffect(() => {
    if (deleteId) setShowDeleteModal(true);
  }, [deleteId]);

  useEffect(() => {
    if (loading || categoriesData.length > 0) return;

    const dispatchPromise = dispatch(getAllCategory());
    return () => {
      dispatchPromise.abort();
    };
  }, []);

  return (
    <main className="w-full h-full">
      <section>
        <div className="py-3 flex justify-between items-center">
          <p className="text-xl font-semibold">
            Categories ({categoriesData.length})
          </p>
          <button
            onClick={handleAddNewCategory}
            className=" px-4 py-2 rounded bg-blue-500 text-sm font-semibold text-white cursor-pointer"
          >
            <span>Add Category</span>
          </button>
        </div>
        <ul>
          {categoriesData.length > 0 ? (
            categoriesData?.map((data, idx) => {
              return (
                <li key={data._id}>
                  <div className="grid grid-cols-[0.2fr_1fr_2fr_0.5fr_0.5fr] px-2 py-4">
                    <p className="font-medium">{idx + 1}.</p>
                    <Link to={`?edit=${data._id}`} className="hover:underline">
                      <h1 className="font-medium">{data.name}</h1>
                    </Link>
                    <p title={data.description}>
                      {data.description.split("").splice(0, 50).join("") +
                        "..."}
                    </p>
                    <p className="text-sm font-medium">
                      {data.isActive ? "Active" : "Inactive"}
                    </p>
                    <div className="flex justify-around">
                      <button
                        onClick={() => onDeleteClick(data._id)}
                        type="button"
                        className="w-fit text-zinc-500 hover:text-zinc-800 cursor-pointer active:scale-90 transition-all duration-200 ease"
                      >
                        <span className=" text-red-500">
                          <i className="ri-delete-bin-fill ri-lg"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <hr />
                </li>
              );
            })
          ) : (
            <p className="text-sm font font-semibold opacity-80">
              No category found
            </p>
          )}
        </ul>
      </section>
      <Modal
        showModal={showAddCategory}
        hideModal={() => setShowAddCategory(false)}
      >
        <div className="p-4 w-md bg-white rounded-md text-zinc-800">
          <AddCategoryForm />
        </div>
      </Modal>

      <Modal
        showModal={showEditCategory}
        hideModal={() => {
          setShowEditCategory(false);
          setSearchParams();
        }}
      >
        <div className="p-4 w-md bg-white rounded-md text-zinc-800">
          <EditCategoryForm dataId={editId} />
        </div>
      </Modal>

      <Modal
        showModal={showDeleteModal}
        hideModal={() => {
          setShowDeleteModal(false);
          setSearchParams();
        }}
      >
        <div className="bg-white w-sm p-5 rounded-lg flex flex-col items-center text-center gap-2">
          <p className="text-5xl text-red-500">
            <i className="ri-close-circle-line ri-lg"></i>
          </p>
          <h3 className="text-xl font-semibold">Are you sure?</h3>
          <p>Do you really want to delete? this action can not undone.</p>
          <div className="w-full flex gap-1 justify-between">
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(false);
                setSearchParams();
              }}
              className="px-4 py-2 text-sm font-semibold bg-gray-500 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteCategory}
              className="px-4 py-2 text-sm font-semibold bg-red-400 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
