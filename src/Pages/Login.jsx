import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Spinner from "../Components/Spinner";

const Login = () => {
  const url = "http://localhost:5000/login_user";
  const navigate = useNavigate();
  const [loader, setLoader] = useState("none");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleValidation = () => {
    const { email, password } = user;
    if (!email) {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    }
    if (!password) {
      toast.error("Password is required", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", toastOptions);
      return false;
    }
    return true;
  };

  const PostData = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setLoader("flex");
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();

        if (data.status) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          toast.success("Login successful! Redirecting...", toastOptions);

          // Check if user is admin based on the response `isAdmin` flag
          if (data.isAdmin) {
            setTimeout(() => {
              navigate("/dental-clinic/user/profile"); // Admin redirect
            }, 3000);
          } else {
            setTimeout(() => {
              navigate("/profile"); // Redirect for normal user
            }, 3000);
          }
        } else {
          toast.error(data.message || "Invalid email or password", toastOptions);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Server error. Please try again later.", toastOptions);
      } finally {
        setLoader("none");
      }
    }
  };

  return (
    <>
      <div className="login_form_section">
        <FormContainer className="form_container_login">
          <form
            className="login_u_form"
            method="POST"
            onSubmit={PostData}
            data-aos="fade-right"
          >
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>vts Dental Clinic</h1>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              autoComplete="off"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputs}
              autoComplete="off"
              required
              minLength={6}
            />
            <button className="submit_login_btn" type="submit" disabled={loader === "flex"}>
              {loader === "flex" ? (
                <Spinner id="lg_loder" style={loader} />
              ) : (
                "Login"
              )}
            </button>
            <span className="lower_title_login">
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </FormContainer>
        <ToastContainer />
      </div>
    </>
  );
};

const FormContainer = styled.div``;

export default Login;
