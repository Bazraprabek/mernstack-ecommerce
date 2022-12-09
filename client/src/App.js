import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Protected from "./Protected";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import Loading from "./pages/components/Loading";
import UserLayout from "./pages/components/UserLayout";
import Admin from "./dashboard/Admin";
import AdminNavbar from "./dashboard/components/AdminNavbar";
import AdminAccount from "./dashboard/AdminAccount";
import AdminProduct from "./dashboard/AdminProduct";
import AdminEdit from "./dashboard/AdminEdit";
import CreateProduct from "./dashboard/CreateProduct";
import ProductDesc from "./pages/ProductDesc";
import BuyNow from "./pages/BuyNow";
import AdminOrder from "./dashboard/AdminOrder";
import About from "./pages/About";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/user/getdata");
        if (res.status === 200) {
          setAuth(true);
          setAdmin(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    isLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Routes>
            {/* Admin Route */}
            {/* <Route
              path="/dashboard"
              element={<AdminNavbar isAdmin={isAdmin} />}
            > */}
            <Route
              path="dashboard"
              element={
                <Protected
                  Cmp={AdminNavbar}
                  isAuth={isAuth}
                  isAdmin={isAdmin}
                />
              }
            >
              <Route index element={<Admin />} />
              <Route path="account" element={<AdminAccount />} />
              <Route path="product" element={<AdminProduct />} />
              <Route path="order" element={<AdminOrder />} />
              <Route path="edit/:id" element={<AdminEdit />} />
              <Route path="product/create" element={<CreateProduct />} />
            </Route>

            {/* Client Route */}
            <Route
              path="/"
              element={<UserLayout isAuth={isAuth} isAdmin={isAdmin} />}
            >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Product />} />
              <Route path="products/:id" element={<ProductDesc />} />
              <Route
                path="products/buynow/:id"
                element={<Protected Cmp={BuyNow} isAuth={isAuth} />}
              />
              {/* <Route path="products/buynow/:id" element={<BuyNow />} /> */}
              <Route path="signup" element={<Signup isAuth={isAuth} />} />
              <Route path="login" element={<Login isAuth={isAuth} />} />
              <Route path="logout" element={<Logout />} />
              <Route path="error" element={<Error />} />
              {/* <Route
                path="/profile"
                element={<Protected Cmp={Profile} isAuth={isAuth} />}
              /> */}
            </Route>
            <Route path="*" element={<Navigate to="/error" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
