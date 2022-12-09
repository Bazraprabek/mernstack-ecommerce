import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [data,getData] = useState({
    name:"",email:"",password:"",cpassword:""
  });

  const handleInput = (e)=>{
    const {name,value} = e.target;
    getData({
      ...data,
      [name]:value
    })
  }

  const doSignup = async(e)=>{
    e.preventDefault();
    const {name,email,password,cpassword} = data;
    if(name && email && password && cpassword){
      if(password === cpassword){
        const res = await axios.post('/api/user/signup',{name,email,password});
        if(res){
          alert('Singup Successful');
          navigate('/login', {replace: true});
        }
      }else{
        alert('Password not match');
      }
    }else{
      alert('Please fill all fields');
    }
  }

  return (
    <>
      <h1 className='text-center pt-4'>Signup</h1>
      <form method="post" className='container p-5' onSubmit={doSignup}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Fullname*</strong></label>
            <input type="text" className="form-control" onChange={handleInput} value={data.name} name="name" id="name" placeholder="Enter Fullname"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email*</strong></label>
            <input type="email" className="form-control" onChange={handleInput} value={data.email} name="email" id="email" placeholder="Enter Email"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password*</strong></label>
            <input type="password" className="form-control" onChange={handleInput} value={data.password} name="password" id="password" placeholder="Enter Password"/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label"><strong>Confirm Password*</strong></label>
            <input type="password" className="form-control" onChange={handleInput} value={data.cpassword} name="cpassword" id="cpassword" placeholder="Confirm Password"/>
        </div>
        <div className="mb-3">
            <button className='btn btn-success form-control'>Submit</button>
        </div>
        <div className="mb-3">
            <p>Already Have Account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </>
  )
}

export default Signup