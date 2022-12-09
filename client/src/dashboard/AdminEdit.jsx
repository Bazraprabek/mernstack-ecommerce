import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from './components/Spinner';

function AdminEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, isLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/admin/getuserdata/${id}`);
          if (res.status === 200) {
            const {name,email} = res.data;
            getData({name,email})
            isLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    const [data,getData] = useState({
        name:"",email:""
      });
    
      const handleInput = (e)=>{
        const {name,value} = e.target;
        getData({
          ...data,
          [name]:value
        })
      }
    
      const doEdit = async(e)=>{
        try{
          e.preventDefault();
          const {name,email} = data;
          if(name && email){
              const res = await axios.put(`/api/admin/update/${id}`,{name,email});
              if(res){
                alert('Edit Successful');
                navigate('/dashboard/account', {replace: true});
              }
          }else{
            alert('Please fill all fields');
          }
        }catch(err){
          console.log(err);
          alert('Email already registered');
        }
      }

if(loading){
return <Spinner/>
}else{
  return (
    <>
      <h1 className='text-center pt-4'>Edit User</h1>
      <form method="post" className='container p-5' onSubmit={doEdit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Fullname</strong></label>
            <input type="text" className="form-control" onChange={handleInput} value={data.name} name="name" id="name" placeholder="Enter Fullname"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input type="email" className="form-control" onChange={handleInput} value={data.email} name="email" id="email" placeholder="Enter Email"/>
        </div>
        <div className="mb-3">
            <button className='btn btn-dark form-control'>Update</button>
        </div>
      </form>
    </>
  )
}
}

export default AdminEdit