import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../productThunk";

const DeleteProductModal = ({ onSuccessDelete }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const hideDeleteModal = () => {
    setShowDeleteProductModal(false);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    newParams.delete("type");
    newParams.delete("id");
    setSearchParams(newParams);
  };

  const handleConfirmDelete = () => {
    if (!productId) return;
    const toastId = toast.loading("Deleting...", productId);
    setIsDeleting(true);
    dispatch(deleteProduct(productId)).then((action) => {
      setIsDeleting(false);
      toast.dismiss(toastId);
      if (action.error) {
        return toast.error(
          action.payload?.message || "Failed to delete product"
        );
      }

      if (action.payload?.status) {
        toast.success(action.payload?.message || "Deleted Suceessfully!");
        hideDeleteModal();
        onSuccessDelete?.();
      }
    });
  };

  useEffect(() => {
    const hasAction = searchParams.has("action");
    const hasType = searchParams.has("type");
    const hasId = searchParams.has("id");
    if (!(hasAction && hasType && hasId)) {
      return setShowDeleteProductModal(false);
    }

    const isDeleteProductAction =
      searchParams.get("action") === "delete" &&
      searchParams.get("type") === "product";
    if (!isDeleteProductAction) return setShowDeleteProductModal(false);

    setProductId(searchParams.get("id"));
    setShowDeleteProductModal(true);
  }, [searchParams]);

  return (
    <Modal showModal={showDeleteProductModal} hideModal={hideDeleteModal}>
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
          onClick={hideDeleteModal}
        >
          <span>
            <i className="ri-close-fill ri-xl"></i>
          </span>
        </button>
        <div className="w-fit mb-3.5 mx-auto">
          <span className="text-4xl text-gray-400 dark:text-gray-500 ">
            <i className="ri-delete-bin-5-fill ri-xl"></i>
          </span>
        </div>
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={hideDeleteModal}
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 disabled:cursor-not-allowed"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, I'm sure"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
