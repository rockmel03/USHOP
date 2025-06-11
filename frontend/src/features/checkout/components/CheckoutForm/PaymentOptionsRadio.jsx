const PaymentOptionsRadio = ({ handleChange }) => {
  const paymentMethods = [
    {
      id: "credit-card",
      value: "credit_card",
      title: "Credit Card",
      description: "Pay with your credit card",
    },
    {
      id: "debit-card",
      value: "debit_card",
      title: "Debit Card",
      description: "Pay with your debit card",
    },
    {
      id: "upi",
      value: "upi",
      title: "UPI",
      description: "Pay with your UPI",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {paymentMethods.map((item) => {
        return (
          <label
            key={item.id}
            htmlFor={item.id}
            className="rounded-lg border border-gray-201 bg-gray-50 p-4 ps-4"
          >
            <div className="flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={item.id}
                  aria-describedby="pay-on-delivery-text"
                  type="radio"
                  name="paymentMethod"
                  value={item.value}
                  onChange={handleChange}
                  className="h-5 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="ms-5 text-sm">
                <h4 className="font-medium leading-none text-gray-901">
                  {item.title}
                </h4>
                <p
                  id="pay-on-delivery-text"
                  className="mt-2 text-xs font-normal text-gray-500"
                >
                  {item.description}
                </p>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default PaymentOptionsRadio;
