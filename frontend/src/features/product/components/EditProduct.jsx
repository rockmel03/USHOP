import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { updateProduct } from "../productThunk";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: products } = useSelector((state) => state.products);
  const productData = products.find((item) => item._id === productId);

  const handleSubmit = (formData) => {
    console.log(formData);
    if (formData instanceof FormData) {
      formData.entries().map(([key, value]) => console.log(key, value));
    }

    // post request
    const toastId = toast.loading("Loading...");
    dispatch(updateProduct(formData)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload?.status) {
        toast.success("Product created successfully");
        navigate(`/dashboard/products/${productId}`);
      }
    });
  };

  return (
    <section className="px-4 py-2">
      {productData ? (
        <ProductForm
          initialFormData={{
            ...productData,
            category: productData.category._id,
          }}
          handleSubmit={handleSubmit}
        />
      ) : (
        <p>Product Data not found</p>
      )}
    </section>
  );
};

export default EditProduct;
