import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser, logout } from "../redux/authSlice";
import Footer from "../Footer/index";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Login = () => {
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //validation
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setFields = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  //redux state
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const credential = localStorage.getItem("credential");
    if (credential) {
      dispatch(loginUser(JSON.parse(credential))).then((data) => {
        if (data.payload) {
          setFields("username", "");
          setFields("password", "");
          navigate("/certificates");
        }
      });
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (
      !!!form.username ||
      form.username.length < 3 ||
      form.username.length > 30
    ) {
      newErrors.username =
        "Login field length must not be less than 3 characters and greater than 30 characters ";
    }
    if (
      !!!form.password ||
      form.password.length < 4 ||
      form.password.length > 30
    ) {
      newErrors.password =
        "Password length must not be less than 4 characters and greater than 30 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      let userCredentials = {
        username: form.username,
        password: form.password,
      };
      dispatch(loginUser(userCredentials)).then((data) => {
        if (data.payload) {
          setFields("username", "");
          setFields("password", "");
          navigate("/certificates");
        }
      });
    }
  };

  return (
    <>
      <div className="customContainer">
        {error && (
          <Alert variant="danger" onClose={() => dispatch(logout)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              value={form.username}
              onChange={(e) => {
                setFields("username", e.target.value);
              }}
              isInvalid={!!errors.username}
              type="text"
              placeholder="Enter login"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={form.password}
              onChange={(e) => {
                setFields("password", e.target.value);
              }}
              isInvalid={!!errors.password}
              type="password"
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
