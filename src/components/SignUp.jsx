import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //data which send in backend
    const userData = {
      email,
      username: name,
      password,
    };

    try {
      // Send the POST request to the backend API
      const response = await axios.post(
        "http://localhost:3000/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;

      //showing data come from backend
      console.log("Backend response:", json);

      if (json.success === true) {
        alert("User registered successfully!");
        navigate("/");
      } else {
        alert(json.message || "Registration failed");
      }
    } catch (error) {
      console.error("There was an error during the signup:", error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">SignUp Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameField" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="nameField"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailField" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="emailField"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordField" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="passwordField"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
