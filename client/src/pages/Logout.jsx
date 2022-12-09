import React, { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData() {
            await axios.get('/api/user/logout');
          }
          fetchData();
          navigate('/login')
          window.location.reload();
    })
  return (
    <div>Logout</div>
  )
}

export default Logout