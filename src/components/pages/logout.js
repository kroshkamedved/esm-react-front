import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(logout());
  navigate("/login");
};

export default Logout;
