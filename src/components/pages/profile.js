import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, jwt } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div>Profile div</div>
      <div>
        Profile div2
        <span>
          Some text from REDUX if yoy, {user}. Authenticated :{" "}
          {isAuthenticated.toString()}, your JWT : {jwt}
        </span>
        <h2>Some header h2</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
