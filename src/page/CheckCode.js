import "../main.css";
import "../util.css";
import "../js/main";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkCodeAction } from "../redux/slice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = Yup.object({
  code: Yup.string().required("Dữ liệu bắt buộc"),
});

function CheckCode() {

  const location = useLocation();
  const email = location.state?.email || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    console.log(formik.values.userName);
  },[formik.values.userName])
  const handleRegister = async () => {
    const action = await formik.validateForm()
    if(Object.keys(action).length === 0){
      const data = {
        code :formik.values.code,
        email:email
      }
      const action = await dispatch(checkCodeAction(data))
      const status = checkCodeAction.fulfilled.match(action)

      toast[status ? "success" : "error"](action.payload.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (status) {
        navigate("/hrm");
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/img-01.png" alt="IMG" />
            </div>

            <form className="login100-form validate-form">
              <span className="login100-form-title">Nhập mã từ Gnail</span>
              
              <div
                className="wrap-input100 validate-input"
              >
                <input
                  className="input100"
                  type="text"
                  placeholder="Nhập mã code"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">{formik.errors.code}</span>
              </div>
              

              <div className="container-login100-form-btn">
                <button type="button" onClick={handleRegister} disabled={!formik.isValid} className="login100-form-btn">Tiếp tục</button>
              </div>

              {/* <div className="text-center p-t-12">
                <span className="txt1">Quên </span>
                <a className="txt2" href="#">
                   Tài khoản / Mật khẩu?
                </a>
              </div> */}

              <div className="text-center p-t-136">
                <a className="txt2" href="#">
                  Đăng nhập tài khoản của bạn
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckCode;
