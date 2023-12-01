import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./compoment/Layout";
import Home from "./page/Home";
import Login from "./page/Login";

import CheckCode from "./page/CheckCode";
import Register from "./page/Register";
import { useEffect, useState } from "react";
import PrivateProtectedRoute from "./until/ProtectedRoutes/PrivateProtectedRoutes";

function App() {
  const [token, setToken] = useState(null);
  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name))
      ?.split("=")[1];
    return cookieValue || null;
  };

  useEffect(() => {
    const token = getCookie("userInfo");
    if (token) {
      setToken(token);
    } else {
      console.log("Cookie không tồn tại hoặc không có giá trị.");
      setToken(null);
    }
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
        <Routes>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/check-code" element={<CheckCode />} />
          <Route element={<PrivateProtectedRoute />} >
            <Route path="/" element={<Layout />}>
              <Route index path="/home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
export default App;
