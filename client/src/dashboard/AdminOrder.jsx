import React, { useState } from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Spinner from './components/Spinner';

function AdminOrder() {
  const [loading, isLoading] = useState(true);
  const [data, fetchData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/order/");
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
      <h1 className='text-center py-3'>Orders</h1>
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Address</th>
              <th scope="col">Order Date</th>
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
                  <td>{value.contact}</td>
                  <td>{value.product_name}</td>
                  <td>{value.product_price}</td>
                  <td>{value.address}</td>
                  <td>{value.order_at}</td>
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

export default AdminOrder