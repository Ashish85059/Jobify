import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {FormRow, Logo} from "../components"

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="John" />
        <FormRow type="text" name="LastName" labelText="Last Name" defaultValue="Don" />
        <FormRow type="text" name="location" defaultValue="earth" />
        <FormRow type="email" name="email" defaultValue="John@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123" />
        <button type='submit' className='btn btn-block'>Register</button>
        <p>
          Already a member?
            <Link to='/login' className='member-btn'>Login</Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register