import React from 'react'
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo } from '../components';


const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="john" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123" />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <button type="submit" className="btn btn-block">
          Explore the app
        </button>
      <p>
        Not a member yet?
        <Link to="/Register" className="member-btn">
          Register
        </Link>
      </p>
      </form>
    </Wrapper>
  );
}

export default Login