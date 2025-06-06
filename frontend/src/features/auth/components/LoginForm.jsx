import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import googleLogo from "../../../assets/google-logo.png";
import InputFeild from "../../../components/InputFeild";
import { loginUser } from "../AuthThunk";
import useToggle from "../../../hooks/useToggle";

const initialFormdata = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFromData] = useState(initialFormdata);

  const [persist, togglePersist] = useToggle("persist", true);

  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");
    dispatch(loginUser(formData)).then((action) => {
      toast.dismiss(toastId);
      if (action.error) return toast.error(action.payload);
      if (action.payload?.token) {
        // set login state in localStorage
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        return toast.success(
          `Welcome! ${
            action.payload?.user ? action.payload.user.fullname : "User"
          }`
        );
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

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
      <button
        disabled={true}
        className="rounded-full shadow-md p-2 text-center font-medium flex items-center justify-center gap-1 disabled:cursor-not-allowed"
      >
        <img src={googleLogo} alt="google" className="w-[1.3em]" />
        <span>Sign in with Google</span>
      </button>
      <p className="text-sm opacity-50 text-center">OR</p>
      {error && (
        <p className="text-sm text-center text-red-500 capitalize">
          <span title={error}>
            <i className="ri-error-warning-fill"></i>
          </span>
          <span className="font-semibold">{error}</span>
        </p>
      )}
      <InputFeild
        label="Email"
        type="email"
        name="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleInputChange}
        required
        autoFocus="on"
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
            className="absolute top-1/2 right-4 -translate-y-1/2 w-fit h-fit opacity-80"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <span>
              {showPassword ? (
                <i className="ri-eye-off-fill"></i>
              ) : (
                <i className="ri-eye-fill"></i>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className=" my-2 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            name="persist"
            id="persist"
            className=" accent-orange-700"
            checked={persist}
            onChange={togglePersist}
          />
          <label htmlFor="persist" className="text-sm font-medium opacity-70">
            Remember Me
          </label>
        </div>
        <p className=" font-medium opacity-70">Forgot Password?</p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-full shadow-md p-2 text-center font-medium bg-orange-800 text-white cursor-pointer disabled:cursor-progress"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <p className="text-center">
        Do not have an account?{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
          Create here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
