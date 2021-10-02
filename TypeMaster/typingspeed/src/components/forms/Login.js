import React, { useState } from "react";
import axios from "axios";

function Login(history) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const configo = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(`https://localhost:5000/auth/login`,configo, { email, password })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
          history.push("/services");
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password: "",
            textChange: "Sign In",
          });
          alert(err);
        });
    } else {
      alert("please enter valid details");
      setFormData({
        ...formData,
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange("email")}
            value={email}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
