import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';

function ProductDesc() {
    const [data, fetchData] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const getData = async () => {
        try {
          const res = await axios.get("/api/products/"+id);
          if (res.status === 200) {
            fetchData(res.data);
          }
        } catch (err) {
          console.log(err);
          navigate('/error');
        }
      };
      getData();
    }, []);
  return (
    <>
        <div className="container d-flex flex-row flex-wrap justify-content-center align-items-center py-4">
            <img className='col-lg-6' src={process.env.REACT_APP_IMG_PATH+data.image} alt="data.name" width="350px"/>
            <div className="product_info col-lg-6 p-5">
            <h1>{data.name}</h1>
            <h3 className='text-success'>Rs.{data.price}</h3>
            <p>{data.desc}</p>
            <Link to={"/products/buynow/"+data._id} className='btn btn-warning'><strong>Buy Now</strong></Link>
            </div>
        </div>
    </>
  )
}

export default ProductDesc