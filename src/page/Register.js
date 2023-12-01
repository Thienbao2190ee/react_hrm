import "../main.css";
import "../util.css";
import "../js/main";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regexEmail } from "../until/regex";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/slice/authSlice";

const formSchema = Yup.object({
  fullName: Yup.string().required("Dữ liệu bắt buộc"),
  email: Yup.string().required("Dữ liệu bắt buộc"),
  password: Yup.string().required("Dữ liệu bắt buộc"),
  rePassword: Yup.string().required("Dữ liệu bắt buộc"),
});

function Register() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: formSchema,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleRegister = async () => {
    const action = await formik.validateForm();
    if (Object.keys(action).length === 0) {
      if (formik.values.password !== formik.values.rePassword) {
        return toast.error("Mật khẩu không trùng khớp", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (!regexEmail(formik.values.email)) {
        return toast.error("Email không đúng định dạng", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      const data = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        password: formik.values.password,
      };
      const action = await dispatch(registerAction(data));

      const status = registerAction.fulfilled.match(action);

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
        navigate("/check-code",{ state: { email: formik.values.email } });
      }
    }
  };
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
              <span className="login100-form-title">Đăng ký</span>

              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  placeholder="Họ và tên"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">
                  {formik.errors.fullName}
                </span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">
                  {formik.errors.email}
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                // data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">
                  {formik.errors.password}
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                // data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="rePassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">
                  {formik.errors.rePassword}
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={!formik.isValid}
                  className="login100-form-btn"
                >
                  Đăng ký
                </button>
              </div>

              <div className="text-center p-t-12">
                <span className="txt1">Quên </span>
                <a className="txt2" href="#">
                  Tài khoản / Mật khẩu?
                </a>
              </div>

              <div className="text-center p-t-136">
                <Link className="txt2" to="/login">
                  Đăng nhập tài khoản của bạn
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
