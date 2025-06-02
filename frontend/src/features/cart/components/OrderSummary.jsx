const OrderSummary = () => {
  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-gray-900">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Original price
              </dt>
              <dd className="text-base font-medium text-gray-900">$7,592.00</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Savings</dt>
              <dd className="text-base font-medium text-green-600">-$299.00</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Store Pickup
              </dt>
              <dd className="text-base font-medium text-gray-900">$99</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Tax</dt>
              <dd className="text-base font-medium text-gray-900">$799</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-base font-bold text-gray-900">Total</dt>
            <dd className="text-base font-bold text-gray-900">$8,191.00</dd>
          </dl>
        </div>

        <a
          href="#"
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
        >
          Proceed to Checkout
        </a>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500"> or </span>
          <a
            href="#"
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
          >
            Continue Shopping
            <span>
              <i className="ri-arrow-right-long-line ri-lg  "></i>
            </span>
          </a>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-smsm:p-6">
        <form className="space-y-4">
          <div>
            <label
              for="voucher"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              {" "}
              Do you have a voucher or gift card?{" "}
            </label>
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              placeholder=""
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            Apply Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSummary;
