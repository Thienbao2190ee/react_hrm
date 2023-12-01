import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./compoment/Layout";
import Home from "./page/Home";
import Login from "./page/Login";

import CheckCode from "./page/CheckCode";
import Register from "./page/Register";
import { useEffect, useState } from "react";

function NavigateApp() {
    
    const [token,setToken] = useState(null)
  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
    return cookieValue || null;
  }
  
  useEffect(() => {
      const token = getCookie("userInfo");
      if (token) {
        setToken(token)
      } else {
        console.log("Cookie không tồn tại hoặc không có giá trị.");
        setToken(null)
      }
  },[])
  
  return (
    <BrowserRouter>
      {!token ? (
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-code" element={<CheckCode />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/home" element={<Home />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default NavigateApp;
