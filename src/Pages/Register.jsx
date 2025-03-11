import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import Spinner from "../Components/Spinner";

const Register = () => {
  const url = "http://localhost:5000/register";
  const navigate = useNavigate();
  const [loader, setLoader] = useState("none");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInputs = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = user;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (name.length <= 2) {
      toast.error("Enter your full name", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be greater than 6 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    
    if (handleValidation()) {
      setLoader("flex");
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (data.message === "User registered successfully") {
          toast.success("Registration successful! Redirecting to login...", toastOptions);
          // Clear the form
          setUser({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          // Wait for the toast to be shown before redirecting
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.error(data.message || "Registration failed", toastOptions);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Server error. Please try again later.", toastOptions);
      } finally {
        setLoader("none");
      }
    }
  };

  return (
    <>
      <div className="register_form_section">
        <FormContainer className="form_container_register">
          <form
            className="register_u_form"
            method="POST"
            onSubmit={PostData}
            data-aos="fade-right"
          >
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>Om Dental Clinic</h1>
            </div>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={user.name}
              onChange={handleInputs}
              autoComplete="off"
              required
              minLength={3}
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputs}
              autoComplete="off"
              required
              minLength={6}
            />
            <button className="submit_register_btn" type="submit" disabled={loader === "flex"}>
              {loader === "flex" ? (
                <Spinner id="rg_loder" style={loader} />
              ) : (
                "Sign Up"
              )}
            </button>
            <span className="lower_title_register">
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </FormContainer>
        <ToastContainer />
      </div>
    </>
  );
};

const FormContainer = styled.div``;

export default Register;
