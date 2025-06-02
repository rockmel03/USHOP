import { CartItemList } from "../features/cart/components/CartItemList/CartItemList";
import OrderSummary from "../features/cart/components/OrderSummary";

const Cart = () => {
  const similarProducts = [];

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <CartItemList />
            {similarProducts?.length > 0 && (
              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900">
                  People also bought
                </h3>
                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  {similarProducts.map((item) => {
                    return (
                      <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <Link to="#" className="overflow-hidden rounded">
                          <img
                            className="mx-auto h-44 w-44"
                            src={item.images[0]?.url}
                            alt="imac image"
                          />
                        </Link>
                        <div>
                          <Link
                            to="#"
                            className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-2 text-base font-normal text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            <span className="line-through"> $399,99 </span>
                          </p>
                          <p className="text-lg font-bold leading-tight text-red-600">
                            $299
                          </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2.5">
                          <button
                            data-tooltip-target="favourites-tooltip-1"
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                          >
                            <span>
                              <i className="ri-heart-line ri-lg"></i>
                            </span>
                          </button>
                          <div
                            id="favourites-tooltip-1"
                            role="tooltip"
                            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                          >
                            Add to favourites
                            <div
                              className="tooltip-arrow"
                              data-popper-arrow
                            ></div>
                          </div>
                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                          >
                            <svg
                              className="-ms-2 me-2 h-5 w-5"
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
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                              />
                            </svg>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default Cart;
