import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  console.log(window.location);
  return (
    <main className="w-full bg-green-100 h-screen flex">
      <section className="w-3/8 h-full bg-zinc-50 text-black">
        <div className="ml-[8vw] py-10">
          <h1 className="text-xl font-bold">USHOP</h1>
        </div>
        <div className="flex-1 px-[8vw] py-5">
          <LoginForm />
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

export default Login;
