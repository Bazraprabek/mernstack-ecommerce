import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({isAuth}) {

  const navigate = useNavigate();
  const [data,getData] = useState({
    email:"",password:""
  });

  const handleInput = (e)=>{
    const {name,value} = e.target;
    getData({
      ...data,
      [name]:value
    })
  }

  const doLogin = async(e)=>{
    try{
      e.preventDefault();
      const {email,password} = data;
      if(email && password){
          const res = await axios.post('/api/user/login',{email,password});
          if(res.status === 200){
            navigate('/');
            window.location.reload();
          }else{
            alert('Login Fail');
          }
      }else{
        alert('Please fill all fields');
      }
    }catch(err){
      console.log(err);
      alert("Invalid Credentials")
    }
  }

  if (isAuth) {
  return navigate("/");
  }else{
    return (
      <>
        <h1 className='text-center pt-4'>Login</h1>
        <form method="post" className='container p-5' onSubmit={doLogin}>
          <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input type="email" className="form-control" name="email" id="email" onChange={handleInput} value={data.email} placeholder="Enter Email"/>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Password</strong></label>
              <input type="password" className="form-control" name="password" id="password" onChange={handleInput} value={data.password} placeholder="Enter Password"/>
          </div>
          <div className="mb-3">
              <button className='btn btn-success form-control'>Submit</button>
          </div>
          <div className="mb-3">
              <p>New User? <Link to="/signup">Signup</Link></p>
          </div>
        </form>
      </>
    )
  }
}


export default Login