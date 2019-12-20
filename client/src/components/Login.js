import React, { useState } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginQuery, setLoginQuery] = useState({
    username: '',
    password: ''
  })

  const handleLogin = ev => {
    ev.preventDefault()
    axiosWithAuth('/login', )
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleLogin}>
        <input

        />
        <input

        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
