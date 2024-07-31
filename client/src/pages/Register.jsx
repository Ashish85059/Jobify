import React from 'react'
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {FormRow, Logo,SubmitBtn} from "../components"
import customFetch from "../utils/customFetch.js"
import {toast} from 'react-toastify'


export const action=async({request})=>{
  const formData=await request.formData()
  const data=Object.fromEntries(formData)
  try {
    console.log(data)
    await customFetch.post("/auth/register",data);
    toast.success("Registration successful")
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation()
  // console.log(navigation);
  const isSubmitting=navigation.state==='submitting'  
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="John" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Don"
        />
        <FormRow type="text" name="location" defaultValue="earth" />
        <FormRow type="email" name="email" defaultValue="John@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Register