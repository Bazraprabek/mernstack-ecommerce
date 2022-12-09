import React from 'react';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate();
    const [data,getData] = useState({
        name:"",image:"",price:"",stack:"",desc:""
      });
    
      const handleInput = (e)=>{
        const {name,value} = e.target;
        getData({
          ...data,
          [name]:value
        })
      }
      const handlePhoto = (e)=>{
        getData({
          ...data,
          image: e.target.files[0]
        })
      }
    
      const doUpload = async(e)=>{
        try{
          e.preventDefault();
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('image', data.image);
          formData.append('price', data.price);
          formData.append('stack', data.stack);
          formData.append('desc', data.desc);
          
          if(formData){
              const res = await axios.post(`/api/products/create`,formData);
              if(res){
                alert('Created Successful');
                navigate('/dashboard/product', {replace: true});
              }
          }else{
            alert('Please fill all fields');
          }
        }catch(err){
          console.log(err);
          alert('Fail to create');
        }
      }

  return (
    <>
      <h1 className='text-center pt-4'>Create Product</h1>
      <form method="post" className='container-fluid p-5' onSubmit={doUpload} encType="multipart/form-data">
        <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Product Name*</strong></label>
            <input type="text" className="form-control" onChange={handleInput} value={data.name} name="name" id="name" placeholder="Enter Product Name" required/>
        </div>
        <div className="mb-3">
            <label htmlFor="image" className="form-label"><strong>Image*</strong></label>
            <input type="file" className="form-control" onChange={handlePhoto} name="image" id="image" placeholder="Upload Image" required accept='image/*'/>
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label"><strong>Price*</strong></label>
            <input type="number" min="10" className="form-control" onChange={handleInput} value={data.price} name="price" id="price" placeholder="Enter Price" required/>
        </div>
        <div className="mb-3">
            <label htmlFor="stack" className="form-label"><strong>Stack*</strong></label>
            <input type="number" min="1" className="form-control" onChange={handleInput} value={data.stack} name="stack" id="stack" placeholder="Enter Product Name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label"><strong>Description</strong></label>
          <textarea className="form-control" name="desc" id="desc" rows="3" value={data.desc} onChange={handleInput}></textarea>
        </div>
        <div className="mb-3">
            <button className='btn btn-secondary form-control'>Create</button>
        </div>
      </form>
    </>
  )
}

export default CreateProduct