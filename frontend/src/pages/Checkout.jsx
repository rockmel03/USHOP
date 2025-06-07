import CheckoutForm from "../features/checkout/components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <CheckoutForm />
      </div>
    </section>
  );
};

export default Checkout;
