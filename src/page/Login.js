import "../main.css";
import "../util.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slice/authSlice";
import {  toast } from "react-toastify";
import { regexEmail } from "../until/regex";

const formSchema = Yup.object({
  email: Yup.string().required("Dữ liệu bắt buộc"),
  password: Yup.string().required("Dữ liệu bắt buộc"),
});

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
  });
  // useEffect(() => {
  //   console.log(formik.values.userName);
  // },[formik.values.userName])
  const handleRegister = async () => {
    const action = await formik.validateForm()
    if(Object.keys(action).length === 0){
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
        email : formik.values.email,
        password: formik.values.password
      }
      const action = await dispatch(loginAction(data))

      const status = loginAction.fulfilled.match(action);

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

      if(status){
        setTimeout(()=> {
        navigate('/hrm')
        },1000)
      }




      if (status) {
        // navigate("/check-code",{ state: { email: formik.values.email } });
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
    
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/img-01.png" alt="IMG" />
            </div>

            <form className="login100-form validate-form">
              <span className="login100-form-title">Đăng Nhập</span>
              
              <div
                className="wrap-input100 validate-input"
              >
                <input
                  className="input100"
                  type="gmail"
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
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">{formik.errors.email}</span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
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
                <span className="text-xs absolute -bottom-4 left-5 text-rose-600">{formik.errors.password}</span>
              </div>

              <div className="container-login100-form-btn">
                <button type="button" onClick={handleRegister} disabled={!formik.isValid} className="login100-form-btn">Đăng ký</button>
              </div>

              <div className="text-center p-t-12">
                <span className="txt1">Quên </span>
                <a className="txt2" href="#">
                   Tài khoản / Mật khẩu?
                </a>
              </div>

              <div className="text-center p-t-136">
                <Link className="txt2" to="/register">
                  Đăng ký tài khoản của bạn
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

export default Login;
