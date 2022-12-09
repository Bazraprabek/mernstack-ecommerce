import React from 'react';
import {Link} from 'react-router-dom';

const wid = {
  height: "80vh"
}

function Error() {
  return (
    <div className="text-center d-flex justify-content-center align-items-center flex-column" style={wid}>
        <h1>404 page not found!</h1>
        <Link to="/" className="btn btn-dark mt-4">Go to homepage</Link>
    </div>
  )
}

export default Error