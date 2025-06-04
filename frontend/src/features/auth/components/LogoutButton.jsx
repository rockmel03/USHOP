import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../AuthThunk";
import toast from "react-hot-toast";
import { logout } from "../AuthSlice";

const LogoutButton = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then((action) => {
      if (action.error) return action.paload && toast.error(action.paload);
      if (action.payload.status) {
          toast.success("Logout Success");
        dispatch(logout());
      }
    });
  };
  return (
    isAuthenticated && (
      <button {...rest} onClick={handleLogout}>
        {children}
      </button>
    )
  );
};

export default LogoutButton;
