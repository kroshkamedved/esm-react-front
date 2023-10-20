import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Certificates from "./pages/certificates";
import Login from "./pages/login";
import Auth from "../auth/Auth";
import Logout from "./pages/logout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/certificates"
          element={
            <Auth>
              <Certificates />
            </Auth>
          }
        />
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/logout"
          element={
            <Auth>
              <Logout />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
