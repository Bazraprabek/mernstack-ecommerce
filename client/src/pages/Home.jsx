import React from "react";
import { useEffect,useState } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

const title = {
  height : "30rem",
  // backgroundImage : "url(img/background.jpg)",
  // backgroundSize: "cover",
  // backgroundPosition: "center",
  backgroundColor :"#d62957",
  color :"white"
}

function Home() {
  const [data, fetchData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products/");
        if (res.status === 200) {
          fetchData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="title d-flex justify-content-center align-items-center text-center" style={title}>
        <h1>Welocome to <span className="text-warning">Bazra Electronics</span></h1>
      </div>
      <div className="container-fluid">
        <section id="products" className="pt-4" >
          <h1 className="text-center">Products</h1>
          <div className="row justify-content-center">
              {
               data.map((value,index)=>{
                  return(
                <Link to={"/products/"+value._id} className="card col-lg-2 col-md-3 col-sm-4 m-2 link-dark text-decoration-none" key={index}>
                  <img className="card-img-top" src={process.env.REACT_APP_IMG_PATH+value.image} alt="Title"/>
                  <div className="card-body">
                    <h6 className="card-title">{value.name}</h6>
                    <p className="card-text">Rs.{value.price}</p>
                  </div>
                </Link>
                  )
                })
              }
            </div>
        </section>
      </div>
    </>
  );
}

export default Home;
