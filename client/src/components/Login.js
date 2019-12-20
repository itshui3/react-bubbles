import React, { useState } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()

  const [loginQuery, setLoginQuery] = useState({
    username: '',
    password: ''
  })

  const handleLogin = ev => {
    ev.preventDefault()
    axiosWithAuth().post('/login', loginQuery)
      .then( res => {
        localStorage.setItem('token', res.data.payload)
        console.log(res)
        history.push('/bubbles')
      })
      .catch( err => {
        console.log(err)
      })
  }

  const handleInput = ev => {
    setLoginQuery({...loginQuery, [ev.target.name]: ev.target.value })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleLogin}>
        <input
          placeholder='username'
          name='username'
          value={loginQuery.username}
          onChange={handleInput}
        />
        <input
          placeholder='password'
          name='password'
          value={loginQuery.password}
          onChange={handleInput}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
