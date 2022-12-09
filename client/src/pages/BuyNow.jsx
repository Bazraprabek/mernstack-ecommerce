import React from 'react';
import { useEffect,useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

function BuyNow() {
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

    const [formdata,setData] = useState({
        name:"",email:"",contact:"",address:""
      });
    
      const handleInput = (e)=>{
        const {name,value} = e.target;
        setData({
          ...formdata,
          [name]:value
        })
      }
    
      const buyNow = async(e)=>{
        e.preventDefault();
        const {name,email,contact,address} = formdata;
        const product_name = data.name;
        const product_price = data.price;
        const total_amount = data.price+200;
        if(name && email && contact && address){
            const res = await axios.post('/api/order/create',{name,email,contact,address,product_name,product_price,total_amount});
            if(res.status === 200){
              alert('Order Successful');
              navigate('/products', {replace: true});
            }
        }else{
          alert('Please fill all fields');
        }
      }

  return (
    <form method='post' className="container p-4" onSubmit={buyNow}>
        <h1 className="mb-5 text-center">Book Now</h1>
        <div className="d-flex flex-row flex-wrap justify-content-around">
            <div className="text-center personal_info col-md-7 order-2 order-sm-1">
                <h4 className='mb-3'><u>Personal Information</u></h4>
                <div className="mb-3">
                <input
                    onChange={handleInput}
                    value={formdata.name}
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    aria-describedby="emailHelpId"
                    placeholder="Enter Fullname"
                />
                </div>
                <div className="mb-3">
                <input
                    onChange={handleInput}
                    value={formdata.contact}
                    type="number"
                    className="form-control"
                    name="contact"
                    id="contact"
                    aria-describedby="emailHelpId"
                    placeholder="Enter Contact Number"
                />
                </div>
                <input
                onChange={handleInput}
                value={formdata.email}
                type="email"
                className="form-control"
                name="email"
                id="email"
                aria-describedby="emailHelpId"
                placeholder="Enter Email"
                />
                <div className="mb-3">
                <label htmlFor="address" className="form-label"></label>
                <textarea
                    className="form-control"
                    name="address"
                    onChange={handleInput}
                    value={formdata.address}
                    id="address"
                    rows="3"
                    placeholder='Address'
                ></textarea>
                </div>
                <button className='form-control btn btn-success btn-lg'>Place Order</button>
            </div>
            <div className="text-center product_info col-md-5 order-1 order-sm-2">
                <h4 className='text-center mb-3'><u>Order Information</u></h4>
                <img src={process.env.REACT_APP_IMG_PATH+data.image} alt="data.name" width="200px"/>
                <h5>{data.name}</h5>
                <p className='text-success'>Product Price : Rs.{data.price}</p>
                <p className='text-success'>Delivery Fee : Rs.200</p>
                <p className='text-success'>Total Amount : Rs.{data.price+200}</p>
            </div>
        </div>
    </form>
  )
}

export default BuyNow