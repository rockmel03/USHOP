import React, { useState } from "react";
import googleLogo from "../assets/google-logo.png";
import InputFeild from "./InputFeild";

const initialFormdata = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFromData] = useState(initialFormdata);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formData :", formData);
  };

  return (
    <form
      className="flex flex-col gap-2 "
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-xl font-semibold">Login</h2>
      <h3 className="text-sm opacity-60">
        Choose from 10,000+ products across 400+ categories
      </h3>
      <a
        href="https://www.google.com"
        className="rounded-full shadow-md p-2 text-center font-medium flex items-center justify-center gap-1"
      >
        <img src={googleLogo} alt="google" className="w-[1.3em]" />
        <span>Sign in with Google</span>
      </a>
      <p className="text-sm opacity-50 text-center">OR</p>
      <InputFeild
        label="Email"
        type="email"
        name="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <div className="flex flex-col">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter password here..."
            className={`rounded-full shadow-md py-2 px-4 w-full`}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>
      </div>

      <div className=" my-2 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <input type="checkbox" name="persist" id="persist" />
          <label htmlFor="persist" className="text-sm font-medium opacity-70">
            Remember Me
          </label>
        </div>
        <p className="text-sm font-medium opacity-70">Forgot Password?</p>
      </div>
      <button
        type="submit"
        className="rounded-full shadow-md p-2 text-center font-medium bg-orange-800 text-white"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
