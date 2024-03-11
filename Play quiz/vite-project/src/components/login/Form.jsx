import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Retrieve user data from the response
        const userData = await response.json();
        // Save user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        // Redirect user or perform other actions upon successful signin
        console.log("Signin successful");
      } else {
        console.error("Signin failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginForm">
      <div className="heading">
        <div className="mainHeading">Welcome to explore your Knowledge</div>
        <div className="subHeading">
          The one who falls and gets up is stronger than the one who never
          tried. Do not fear failure but rather fear not trying.
        </div>
      </div>
      <div className="formInputs">
        <div className="input">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            id="inputEmail"
            value={email}
            onChange={changeEmail}
            placeholder="Example@email.com"
          />
        </div>
        <div className="input">
          <label htmlFor="inputPass">Password</label>
          <input
            type="password"
            id="inputPass"
            value={password}
            onChange={changePassword}
            placeholder="At least 8 characters"
          />
        </div>
        <div className="forgetPass">
          <div></div>
          <div className="forgetPass">Forgot Password?</div>
        </div>
        <div className="signIn">
          <button onClick={submit}>Sign In</button>
        </div>
      </div>
      <div className="newAcc">
        Don't you have an account?
        <Link to="/signUp">
          <span className="highlighted"> Sign up</span>
        </Link>
      </div>
      <div className="copyright">© 2023 ALL RIGHTS RESERVED</div>
    </div>
  );
}
