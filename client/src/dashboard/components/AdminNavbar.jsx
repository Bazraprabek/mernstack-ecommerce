import React from 'react'
import { useEffect } from 'react';
import { Outlet ,Link, useNavigate} from 'react-router-dom'

function AdminNavbar({isAdmin, isAuth}) {
  const navigate = useNavigate();
  useEffect(()=>{
  if(!isAdmin && !isAuth){
    navigate('/error');
    }else if(isAuth && !isAdmin){
    navigate('/');
    } 
  },[]);
  if(isAdmin && isAuth){
    return (
      <>    
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
              <div className="container">
              <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
              <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Website</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/account">Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/product">Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/order">Order</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          <Outlet/>
      </>
    )
  }
}

export default AdminNavbar