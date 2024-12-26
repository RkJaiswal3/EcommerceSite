import React, { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      console.log("Backend response:", json);

      if (json.success === true) {
        // Check if 'success' is true
        localStorage.setItem("token", json.token);
        alert("Successfully Logged In!");
        navigate("/products");
      } else {
        alert(json.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("There was an error during the login:", error);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg p-4">
          <h1 className="text-center mb-4">Login User</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default LoginForm;
