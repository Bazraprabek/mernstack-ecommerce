import React, { useState } from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Spinner from './components/Spinner';

function AdminAccount() {
  const [loading, isLoading] = useState(true);
  const [data, fetchData] = useState([]);

  async function deleteUser(id){
    try{
      const res = await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      if(res.status === 200){
        alert("Deleted Successful");
        window.location.reload();
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/admin/getdata");
        if (res.status === 200) {
          fetchData(res.data);
          isLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if(loading){
    return <Spinner/>
  }else{
  return (
    <>
      <h1 className='text-center py-3'>Account</h1>
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value,index)=>{
                return(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td><Link className='btn btn-primary' to={"/dashboard/edit/"+value._id}>Edit</Link> <button className='btn btn-danger' onClick={()=>{deleteUser(value._id)}}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
    )
  }
}

export default AdminAccount