import { Link } from "react-router-dom";
import AddressForm from "../../../../components/AddressForm/AddressForm";
import OrderSummary from "../../../cart/components/OrderSummary";
import PaymentOptionsRadio from "./PaymentOptionsRadio";
import InputField from "../../../../components/formFields/InputField";

const CheckoutForm = () => {
  return (
    <form
      action="#"
      className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16"
    >
      <div className="min-w-0 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Delivery Details
          </h2>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
              <InputField
                label={"Your Name*"}
                type="text"
                placeholder="Jhone Doe"
                required
              />
              <InputField
                label={"Phone Number*"}
                type="text"
                placeholder="123-456-7990"
                required
              />
            </div>
            <AddressForm />
            <div className="my-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                <span>
                  <i className="ri-add-line ri-lg"></i>
                </span>
                Add new address
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

          <div>
            <PaymentOptionsRadio />
          </div>
        </div>

        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            {" "}
            Enter a gift card, voucher or promotional code{" "}
          </label>
          <div className="flex max-w-md items-center gap-4">
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder=""
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xl font-semibold text-gray-900">Order summary</p>
          <div>
            <OrderSummary />
          </div>
        </div>
        <div className="space-y-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300"
          >
            Proceed to Payment
          </button>

          <p className="text-sm font-normal text-gray-500">
            One or more items in your cart require an account.{" "}
            <Link
              to="/login"
              title=""
              className="font-medium text-blue-700 underline hover:no-underlin"
            >
              Sign in or create an account now.
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
