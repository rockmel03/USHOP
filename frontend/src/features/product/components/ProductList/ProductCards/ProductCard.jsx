import { Link } from "react-router-dom";
import AddToCartButton from "../../../../cart/components/AddToCartButton";

const ProductCard = ({ data, isAuthenticated }) => {
  const rating = Number.parseFloat((Math.random() * 4).toFixed(1)) + 1;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
      <div className="h-56 w-full">
        <Link to={`/products/${data._id}`}>
          <img
            className="mx-auto h-full rounded-lg object-cover"
            src={data.images[0]?.url}
            alt={data.images[0]?.alt}
          />
        </Link>
      </div>

      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
            {" "}
            Up to 15% off{" "}
          </span>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 text-xl hover:bg-gray-100 hover:text-gray-900"
            >
              <span>
                <i className="ri-eye-line"></i>
              </span>
            </button>

            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 text-xl hover:bg-gray-100 hover:text-gray-900"
            >
              <span>
                <i className="ri-heart-line"></i>
              </span>
            </button>
          </div>
        </div>

        <Link
          to={`/products/${data._id}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          {data.name}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...new Array(Number.parseInt(rating))].map((item, idx) => (
              <span key={idx}>
                <svg
                  className="h-4 w-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>
              </span>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-900">{rating}</p>
          <p className="text-sm font-medium text-gray-500">(1,233)</p>
        </div>

        {/* <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Seller
            </p>
          </li>

          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Price
            </p>
          </li>
        </ul> */}

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900">
            ₹{data.price}
          </p>

          <AddToCartButton product={data} isAuthenticated={isAuthenticated}>
            {({ isAdded, isLoading }) => (
              <div
                className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none ${
                  isAdded
                    ? "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
                    : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                } `}
              >
                {!isAdded && (
                  <span className="mr-1">
                    <i className="ri-shopping-cart-2-line ri-lg"></i>
                  </span>
                )}
                {isAdded
                  ? "Added in Cart"
                  : isLoading
                  ? "Adding..."
                  : "Add to cart"}
              </div>
            )}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
