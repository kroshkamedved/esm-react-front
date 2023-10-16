import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser, logout } from "../redux/authSlice";
import Footer from "../Footer/index";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

//css
import "../../css/main.css";

//image
import luckyBusLogo from "../../static/icons/vecteezy_school-bus.jpg";

export const Login = () => {
  //hooks
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //redux state
  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    const credential = localStorage.getItem("credential");
    if (credential) {
      dispatch(loginUser(JSON.parse(credential))).then((data) => {
        if (data.payload) {
          setUser("");
          setPassword("");
          navigate("/profile");
        }
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredentials = {
      username,
      password,
    };
    dispatch(loginUser(userCredentials)).then((data) => {
      if (data.payload) {
        setUser("");
        setPassword("");
        navigate("/profile");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id="main-container">
          <img id="main-logo" src={luckyBusLogo} alt="logo" />
          <div id="login-form">
            <input
              value={username}
              className="login-input"
              type="text"
              placeholder="Login"
              name="username"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <input
              value={password}
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="login-input" type="submit">
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Login"
              )}
            </button>
            {error && (
              <Alert
                variant="danger"
                onClose={() => dispatch(logout)}
                dismissible
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{error}</p>
              </Alert>
            )}
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
