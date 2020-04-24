import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const intialState = {
  username: "Lambda School",
  password: "i<3Lambd4",
  isFetching: false
};

const Login = props => {
  const [login, setLogin] = useState(intialState);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    axiosWithAuth()
      .post("/api/login", login)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => {
        console.log(err, "sorry, an error has occured while logging you in");
      });
  };

  return (
    <div>
      <h3>Login</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            label="Username"
            type="text"
            name="username"
            placeholder="Lambda School"
            value={login.username}
            onChange={handleChange}
          />
          <br />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="i<3Lambd4"
            value={login.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Log In</button>
          {login.isFetching && "Please wait...logging you in"}
        </form>
      </div>
    </div>
  );
};

export default Login;
