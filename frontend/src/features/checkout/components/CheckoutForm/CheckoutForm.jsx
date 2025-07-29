import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../../../cart/components/OrderSummary";
import PaymentOptionsRadio from "./PaymentOptionsRadio";
import InputField from "../../../../components/formFields/InputField";
import AddressFields from "../../../user/components/AddressFields";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setCheckoutInfo } from "../../checkoutSlice";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../../payment/paymentThunks";
import { selectCartTotalAmount } from "../../../cart/cartSlice";
import useRazorPay from "../../../payment/hooks/useRazorPay";
import { createOrder } from "../../../order/orderThunk";

const CheckoutForm = () => {
  const { profile } = useSelector((state) => state.user);
  const totalAmount = useSelector(selectCartTotalAmount);
  const { payNow, isLoaded: isRazorpayLoaded } = useRazorPay();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    paymentMethod: "",
    shippingAddress: {
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAddressChanges = (address) => {
    setFormData((prev) => ({ ...prev, shippingAddress: address }));
  };

  const handleRadioChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked && name === "paymentMethod") {
      setFormData((prev) => ({ ...prev, paymentMethod: value }));
    }
  };

  const paymentResponseHandler = async function (response) {
    let toastId;
    try {
      // verify order
      toastId = toast.loading("Verifying payment...");
      const action = await dispatch(verifyPayment(response));

      // console.log("verify action", action);
      toast.dismiss(toastId);

      if (action.error) return toast.error(action.payload);
      if (!action.payload?.data) return;

      if (!action.payload.data.paymentVerified)
        return toast.error(
          action.payload.message || "Payment verification failed"
        );

      toast.success(action.payload.message);

      const orderData = {
        ...formData,
        paymentInfo: response,
      };

      // create new order
      toastId = toast.loading("Creating Order...");
      const orderAction = await dispatch(createOrder(orderData));
      toast.dismiss(toastId);
      if (orderAction.error) return toast.error(orderAction.payload);
      if (!action.payload?.data) return;

      toast.success(action.payload.message);

      // navigate to order page
      // console.log(orderAction);
      navigate(`/orders`);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const toastId = toast.loading("Loading...");
    dispatch(setCheckoutInfo({ ...formData, totalAmount }));
    dispatch(createPaymentOrder({ amount: totalAmount })).then((action) => {
      toast.remove(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload?.data) {
        if (isRazorpayLoaded) {
          payNow(
            {
              amount: totalAmount,
              orderId: action.payload.data.id,
              user: { ...user, contact: formData.phoneNumber },
            },
            paymentResponseHandler
          );
        } else {
          toast.error("Failed to load Razorpay, Try later");
        }
      }
    });
  };

  useEffect(() => {
    dispatch(setCheckoutInfo({ ...formData, totalAmount }));
  }, [formData]);

  useEffect(() => {
    if (profile) {
      const { fullname, phoneNumber, address } = profile;
      setFormData((prev) => {
        const data = { ...prev };
        if (fullname) data.fullname = fullname;
        if (phoneNumber) data.phoneNumber = fullname;
        if (address) data.shippingAddress = address;
        return data;
      });
    }
  }, [profile]);

  return (
    <form
      className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16"
      onSubmit={handleSubmit}
    >
      <div className="min-w-0 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Delivery Details
          </h2>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
              <InputField
                label={"Your Name"}
                type="text"
                placeholder="Enter your name"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChanges}
                required
              />
              <InputField
                label={"Phone Number"}
                type="text"
                placeholder="123-456-7990"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChanges}
                required
              />
            </div>
            <AddressFields
              initialData={
                profile?.address ? profile.address : formData.shippingAddress
              }
              getChanges={getAddressChanges}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

          <div>
            <PaymentOptionsRadio handleChange={handleRadioChange} />
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
