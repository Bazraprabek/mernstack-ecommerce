import React from 'react';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Spinner from './components/Spinner';

function AdminProduct() {
  const [loading, isLoading] = useState(true);
  const [data, fetchData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products/");
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

  const deleteProduct = async (id) =>{
    try{
      const res = await axios.delete(`/api/products/delete/${id}`);
      if(res.status === 200){
        alert("Deleted Successful");
        window.location.reload();
      }
    }catch(err){
      console.log(err);
      alert("Fail to delete");
    }
  }

  if(loading){
    return <Spinner/>
  }else{
  return (
    <>
      <div className="d-flex justify-content-around align-items-center">
      <h1 className='py-3'>Products</h1>
      <Link to="/dashboard/product/create" className='btn btn-warning text-center'>Create New</Link>
      </div>
      <div className="table-responsive container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stack</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value,index)=>{
                return(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td><img src={process.env.REACT_APP_IMG_PATH+value.image} width="150px" alt={value.name} /></td>
                  <td>{value.name}</td>
                  <td>{value.price}</td>
                  <td>{value.stack}</td>
                  <td>{value.desc}</td>
                  <td><Link className='btn btn-primary mt-1' to={"/dashboard/edit/"+value._id}>Edit</Link> <button className='btn btn-danger mt-1' onClick={()=>{deleteProduct(value._id)}}>Delete</button></td>
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

export default AdminProduct