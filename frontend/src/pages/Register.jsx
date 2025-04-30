import React from "react";
import RegisterForm from "../features/auth/RegisterForm";

const Register = () => {
  return (
    <main className="w-full bg-green-100 h-screen flex">
      <section className="min-w-sm md:min-w-md h-full bg-zinc-50 text-black">
        <div className="ml-[8vw] py-10">
          <h1 className="text-xl font-bold">USHOP</h1>
        </div>
        <div className="flex-shrink-0 px-[8vw] py-5">
          <RegisterForm />
        </div>
      </section>
      <section className="flex-1 h-full">
        <img
          src="https://images.pexels.com/photos/27035625/pexels-photo-27035625/free-photo-of-a-woman-wearing-black-heels-and-holding-a-bag.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </section>
    </main>
  );
};

export default Register;
