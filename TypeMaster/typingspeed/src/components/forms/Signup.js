import React, { useState } from "react";
import axios from "axios";
function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { firstname, lastname, email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (firstname && lastname && email && password) {
      axios
        .post(`http://localhost:5000/auth/signup`, {
          firstname,
          lastname,
          email,
          password,
        })
        .then((res) => {
          setFormData({
            ...formData,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          });
          history.push("/services");
        })
        .catch((err) => {
          setFormData({
            ...formData,
            firstname: "",
            lastname: "",
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={handleChange("firstname")}
            value={firstname}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={handleChange("lastname")}
            value={lastname}
          />
        </div>

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
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
